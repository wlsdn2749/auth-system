import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchToken, setToken } from "./Auth";
import axios from "axios";
import Template from "./components/templetes";
import Logo from "./components/logo";
import styled from "styled-components";
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

    const onClickButtonLogin = () => {
        navigate("/login");
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
            <StyleButton onClick= { onClickButtonLogin }>
                로그인
            </StyleButton>
            <StyleButton onClick= { onClickButtonRegister }>
                회원가입
            </StyleButton>
            <StyleButton onClick= { onClickButtonProfile }>
                프로필(로그인을 해야 접속가능)
            </StyleButton>
        </Template>
    )
}