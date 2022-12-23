import { useEffect, useState } from "react";
import { useNavigate, redirect } from "react-router-dom";
import { fetchAccessToken, RequireAccessToken, setAccessToken } from "./Auth";
import axios from "axios";
import Template from "./components/templetes";
import Logo from "./components/logo";
import styled from "styled-components";
import LoginBlock from "./"
// import { useNavigate } from "react-router-dom";

const StyleButton = styled.button`
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 1rem;
    line-height: 1.5;
    border: 1px solid lightgray;
    color: gray;
    background: white;
`;

export default function Main(){
    const navigate = useNavigate();
    const [isLogin, setisLogin] = useState(false);
    
    const checkIsTokenAvailable = () => {
        let token = fetchAccessToken();
        {(token)
        ? (setisLogin(true))
        : (setisLogin(false))}
    }

    useEffect( () => {
        checkIsTokenAvailable();
    })

    const onClickButtonLogin = () => {
        navigate("/login");
    };

    const onClickButtonLogOut = () => {
        localStorage.removeItem("access-token");
        checkIsTokenAvailable();
        navigate("/");
    };

    const onClickButtonRegister = () => {
        navigate("/register");
    };

    const onClickButtonProfile = () => {
        navigate("/profile");
    };

    return(
        <Template>
            <Logo>
            </Logo>
            <div>
                {!isLogin 
                  ? <StyleButton onClick= { onClickButtonLogin }>
                        로그인
                    </StyleButton>
                  : <StyleButton onClick= { onClickButtonLogOut }>
                        로그아웃
                    </StyleButton>
                }   
            </div>
            <StyleButton onClick= { onClickButtonRegister }>
                회원가입
            </StyleButton>
            <StyleButton onClick= { onClickButtonProfile }>
                프로필(로그인을 해야 접속가능)
            </StyleButton>
            <div>
                {fetchAccessToken() ? (
                    <p>login</p>
                ) : (
                    <p>logout</p>
                )}
            </div>
        </Template>
    )
}