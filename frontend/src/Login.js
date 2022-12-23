import { useState } from "react";
import { useNavigate } from "react-router";
import { redirect } from "react-router-dom";
import { fetchAccessToken, setAccessToken, setRefreshToken, fetchRefreshToken } from "./Auth";
import axios from "axios";

export default function Login(){
    const navigate = useNavigate();
    // what is Navigate?
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    // check to see if the fields are not empty
    const login = () => {
       if((username == "") & (password == "")){
        return;
       } else {
        // make api call to our backend..
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        axios({
            method: "post",
            url: "http://localhost:8000/token",
            data: formData,
            headers: { "Content-Type": "multipart/form-data"}
        })
        .then(function (response) {
            console.log(response.data, "response.data.token");
            if (response.data.access_token){
                setRefreshToken(response.data.refresh_token);
                setAccessToken(response.data.access_token);
                // navigate("/profile");
                return navigate("/");
            }
        })
        .catch(function (error){
            console.log(error, "error");
        })
       }
       return navigate("/");
    };

    return (
        <>
            <div style={{ minHeight: 800, marginTop: 30}}>
                <h1>login page</h1>
                <div style={{ marginTop: 30}}>
                    {fetchAccessToken() ? (
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