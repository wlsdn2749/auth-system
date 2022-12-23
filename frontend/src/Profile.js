import { useNavigate } from "react-router";
import { fetchAccessToken } from "./Auth";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile(){
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const access_token = fetchAccessToken();
    const signOut = () => {
        localStorage.removeItem("access-token");
        navigate("/");
    };

    useEffect(() => {
        profileInfo()
    })
    
    const profileInfo = () => {
        if(!access_token){
            navigate("/error_401");
        } else {
         axios
         .get("http://localhost:8000/profile",{
            headers:{
              'accept': 'application/json',
              'Authorization': 'bearer ' + access_token,
            }
         })
         .then(function (response) {
             console.log(response.data, "response data");
             console.log(1);
             if(response.data){
                setId(response.data.id);
                setEmail(response.data.email);
             }
             // if (response.data){
             //     navigate("/");
             // }
             // navigate("/");
             
             // 왜 여기에 코드를 작성하면 오류가 나는걸까..?
             // 
         })
         .catch(function (error){
             console.log(error, "error");
             console.log(access_token);
             alert("에러가 발생 했습니다. 메인페이지로 이동합니다.")
            //  navigate("/")
         })
        } 
     };

    return (
        <>
            <div style={{ marginTop: 20, minHeight: 700 }}>
                <h1>profile page</h1>
                <p>Hello there, welcome to your profile page</p>
                <p>UserId : {id}</p>
                <p>UserEmail : {email}</p>
                <button onClick={signOut}>sign out </button>
            </div>
        </>
    );
}