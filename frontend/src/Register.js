import { Component, useState } from "react";
import { useNavigate } from "react-router";
import { fetchAccessToken, setAccessToken } from "./Auth";
import axios from "axios";

export default function Register(){
    const navigate = useNavigate();
    // what is Navigate?
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    // check to see if the fields are not empty
    const register = () => {
       if((username == "") & (password == "")){
        return;
       } else if(password == password2){
        // make api call to our backend..
        axios
        .post("http://localhost:8000/register",{
            name: username,
            email: email,
            password: password,
        })
        .then(function (response) {
            console.log(response.data, "response data");
            alert("인증을 위한 화면으로 이동합니다.")
            navigate("/email-verify");
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
            alert("이 아디를 가진 유저가 이미 존재합니다.")
            navigate("/")
        })
       } else {
        alert("비밀번호가 일치하지 않습니다.");
       }
       return navigate("/");
    };

    return (
        <>
        <div>
            <div style={{ minHeight: 800, marginTop: 30}}>
                <h1>login page</h1>
                <div style={{ marginTop: 30}}>
                    {fetchAccessToken() ? (
                        <p>you are loggin in</p>
                    ) : (
                        <div>
                            <form>
                                <label>Input E-mail Address</label>
                                <input
                                    type="text"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label>Input Username</label>
                                <input
                                    type="text"
                                    onChange={(e) => setUsername(e.target.value)}
                                />

                                <label>Input Password</label>
                                <input
                                    type="text"
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <label>Input Confirm Password</label>
                                <input
                                    type="text"
                                    onChange={(e) => setPassword2(e.target.value)}
                                />
                                {/* <button type="submit">회원가입 하기</button> */}

                                <button onClick={register}>Register</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    );
}