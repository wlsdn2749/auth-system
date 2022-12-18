import {Routes, Route} from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile";
import { RequireToken } from "./Auth";
import './App.css';

function App() {
  return (
    <div className = "App">
      <Routes> 
        <Route path ="/" element = {<Login/>}/>
        {/* <Route path ="/register" element = {</} */}
        <Route 
          path ="/profile"
          element = {
            <RequireToken>
              <Profile/>
            </RequireToken>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
