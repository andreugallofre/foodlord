import requests
import os

from src import *

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



get_info_url('https://img-global.cpcdn.com/002_recipes/5af971b59aeac028/751x532cq70/bocata-de-jamon-foto-principal.jpg')