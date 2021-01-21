import Profile from '../applicant/Profile.component'
import Navbar from '../applicant/Navbar.component'
import { useContext, useEffect } from 'react';
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom"

export default function ProfilePage() {
  const { userData } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    if (userData.user?.utype!=="Applicant")
      history.push("/")
  })
  return (
    <div className="ApplicantProfile">
        <Navbar />
        <Profile />
    </div>
  );
}