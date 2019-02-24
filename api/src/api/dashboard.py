import datetime

from sqlalchemy import and_

from src.model.report import Report
from src.db.sqlalchemy import db_session
from src.util import response, log


def get(user_id):
    try:
        week_date = datetime.datetime.today() - datetime.timedelta(days=7)
        reports = db_session().query(Report).filter(and_(Report.time >= week_date, Report.username == user_id)).all()

        response_dict = {}
        while week_date.date() < datetime.datetime.now().date():
            week_date = week_date + datetime.timedelta(days=1)
            response_dict[week_date.strftime("%Y-%m-%d")] = 0.0
        for report in reports:
            response_dict[report.time.strftime("%Y-%m-%d")] += float(report.calories)

        response_list = []
        for key, value in response_dict.items():
            response_list.append({'date': key, 'calories': value})
        return response.build(error=False, response=response_list)
    except Exception as e:
        log.error('Exception while getting data for the dashboard.')
        log.exception(e)
        return response.build(error=True, error_message='Unexpected error.')
