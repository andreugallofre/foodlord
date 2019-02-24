from src.util import response


def get(user_id):
    return response.build(error=False, response=user_id)
