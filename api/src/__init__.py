IMAGGA_API_URL_TAGGING = 'https://imagga-api.p.rapidapi.com/tagging'
IMAGGA_API_URL_CONTENT = 'https://imagga-api.p.rapidapi.com/content'

RECIPE_API_URL_SEARCH = 'https://webknox-recipes.p.rapidapi.com/recipes/search'
RECIPE_API_URL_INGREDIENTS = 'https://webknox-recipes.p.rapidapi.com/recipes'
RECIPE_API_URL_AUTOCOMPLETE = 'https://webknox-recipes.p.rapidapi.com/food/ingredients/autocomplete'
RECIPE_POOL_NUMBER = 10

NUTRITIONIX_API_CALORIES = 'https://nutritionix-api.p.rapidapi.com/v1_1/search'

IGNORED_TAGS = ['dish', 'nutriment', 'food', 'dinner', 'lunch', 'meal', 'tasty', 'snack food', 'bowl']

AI_CONFIDENCE = 35
MAIN_DISH_CONFIDENCE = 80

DB_USER = 'foodlord'
DB_PASSWORD = 'foodlord1234'
DB_DB = 'foodlord'
DB_HOST = 'localhost'
DB_PORT = 5432

__all__ = [
    'IMAGGA_API_URL_TAGGING',
    'IMAGGA_API_URL_CONTENT',
    'RECIPE_API_URL_SEARCH',
    'RECIPE_API_URL_INGREDIENTS',
    'RECIPE_API_URL_AUTOCOMPLETE',
    'RECIPE_POOL_NUMBER',
    'NUTRITIONIX_API_CALORIES',
    'IGNORED_TAGS',
    'AI_CONFIDENCE',
    'MAIN_DISH_CONFIDENCE',
    'DB_USER',
    'DB_PASSWORD',
    'DB_DB',
    'DB_HOST',
    'DB_PORT'
]
