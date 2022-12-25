import { Component, useState } from "react";
import { useNavigate } from "react-router";
import { fetchAccessToken, setAccessToken } from "./Auth";
import axios from "axios";

export default function EmailVerify(){
    const navigate = useNavigate();
    // what is Navigate?
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");

    // check to see if the fields are not empty
    const verify = () => {
        axios
        .post("http://localhost:8000/register-verify",{
            access_token: token,
            email: email,
            token_type: "bearer"
        })
        .then(function (response) {
            console.log(response.data, "response data");
            alert("인증이 완료되었습니다.")
            navigate("/");
            //console.log(1);
            // if (response.data){
            //     navigate("/");
            // }
            // navigate("/");
            
            // 왜 여기에 코드를 작성하면 오류가 나는걸까..?
            // 
        })
        .catch(function (error){
            console.log(error, "error");
            alert("토큰값이 다릅니다.")
            navigate("/email-verify")
        })

       return navigate("/check-processing");
    };

    return (
        <>
        <div>
            이메일 과 인증번호를 입력하세요
            <form>
                <label style={{ marginRight: 10}}>Input Email</label>
                <input
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label style={{ marginRight: 10}}>Input Token</label>
                <input
                    type="text"
                    onChange={(e) => setToken(e.target.value)}
                />
                <button onClick={verify}>인증하기</button>
            </form>
        </div>
        </>
    );
}