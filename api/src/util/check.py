def exist(key, request_body):
    return key in request_body and request_body[key] and (type(request_body[key]) != str or request_body[key].strip())
