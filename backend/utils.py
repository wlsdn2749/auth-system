from passlib.context import CryptContext
import os
from datetime import datetime, timedelta
from jose import jwt


# REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7 # 7 days
ALGORITHM = "HS256"
# JWT_SECRET_KEY = os.environ['JWT_SECRET_KEY']     # should be kept secret
# JWT_REFRESH_SECRET_KEY = os.environ['JWT_REFRESH_SECRET_KEY']      # should be kept secret
SECRET_KEY = "07f7576d46d2871ba587ceabd235f9234967ac12033c47d8047662c21c59732b"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_hashed_password(password: str) -> str:
    return password_context.hash(password)


def verify_password(password: str, hashed_pass: str) -> bool:
    return password_context.verify(password, hashed_pass)


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy() # edict
    if expires_delta:
        expire = datetime.utcnow() + expires_delta # 아니면 지정
    else:
        expire = datetime.utcnow() + timedelta(minutes=15) # 기본이 15분
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt  # encoded_jwt == access_token??
