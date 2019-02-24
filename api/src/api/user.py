from flask import request

from src.util import response


def get(user_id):
    return response.build(error=False, response=user_id)


def post():
    body = request.json
    required_parameters = ['first_name', 'last_name', 'email', 'username', 'password']
    if not all(x in body for x in required_parameters):
        return response.build(error=True, response='All request body parameters are required.')

    return response.build(error=False, response='OK')


def login_post():
    body = request.json
    required_parameters = ['username', 'password']
    if not all(x in body for x in required_parameters):
        return response.build(error=True, response='All request body parameters are required.')

    return response.build(error=False, response='OK')
