import {Routes, Route} from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile";
import Main from "./Main";
import Register from "./Register"
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
        
      </Routes>
      
      
    </div>
  );
}

export default App;
