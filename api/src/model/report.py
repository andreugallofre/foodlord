import sqlalchemy as db

from sqlalchemy.orm import relationship
from src.db.sqlalchemy import Base

from src.model.user import User


class Report(Base):
    __tablename__ = 'foodlord_report'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), db.ForeignKey('foodlord_user.username'), nullable=False)
    calories = db.Column(db.Numeric, nullable=False)
    time = db.Column(db.DateTime(timezone=False), nullable=False)
    user = relationship(User.__name__)

    def serialize(self):
        return dict(
            id=self.id,
            username=self.username,
            calories=self.calories,
            time=self.time,
            user=None if not self.user else self.user.serialize()
        )
