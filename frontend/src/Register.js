import { useState } from "react";
import { useNavigate } from "react-router";
import { fetchToken, setToken } from "./Auth";
import axios from "axios";

export default function Login(){
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
                                <label style={{ marginRight: 10}}>Input Username</label>
                                <input
                                    type="text"
                                    onChange={(e) => setUsername(e.target.value)}
                                />

                                <label style={{ marginRight: 10}}>Input Password</label>
                                <input
                                    type="text"
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <button onClick={login}>Login</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}