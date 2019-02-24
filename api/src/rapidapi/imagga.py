import base64
import uuid
import requests
import os
import multiprocessing.dummy as mp

from PIL import Image

from src import *
from src.util import check, log
from src.rapidapi import recipe


def __upload_image(image_base64):
    image_path = '/tmp/{}.jpg'.format(uuid.uuid4())
    try:
        with open(image_path, 'wb') as file:
            file.write(base64.urlsafe_b64decode(image_base64))

        img = Image.open(image_path)
        if img.mode != 'RGB' or img.format == 'MPO':
            img = img.convert('RGB')
        img = img.resize((256, 256), Image.LANCZOS)
        img.save(fp=image_path, format='JPEG', quality=95)

        with open(image_path, 'rb') as file:
            headers = {
                'X-RapidAPI-Key': os.environ['RAPID_API_KEY']
            }
            data = {'filename': file}
            response = requests.post(IMAGGA_API_URL_CONTENT, files=data, headers=headers)
            response_json = response.json()

        if check.exist('status', response_json) and response_json['status'] == 'success':
            if check.exist('uploaded', response_json) and response_json['uploaded']:
                return response_json['uploaded'][0]['id']
        return None
    except Exception as e:
        log.exception(e)
        return None
    finally:
        os.remove(image_path)


def __filter_results(tag_list, main_dish):
    with mp.Pool(RECIPE_POOL_NUMBER) as pool:
        result = list(pool.imap(recipe.ingredient_exists, tag_list))
        result = [res for res in result if res]
    for tag in main_dish:
        if tag not in IGNORED_TAGS:
            result.append(tag)
    result = list(set(result))
    return result


def __extract_tags(response_json):
    if 'results' in response_json:
        ingredients = []
        main_dish = []
        tags = response_json['results'][0]['tags']
        for tag in tags:
            log.debug(str(tag['confidence']) + " " + tag['tag'])
            if tag['confidence'] > MAIN_DISH_CONFIDENCE:
                main_dish.append(tag['tag'])
            if tag['confidence'] > AI_CONFIDENCE:
                ingredients.append(tag['tag'])
        return __filter_results(ingredients, main_dish)
    return []


def extract_tags_url(url):
    try:
        headers = {'X-RapidAPI-Key': os.environ['RAPID_API_KEY']}
        data = {'url': url}
        response = requests.get(IMAGGA_API_URL_TAGGING, params=data, headers=headers)
        response_json = response.json()
        return __extract_tags(response_json)
    except Exception as e:
        log.error('Error while extracting tags for a URL image.')
        log.exception(e)
        return None


def extract_tags_base64(image_base64):
    try:
        image_id = __upload_image(image_base64)
        headers = {'X-RapidAPI-Key': os.environ['RAPID_API_KEY']}
        data = {'content': image_id}
        response = requests.get(IMAGGA_API_URL_TAGGING, params=data, headers=headers)
        response_json = response.json()
        return __extract_tags(response_json)
    except Exception as e:
        log.error('Error while extracting tags for a base64 image.')
        log.exception(e)
        return None
