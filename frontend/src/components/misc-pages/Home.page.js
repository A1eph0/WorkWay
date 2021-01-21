import Home from '../misc/Home.component'
import Navbar from '../misc/Navbar.component'
import { useContext, useEffect } from 'react';
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom"

export default function HomePage() {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (userData.user?.utype==="Applicant")
      history.push("/applicantprofile")
    else if (userData.user?.utype === "Recruiter")
      history.push("/recruiterprofile")
  })
  
  return (
    <div className="HomePage">
        <Navbar />
        <Home />
    </div>
  );
}

