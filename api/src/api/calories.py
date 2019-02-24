import datetime

from flask import request

from src.db.sqlalchemy import db_session
from src.model.ingredient import Ingredient
from src.model.report import Report
from src.model.user import User
from src.util import check, response, log
from src.rapidapi import imagga, nutritionix


def get(image_url):
    tags_list = imagga.extract_tags_url(image_url)
    if tags_list is None:
        return response.build(error=True, error_message='Invalid input image.')

    response_dict = {'total_calories': 0.0, 'ingredients': []}
    for ingredient in tags_list:
        calories_count = nutritionix.get_ingredient_calories(ingredient)
        response_dict['total_calories'] += calories_count
        response_dict['ingredients'].append({'calories': calories_count, 'ingredient': ingredient})
    return response.build(error=False, response=response_dict)


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

    if tags_list is not None:
        return response.build(error=False, response=tags_list)
    else:
        return response.build(error=True, error_message='Invalid input image.')


def count_post():
    request_body = request.json
    if not check.exist('ingredients_list', request_body):
        return response.build(error=True, error_message='No ingredients specified.')

    response_dict = {'total_calories': 0.0, 'ingredients': []}
    try:
        for ingredient in request_body['ingredients_list']:
            calories_count = nutritionix.get_ingredient_calories(ingredient)
            response_dict['total_calories'] += calories_count
            response_dict['ingredients'].append({'calories': calories_count, 'ingredient': ingredient})
        return response.build(error=False, response=response_dict)
    except Exception as e:
        log.error('Error while counting calories.')
        log.exception(e)
        return response.build(error=True, error_message='Unexpected error.')


def confirm_post():
    request_body = request.json
    if not check.exist('ingredients_list', request_body):
        return response.build(error=True, error_message='No ingredients specified.')
    if not check.exist('user_id', request_body):
        return response.build(error=True, error_message='No user specified.')
    for ingredient in request_body['ingredients_list']:
        if not check.exist('calories', ingredient) or not check.exist('ingredient', ingredient):
            return response.build(error=True, error_message='No calories or ingredient specified.')

    user = db_session().query(User).filter_by(username=request_body['user_id']).first()
    if not user:
        return response.build(error=True, error_message='No user found with the given username.')
    else:
        calories = sum([ingredient['calories'] for ingredient in request_body['ingredients_list']])
        report = Report(
            username=request_body['user_id'],
            calories=calories,
            time=datetime.datetime.now()
        )
        db_session().add(report)
        db_session().flush()
        if not report.id:
            return response.build(error=True, error_message='Error adding an ingredient.')

        for ing in request_body['ingredients_list']:
            ingredient = Ingredient(
                report_id=report.id,
                calories=ing['calories'],
                name=ing['ingredient']
            )
            db_session().add(ingredient)
            db_session().flush()
            if not ingredient.id:
                return response.build(error=True, error_message='Error adding an ingredient.')

        db_session().commit()
        return response.build(error=False, response=dict(report_id=report.id))
