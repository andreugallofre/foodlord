from flask import jsonify


def build(error, error_message=None, response=None):
    json_response = {'error': error}
    if error:
        json_response['message'] = error_message
        return jsonify(json_response), 400
    else:
        json_response['response'] = response
        return jsonify(json_response), 200
