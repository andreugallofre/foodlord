import base64
import uuid
import requests
import os

from PIL import Image

from src import *
from src.util import check, log

IMAGGA_API_URL_TAGGING = 'https://imagga-api.p.rapidapi.com/tagging'
IMAGGA_API_URL_CONTENT = 'https://imagga-api.p.rapidapi.com/content'

def get_info_url(url):
    headers = {
        'X-RapidAPI-Key': os.environ['RAPID_API_KEY']
    }
    data = {
        'url': url
    }

    response = requests.get(IMAGGA_API_URL_TAGGING, params=data, headers=headers)
    response_json = response.json()

    # Extract the tags with more than 50% of confidence

    if 'results' in response_json:
        result = []
        tags = response_json['results'][0]['tags']
        for tag in tags:
            if tag['confidence'] > 50:
                result.append(tag['tag'])
        print (result)
    return None


def upload_image(image_base64):
    image_path = '/tmp/{}.jpg'.format(uuid.uuid4())
    try:
        # Save image
        with open(image_path, 'wb') as file:
            file.write(base64.urlsafe_b64decode(image_base64))

        # Resize image
        img = Image.open(image_path)
        if img.mode != 'RGB' or img.format == 'MPO':
            img = img.convert('RGB')
        img = img.resize((256, 256), Image.LANCZOS)
        img.save(fp=image_path, format='JPEG', quality=95)

        # Upload image
        with open(image_path, 'rb') as file:
            headers = {
                'X-RapidAPI-Key': os.environ['RAPID_API_KEY']
            }
            data = {'filename': file}
            response = requests.post(IMAGGA_API_URL_CONTENT, files=data, headers=headers)
            response_json = response.json()

        # Return image identifier
        if check.exist('status', response_json) and response_json['status'] == 'success':
            if check.exist('uploaded', response_json) and response_json['uploaded']:
                return response_json['uploaded'][0]['id']
        return None

    except Exception as e:
        log.exception(e)
        return None

    finally:
        os.remove(image_path)
