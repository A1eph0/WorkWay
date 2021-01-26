import MyProf from '../applicant/MyProf.component'
import Navbar from '../applicant/Navbar.component'
import { useContext, useEffect } from 'react';
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom"

export default function MyPro() {
  return (
    <div className="ApplicantProfile">
        <Navbar />
        <MyProf/>
    </div>
  );
}