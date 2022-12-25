import {Routes, Route} from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile";
import Main from "./Main";
import Register from "./Register"
import EmailVerify from "./EmailVerify";
import { RequireAccessToken } from "./Auth";
import './App.css';

function App() {
  return (
    <div className = "App">
      <Routes> 
        <Route path ="/" element = {<Main/>}/>
        <Route path ="/login" element = {<Login/>}/>
        <Route 
          path ="/profile"
          element = {
            <RequireAccessToken>
              <Profile/>
            </RequireAccessToken>
          }
        />
        <Route path ="/register" element = {<Register/>}/>
        <Route path ="/email-verify" element = {<EmailVerify/>}/>
        
      </Routes>
      
      
    </div>
  );
}

export default App;
