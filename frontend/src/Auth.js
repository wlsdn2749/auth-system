import { useLocation, Navigate } from "react-router-dom"
import { useNavigate } from "react-router";

export const setAccessToken = (token) => {
    const fetchAuth = fetchRefreshToken();

    if(fetchAuth){
        localStorage.setItem('access-token', token);
    } else {
        localStorage.removeItem('access-token');
    }

}

export const fetchAccessToken = (token) => {
    return localStorage.getItem('access-token')
}

export function RequireAccessToken({children}){
    
    let auth = fetchAccessToken()
    let location = useLocation()

    if(!auth){
        alert("로그인이 필요합니다. 로그인을 진행해주세요");
        return <Navigate to='/login' state= {{from : location}}/>;
    }

    return children;
}
export const setRefreshToken = (token) => {
    localStorage.setItem('refresh-token', token)
}

export const fetchRefreshToken = (token) => {
    return localStorage.getItem('refresh-token')
}

export function RequireRefreshToken({children}){
    
    let auth = fetchAccessToken()
    let location = useLocation()

    if(!auth){
        return <Navigate to='/' state= {{from : location}}/>;
    }

    return children;
}