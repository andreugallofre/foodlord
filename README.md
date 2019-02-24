# Food Lord

[![HitCount](http://hits.dwyl.io/atsuky/foodlord.svg)](http://hits.dwyl.io/atsuky/foodlord)
[![GitHub stars](https://img.shields.io/github/stars/atsuky/foodlord.svg)](https://GitHub.com/atsuky/foodlord/stargazers/)
[![GitHub forks](https://img.shields.io/github/forks/atsuky/foodlord.svg)](https://GitHub.com/atsuky/foodlord/network/)
[![GitHub repo size in bytes](https://img.shields.io/github/repo-size/atsuky/foodlord.svg)](https://github.com/atsuky/foodlord)
[![GitHub contributors](https://img.shields.io/github/contributors/atsuky/foodlord.svg)](https://GitHub.com/atsuky/foodlord/graphs/contributors/)
[![GitHub license](https://img.shields.io/github/license/atsuky/foodlord.svg)](https://github.com/atsuky/foodlord/blob/master/LICENSE)

[Devpost](https://devpost.com/software/food-lord) | [Demo](http://foodlord.tk) | [API](https://rapidapi.com/AlbertSuarez/api/food-lord1)

🥑 You don't need a maths degree for counting calories.

## Inspiration

Have you ever thought about what are you really eating? Maybe no. Are you too lazy for counting calories and for
monitoring if you exceed the limit? Maybe yes. Here is where Food Lord borns. An application that allows you to take
a picture and automagically know what are you gonna eat!

## What it does

Our web app allows you to estimate how many calories and which ingredients there are in the picture that you sent
to the application. In order to do that, you only have to create an account and then take a picture or upload an image.

We know that this magic process could have bad results or ingredients that there aren't in the given image.
In order to solve that, we've added a feature that allows you to add and remove ingredients to the processed image.

Finally, the app will save this data (known as a report) and they will be available to check in the user dashboard,
where you can have a quick look about how you have been eating during the current week.

## How we built it

Frontend and backend are very different components connected by API requests.

At frontend, we can see a [React](https://reactjs.org/) application that uses the library
[Grommet](https://v2.grommet.io/) in order to use the UI components and integrated into a
[Docker compose](https://docs.docker.com/compose/).

In the other side of the application, we have the backend which is implemented with
[Python 3.6+](https://www.python.org/downloads/release/python-372/). For creating the API that allows the communication
between the two components, we have used [Flask](http://flask.pocoo.org/) and
[OpenAPI](https://swagger.io/docs/specification/about/) (connected themselves with
[Connexion](https://connexion.readthedocs.io/en/latest/) library), also integrated with Docker compose.

The core of the application, which allows us to estimate the calories and ingredients of a given image,
has been possible thanks to [RapidAPI](https://rapidapi.com/). Food Lord is using these three APIs:

- [Imagga](https://rapidapi.com/imagga/api/imagga-automated-image-tagging-and-categorization): this API allows us to
use a Computer vision segmentation model for tagging all the objects that we get from the image. We also filter these
tags using a threshold of 0.35 (35%).
- [Recipe](https://rapidapi.com/webknox/api/recipe): this API allows for getting all the ingredients from a huge
database. This permits us to filter the results that we got from Imagga Image Recognition API.
- [Nutritionix](https://rapidapi.com/msilverman/api/nutritionix-nutrition-database): this API allows us to get
all the information related to calories. Given a list of ingredients, we can get an estimation
of how many calories have those ingredients.

This aggregation of APIs (called Food Lord API) has been deployed and exposed in the
[RapidAPI Marketplace](https://rapidapi.com/AlbertSuarez/api/food-lord1), where you can test
with an Internet-accessible image URL.

All this system is finally deployed in a [Google Cloud VM](https://cloud.google.com/compute/docs/instances/) and
hosted in a free [.tk domain](http://www.dot.tk/en/index.html?lang=en).

## Challenges we ran into

Since we have never used the kind of technology we needed to do a deep research in order to find the APIs to use
with RapidAPI. Also we have found some problems when we were coding the fronted because we used a
new library for us – Grommet components.

However, the most challenging part was deploying the web in Google Cloud Platform since a lot of ports of
the Wi-Fi were blocked.

## Accomplishments that we're proud of

We are proud of the project that we built. We have developed all the web app faster than we actually expected so
we can take special care of a good UX experience and reach the objectives that we have.

## What we learned

We learned a lot using the RapidAPI and discovering the huge amount of APIs that we have at our disposal. Also,
regarding the front-end part, we learned a lot using Grommet, which is a React library.

## What's next for Food Lord

There are a lot of enhancements and next steps that Food Lord could have. But, for example, could be interesting to
share the meals and their estimations with the user dietist so he/she could help the user to be even healthier.

## Requirements

1. docker-compose

## Usage

To run the whole stack, please execute the following from the root directory:

1. Run the server as a docker container

    ```bash
    # with docker-compose
    docker-compose up -d --build

    # with a bash script
    source run.sh
    ```

## Authors

- [Carlota Catot](https://github.com/carlotacb)
- [Fèlix Arribas](https://github.com/felixarpa)
- [Andreu Gallofre](https://github.com/atsuky)
- [Albert Suàrez](https://github.com/AlbertSuarez)

## License

MIT © Food Lord