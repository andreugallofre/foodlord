import requests
import os

from src import *

def get_recipe_id(tag):
    
    headers = {
        'X-RapidAPI-Key': os.environ['RAPID_API_KEY']
    } 
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
                return (recipe['id'])
        
        return(recipes[0]['id'])

    return None

def ingredient_exists(ingredient):

    headers = {
        'X-RapidAPI-Key': os.environ['RAPID_API_KEY']
    } 
    data = {
        'query': ingredient
    } 

    response = requests.get(RECIPE_API_URL_AUTOCOMPLETE, params=data, headers=headers)
    response_json = response.json()
    
    for ing in response_json:
        if ingredient.lower() == ing['name'].lower():
            return True
    
    return False

def get_ingredients(id):
    headers = {
        'X-RapidAPI-Key': os.environ['RAPID_API_KEY']
    } 
    data = {
        'id': id
    } 
    response = requests.get(RECIPE_API_URL_INGREDIENTS + '/' + str(id) + "/information", params=data, headers=headers)
    response_json = response.json()

    if 'extendedIngredients' in response_json:
        ingredients = response_json['extendedIngredients']

        result = []

        for ingredient in ingredients:
            result.append(ingredient['name'])


    print(result)