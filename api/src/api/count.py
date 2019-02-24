from flask import request

from src.util import check, response
from src.rapidapi import imagga


def post():
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
