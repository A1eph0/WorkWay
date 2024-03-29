import Profile from '../recruiter/Profile.component'
import Navbar from '../recruiter/Navbar.component'
import { useContext, useEffect } from 'react';
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom"

export default function ProfilePage() {
  const { userData } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    if (userData.user?.utype!=="Recruiter")
      history.push("/")
  })
  return (
    <div className="RecruiterProfile">
        <Navbar />
        <Profile />
    </div>
  );
}