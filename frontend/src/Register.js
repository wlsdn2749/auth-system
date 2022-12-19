import { useState } from "react";
import { useNavigate } from "react-router";
import { fetchToken, setToken } from "./Auth";
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
            email: email,
            username: username,
            password: password,
        })
        .then(function (response) {
            console.log(response.data.token, "response.data.token");
            if (response.data.token){
                setToken(response.data.token);
                navigate("/profile");
            }
        })
        .catch(function (error){
            console.log(error, "error");
        })
       } else {
        alert("비밀번호가 일치하지 않습니다.");
       }
    };

    return (
        <>
            <div style={{ minHeight: 800, marginTop: 30}}>
                <h1>login page</h1>
                <div style={{ marginTop: 30}}>
                    {fetchToken() ? (
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
        </>
    );
}