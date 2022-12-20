from passlib.context import CryptContext
import os
from datetime import datetime, timedelta
from jose import jwt
from sqlalchemy.orm import Session
import crud, schemas
from jose import jwt, JWTError
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status

# REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7 # 7 days
ALGORITHM = "HS256"
# JWT_SECRET_KEY = os.environ['JWT_SECRET_KEY']     # should be kept secret
# JWT_REFRESH_SECRET_KEY = os.environ['JWT_REFRESH_SECRET_KEY']      # should be kept secret
SECRET_KEY = "07f7576d46d2871ba587ceabd235f9234967ac12033c47d8047662c21c59732b"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_hashed_password(password: str) -> str:
    return password_context.hash(password)


def verify_password(password: str, hashed_pass: str) -> bool:
    return password_context.verify(password, hashed_pass)


def authenticate_user(db: Session, email : str, password : str):
    user = crud.get_user_by_email(db, email)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False   
    return user

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy() # dict
    if expires_delta:
        expire = datetime.utcnow() + expires_delta # 아니면 지정
    else:
        expire = datetime.utcnow() + timedelta(minutes=15) # 기본이 15분
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt  # encoded_jwt == access_token??

async def get_current_user(token: str = Depends(oauth2_scheme),
                           db = Session):
    """
        jwt를 decode를 하기 위해서는
        token, SECRET_KEY, algorihms가 필요한가?
    
        decoded된 payload에서 sub를 가져온다 = dict로된 payload에서 sub라는 key를 사용하여 value를 가져온다.
    
        get method가 None를 리턴한다면
        Error raise 그렇지 않다면? token_data에 TokenData(username)을 넣는다.. ok
    
        DB와 만들어둔 TokenData Username을 parameter로 user객체를 get_user()
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    ) # 401 errors
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM]) # jwt를 decode
        username : str = payload.get("sub") 
        
        if username is None:
            raise credentials_exception
        token_data = schemas.TokenData(username=username)
        
    except JWTError:
        raise credentials_exception
    user = crud.get_user_by_email(db, username=token_data.username)
    
    if user is None:
        raise credentials_exception
    return user