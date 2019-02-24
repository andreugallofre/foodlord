from flask import request

from src.util import response
from src.model.report import Report
from src.db.sqlalchemy import db_session

from src.util import response
from datetime import datetime, timedelta


def get(user_id):
    return response.build(error=False, response=user_id)


def get_info_last_days():
    d = datetime.datetime.today()
    fromDate = datetime.strptime(d, '%Y-%m-%d')

    day1 = db_session().query(Report).filter(datetime.utcfromtimestamp(Report.time).strftime('%Y-%m-%d') == fromDate).all()
    day2 = db_session().query(Report).filter(datetime.utcfromtimestamp(Report.time).strftime('%Y-%m-%d') == fromDate-timedelta(days=1)).all()
    day3 = db_session().query(Report).filter(datetime.utcfromtimestamp(Report.time).strftime('%Y-%m-%d') == fromDate-timedelta(days=2)).all()
    day4 = db_session().query(Report).filter(datetime.utcfromtimestamp(Report.time).strftime('%Y-%m-%d') == fromDate-timedelta(days=3)).all()
    day5 = db_session().query(Report).filter(datetime.utcfromtimestamp(Report.time).strftime('%Y-%m-%d') == fromDate-timedelta(days=4)).all()
    day6 = db_session().query(Report).filter(datetime.utcfromtimestamp(Report.time).strftime('%Y-%m-%d') == fromDate-timedelta(days=5)).all()
    day7 = db_session().query(Report).filter(datetime.utcfromtimestamp(Report.time).strftime('%Y-%m-%d') == fromDate-timedelta(days=6)).all()
    

    return None
