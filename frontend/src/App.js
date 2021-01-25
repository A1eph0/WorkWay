import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Axios from "axios";
import UserContext from './context/UserContext'
import Home from './components/misc-pages/Home.page'
import SignIn from './components/misc-pages/SignIn.page'
import SignUp from './components/misc-pages/SignUp.page'
import A_Profile from './components/a-pages/Profile.page'
import R_Profile from './components/r-pages/Profile.page'
import NewJob from './components/r-pages/NewJob.page'
import Search from './components/a-pages/Search.page'
import A_Dash from './components/a-pages/Dash.page'
import R_Dash from './components/r-pages/Dash.page'
import Emp from './components/r-pages/Emp.page'

export default function App() {
  let [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  })
  
  useEffect(() => {
      const checkLoggedIn = async () => {
        let token = await localStorage.getItem("auth-token")
        if (token === null) {
          localStorage.setItem("auth-token", "");
          token = "";
        }
        const tokenRes = await Axios.post(
            "http://localhost:5000/user/tokenIsValid", null , {headers: {"x-auth-token": token}}
        );
        if (tokenRes.data) {
          const userRes = await Axios.get("http://localhost:5000/user/", {
            headers: {"x-auth-token": token}
          });
          setUserData(userData = {
            token: token,
            user: userRes.data
          });
        }
        console.log("eaeiheihifuiahfudhfia", userData)
      };
      checkLoggedIn();
  }, [])


  return (
    <div className="App">
      <Router >
        <UserContext.Provider value={{userData, setUserData}}>
          <Route path="/" exact component={Home} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/applicantprofile" component={A_Profile}/>
          <Route path="/recruiterprofile" component={R_Profile}/>
          <Route path="/newjob" component={NewJob}/>
          <Route path="/applicantdash" component={A_Dash}/>
          <Route path="/recruiterdash" component={R_Dash}/>
          <Route path="/search" component={Search}/>
          <Route path="/myemp" component={Emp}/>
        </UserContext.Provider>
      </Router>
    </div>
//     <div className="App">
//       <Navbar />
//       <Profile />
//     </div>
  );
}

