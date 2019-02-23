from flask import request

from src.util import check, response


def post():
    request_body = request.body
    if not check.exist('image_url', request_body) and not check.exist('image_base64', request_body):
        response.build(error=True, error_message='No specified image in the request body.')
    if check.exist('image_url', request_body) and check.exist('image_base64', request_body):
        response.build(error=True, error_message='Both image_url and image_base64 specified.')

    if check.exist('image_url', request_body):
        pass
    else:
        pass

    return 'OK', 200
