from flask import request

from src.util import response
from src.model.user import User
from src.db.sqlalchemy import db_session


def get(user_id):
    user = db_session().query(User).filter_by(username=user_id).first()
    if not user:
        return response.build(error=True, response='There is no user with that username.')
    return response.build(error=False, response=user.serialize())


def post():
    body = request.json
    required_parameters = ['first_name', 'last_name', 'email', 'username', 'password']
    if not all(x in body for x in required_parameters):
        return response.build(error=True, error_message='All request body parameters are required.')

    user = db_session().query(User).filter_by(username=body['username']).first()
    if user:
        return response.build(error=True, error_message='The user already exists.')
    
    user = User(
        username=body['username'],
        first_name=body['first_name'],
        last_name=body['last_name'],
        email=body['email'],
        password=body['password']
    )
    db_session().add(user)
    db_session().commit()

    return response.build(error=False, response=user.username)


def login_post():
    body = request.json
    required_parameters = ['username', 'password']
    if not all(x in body for x in required_parameters):
        return response.build(error=True, error_message='All request body parameters are required.')

    user = db_session().query(User).filter_by(username=body['username']).first()
    if not user:
        return response.build(error=True, error_message='There is no user with that username.')
    
    if user.password != body['password']:
        return response.build(error=True, error_message='Incorrect password.')
    else:
        return response.build(error=False, response=user.username)
