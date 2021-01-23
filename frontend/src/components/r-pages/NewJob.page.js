import Profile from '../recruiter/NewJob.component'
import Navbar from '../recruiter/Navbar.component'
import { useContext, useEffect } from 'react';
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom"

export default function ProfilePage() {
  return (
    <div className="RecruiterProfile">
        <Navbar />
        <Profile />
    </div>
  );
}