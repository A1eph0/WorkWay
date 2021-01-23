import Dash from '../applicant/Dash.component'
import Navbar from '../applicant/Navbar.component'
import { useContext, useEffect } from 'react';
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom"

export default function ProfilePage() {
  return (
    <div className="ApplicantProfile">
        <Navbar />
        <Dash />
    </div>
  );
}