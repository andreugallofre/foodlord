import requests
import os

from src import *
from src.rapidapi import recipe

def exctract_tags_url(url):
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
        ingredients = []
        main_dish = []

        tags = response_json['results'][0]['tags']
        for tag in tags:
            print (str(tag['confidence']) + " " + tag['tag'])
            if tag['confidence'] > 80:
                main_dish.append(tag['tag'])
            if tag['confidence'] > AI_CONFIDENCE:
                ingredients.append(tag['tag'])

        return filter_results(ingredients, main_dish)
    return None    

def filter_results (tag_list, main_dish):

    result = []
    for tag in tag_list:
        if recipe.ingredient_exists(tag):
            result.append(tag)

    for tag in main_dish:
        if tag not in IGNORED_TAGS:
            result.append(tag)

    return result

def get_info_image(image):
    headers = {
        'X-RapidAPI-Key': os.environ['RAPID_API_KEY'],
        'Content-Type': 'application/x-www-form-urlencoded'
    } 
    data = {
        'file': image
    }

    response = requests.get(IMAGGA_API_URL_CONTENT, params=data, headers=headers)
    response_json = response.json()

    print(response_json)

print(exctract_tags_url('https://img.taste.com.au/hoyK5oCA/taste/2016/11/hamburger-with-caramelised-pineapple-90338-1.jpeg'))