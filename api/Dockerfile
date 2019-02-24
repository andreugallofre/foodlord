FROM python:3.6
ADD . /srv/foodlord
WORKDIR /srv/foodlord
RUN pip3 install -r requirements.txt
CMD uwsgi --ini foodlord.ini