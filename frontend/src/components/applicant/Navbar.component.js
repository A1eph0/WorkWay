import {useContext} from "react";
import { useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext';



const Navbar = () => {
    const { setUserData }= useContext(UserContext);
    const history = useHistory();

    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        })
        localStorage.setItem("auth-token", "");
        history.push("/")
    }
    
    return (  
        <nav className="navbar">
            <h1>Work-Way</h1>
            <div className="links">
                <a href="/applicantdash">Dashboard</a>
                <a href="/search">Search Jobs</a>
                <a href="/applicantprofile" style={{
                    borderWidth: "thin",
                    borderStyle: "solid",
                    borderColor: '#f1356d',
                    borderRadius: '8px'
                }}>Edit Profile</a>
                <a onClick={logout} style={{
                    color: "white",
                    backgroundColor: '#f1356d',
                    borderRadius: '8px'
                }}>Sign-Out</a>
            </div>
        </nav>
    );
}
 
export default Navbar;