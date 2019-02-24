import sqlalchemy as db

from sqlalchemy.orm import relationship
from src.db.sqlalchemy import Base

from src.model.report import Report

class Ingredient(Base):
    __tablename__ = 'foodlord_ingredient'

    id = db.Column(db.Integer, primary_key=True)
    report_id = db.Column(db.Integer, db.ForeignKey('foodlord_report.id'), nullable=False)
    calories = db.Column(db.Float)
    name = db.Column(db.String(100))
    report = relationship(Report.__name__)

    def serialize(self):
        return dict(
            report_id=self.user_id,
            calories=self.calories,
            name=self.name,
            report=None if not self.user else self.user.serialize()
        )