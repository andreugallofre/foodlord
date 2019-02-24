import sqlalchemy as db

from src.db.sqlalchemy import Base

class User(Base):
    __tablename__ = 'foodlord_user'

    username = db.Column(db.String(100), primary_key=True)
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    password = db.Column(db.String(500))

    def serialize(self):
        return dict(
            username=self.username,
            first_name=self.first_name,
            last_name=self.last_name,
            email=self.emai,
            password=self.password
        )