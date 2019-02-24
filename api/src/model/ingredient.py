import sqlalchemy as db

from sqlalchemy.orm import relationship
from src.db.sqlalchemy import Base

from src.model.report import Report


class Ingredient(Base):
    __tablename__ = 'foodlord_ingredient'

    id = db.Column(db.Integer, primary_key=True)
    report_id = db.Column(db.Integer, db.ForeignKey('foodlord_report.id'), nullable=False)
    calories = db.Column(db.Numeric, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    report = relationship(Report.__name__)

    def serialize(self):
        return dict(
            id=self.id,
            report_id=self.report_id,
            calories=self.calories,
            name=self.name,
            report=None if not self.report else self.report.serialize()
        )
