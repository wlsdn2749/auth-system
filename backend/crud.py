from sqlalchemy.orm import Session

import models, schemas

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str) -> models.User:
    return db.query(models.User).filter(models.User.email == email).first()
    # query.first는 non-iteratble User객체를 가져온다.

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all

def create_user(db : Session, user: schemas.UserCreate):
    hashed_password = user.password
    db_user = models.User(name = user.name, email=user.email, hashed_password = hashed_password)
    db.add(db_user) # add instance object to session
    db.commit() # commit = save
    db.refresh(db_user) # refresh your instance
    return db_user

def get_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Item).offset(skip).limit(limit).all()

def create_user_item(db : Session, item: schemas.ItemCreate, user_id: int):
    db_item = models.Item(**item.dict(), owner_id = user_id)
    db.add(db_item) # add instance object to session
    db.commit() # commit = save
    db.refresh(db_item) # refresh your instance
    return db_item
