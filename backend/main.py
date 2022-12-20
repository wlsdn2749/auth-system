from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer,OAuth2PasswordRequestForm
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from passlib.context import CryptContext
import crud, models, schemas, utils
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

test_user = {
    "username" : "temitope",
    "password" : "temipassword",
}

# to get a string like this run:
# openssl rand -hex 32
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
        "disabled": False,
    }
}
    
app = FastAPI()

origins = {
    "http://localhost",
    "http://localhost:3000",
}

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")



# def verify_password(plain_password, hashed_password):
#     return pwd_context.verify(plain_password, hashed_password)

# def get_password_hash(password):
#     return pwd_context.hash(password)


# def get_user(db, username: str):
#     if username in db:
#         user_dict = db[username]
#         return UserInDB(**user_dict)

# def authenticate_user(fake_db, username : str,  password : str):
#     user = get_user(fake_db, username)
#     if not user:
#         return False
#     if not verify_password(password, user.hashed_password):
#         return False   
#     return user



# Dependency

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/users/", response_model = schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)

@app.get("/users/", response_model=list[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users

@app.get("/users/{user_id}", response_model = schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.post("/users/{user_id}/items/", response_model=schemas.Item)
def create_item_for_user(
    user_id: int, item: schemas.ItemCreate, db: Session = Depends(get_db)
):
    return crud.create_user_item(db=db, item=item, user_id=user_id)


@app.get("/items/", response_model=list[schemas.Item])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_items(db, skip=skip, limit=limit)
    return items

# @app.post("/login", response_model=schemas.User)
# async def user_login(loginitem: schemas.UserCreate, db: Session = Depends(get_db)):

#     data = jsonable_encoder(loginitem)
#     if data['username'] == test_user['username'] and data['password'] == test_user['password']:

#         encoded_jwt = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
#         return {"token": encoded_jwt}
    
#     else:
#         return {"message":"login failed"}
    
@app.post("/token", response_model=schemas.Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(),
                                 db: Session = Depends(get_db)):                                 
    # user = authenticate_user(fake_users_db, form_data.username, form_data.password) # 인증
    user = utils.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate" : "Bearer"},
        )
    # if Users?
    access_token = utils.create_access_token(
        data={"sub": user.email},
        expires_delta=timedelta(minutes=utils.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return {"access_token" : access_token, "token_type" : "bearer"}


@app.post('/register', summary="Create new user", response_model=schemas.User)
async def create_user(data: schemas.UserCreate, db : Session = Depends(get_db)):
    print(data)
    # querying database to check if user already exist
    user = crud.get_user_by_email(db, data.email)
    if user is not None:
            raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exist"
        )
    user = {
        'name' : data.name,
        'email': data.email,
        'hashed_password': utils.get_hashed_password(data.password),
    }
    created_user = crud.create_user(db=db, user=user)
    return created_user # id, is_active, UserBase....

