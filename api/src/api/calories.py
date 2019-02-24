from flask import request

from src.util import check, response
from src.rapidapi import imagga, nutritionix


def ingredients_post():
    request_body = request.json
    if not check.exist('image_url', request_body) and not check.exist('image_base64', request_body):
        return response.build(error=True, error_message='No specified image in the request body.')
    if check.exist('image_url', request_body) and check.exist('image_base64', request_body):
        return response.build(error=True, error_message='Both image_url and image_base64 specified.')

    if check.exist('image_url', request_body):
        tags_list = imagga.extract_tags_url(request_body['image_url'])
    else:
        tags_list = imagga.extract_tags_base64(request_body['image_base64'])

    if tags_list:
        return response.build(error=False, response=tags_list)
    else:
        return response.build(error=True, error_message='Invalid input image.')


def count_post():
    request_body = request.json
    if not check.exist('ingredients_list', request_body):
        return response.build(error=True, error_message='No ingredients specified.')

    response_dict = {'total_calories': 0.0, 'ingredients': []}
    for ingredient in request_body['ingredients_list']:
        calories_count = nutritionix.get_ingredient_calories(ingredient)
        response_dict['total_calories'] += calories_count
        response_dict['ingredients'].append({'calories': calories_count, 'ingredient': ingredient})
    return response.build(error=False, response=response_dict)


def confirm_post():
    request_body = request.json
    if not check.exist('ingredients_list', request_body):
        return response.build(error=True, error_message='No ingredients specified.')
    if not check.exist('user_id', request_body):
        return response.build(error=True, error_message='No user specified.')
    for ingredient in request_body['ingredients_list']:
        if not check.exist('calories', ingredient) or not check.exist('ingredient', ingredient):
            return response.build(error=True, error_message='No calories or ingredient specified.')

    response_dict = {'report_id': None}
    return response.build(error=False, response=response_dict)
