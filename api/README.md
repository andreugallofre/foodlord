# Food Lord: API

## Requirements

1. Python 3.6+
2. docker-ce (as provided by docker package repos)
3. docker-compose (as provided by PyPI)

## Recommendations

Usage of [virtualenv](https://realpython.com/blog/python/python-virtual-environments-a-primer/) is recommended
for package library / runtime isolation.

## Usage

To run the server, please execute the following from the root directory:

1. Setup virtual environment

2. Install dependencies

    ```bash
    pip3 install -r requirements.lock
    ```

3. Add RAPID_API_KEY to the `api` module environment

    ```bash
    echo RAPID_API_KEY={YOUR_CLIENT_KEY} > .env
    ```

4. Run API server as a python module

    ```bash
    python3 -m src
    ```
