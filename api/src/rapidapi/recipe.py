import requests
import os

from src import *


def __get_recipe_id(tag):
    # Not used
    headers = {'X-RapidAPI-Key': os.environ['RAPID_API_KEY']}
    data = {
        'number': 10,
        'query': tag
    }
    response = requests.get(RECIPE_API_URL_SEARCH, params=data, headers=headers)
    response_json = response.json()
    if 'results' in response_json:
        recipes = response_json['results']
        for recipe in recipes:
            if tag in recipe['title'].lower():
                return recipe['id']
        return recipes[0]['id']
    return None


def __get_ingredients(ingredient_id):
    # Not used
    headers = {'X-RapidAPI-Key': os.environ['RAPID_API_KEY']}
    data = {
        'id': ingredient_id
    }
    response = requests.get(RECIPE_API_URL_INGREDIENTS + '/' + str(ingredient_id) + "/information", params=data, headers=headers)
    response_json = response.json()
    if 'extendedIngredients' in response_json:
        ingredients = response_json['extendedIngredients']
        result = []
        for ingredient in ingredients:
            result.append(ingredient['name'])


def ingredient_exists(ingredient):
    headers = {'X-RapidAPI-Key': os.environ['RAPID_API_KEY']}
    data = {
        'query': ingredient
    }
    response = requests.get(RECIPE_API_URL_AUTOCOMPLETE, params=data, headers=headers)
    response_json = response.json()
    for ing in response_json:
        if ingredient.lower() == ing['name'].lower():
            return ingredient
    return None
