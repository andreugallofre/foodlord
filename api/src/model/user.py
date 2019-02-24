import sqlalchemy as db

from src.db.sqlalchemy import Base


class User(Base):
    __tablename__ = 'foodlord_user'

    username = db.Column(db.String(100), primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(500), nullable=False)

    def serialize(self):
        return dict(
            username=self.username,
            first_name=self.first_name,
            last_name=self.last_name,
            email=self.emai,
            password=self.password
        )
