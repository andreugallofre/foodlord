import requests
import os

from src import *

def __api_request(ingredient):
    headers = {
        'X-RapidAPI-Key': os.environ['RAPID_API_KEY']
    } 
    data = {
        'prhase': ingredient,
        'fields': 'item_name,brand_name,nf_calories'
    } 

    response = requests.get(NUTRITIONIX_API_CALORIES + "/" + ingredient, params=data, headers=headers)
    response_json = response.json()

    return response_json

def __extract_values(json):
    result = []

    hits = json['hits']

    for hit in hits:
        brand_name = hit['fields']['brand_name']
        calories = hit['fields']['nf_calories']
    
        pair = (calories, brand_name)
        result.append(pair)

    return result

def __parse_values(values):
    
    max_value = 0
    min_value = 1000000

    max_tuple = None
    min_tuple = None
    for value in values:
        if value[0] < min_value:
            min_value = value[0]
            min_tuple = value
        if value[0] > max_value:
            max_value = value[0]
            max_tuple = value

    values.remove(max_tuple)
    values.remove(min_tuple)

    return values

def get_ingredient_calories(ingredient):
    
    response_json = __api_request(ingredient)
    new_values = __parse_values(__extract_values(response_json))

    dictionary = {}

    for value in new_values:
        brand_name = value[1]
        calories = value[0]

        if (brand_name in dictionary):
            pair = dictionary[brand_name]
            newcalories = pair[0] + calories
            newnum = pair[1] + 1
            dictionary[brand_name] = (newcalories, newnum)
        else:
            pair = (calories,1)
            dictionary[brand_name] = pair

    max_elem = 0
    max_calories = 0
    for item in dictionary:
        if dictionary[item][1] > max_elem:
            max_elem = dictionary[item][1]
            max_calories = dictionary[item][0]

    print (max_calories/max_elem)
    return max_calories/max_elem