import requests
import os

from src import *
from src.util import log


def __api_request(ingredient):
    data = {
        'appId': 'cd730bdb',
        'appKey': '0555561b71a1ebfa3479c8fd1d966b8c',
        'prhase': ingredient,
        'fields': ['item_name', 'brand_name', 'nf_calories'],
        'filters': {
            'item_type': 2
        }
    }
    response = requests.post("https://api.nutritionix.com/v1_1/search", json=data)
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
        if brand_name in dictionary:
            pair = dictionary[brand_name]
            new_calories = pair[0] + calories
            new_num = pair[1] + 1
            dictionary[brand_name] = (new_calories, new_num)
        else:
            pair = (calories, 1)
            dictionary[brand_name] = pair

    max_elem = 0
    max_calories = 0
    for item in dictionary:
        if dictionary[item][1] > max_elem:
            max_elem = dictionary[item][1]
            max_calories = dictionary[item][0]

    log.debug(max_calories/max_elem)
    return max_calories/max_elem
