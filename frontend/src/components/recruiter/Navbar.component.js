const Navbar = () => {
    return (  
        <nav className="navbar">
            <h1>Work-Way</h1>
            <div className="links">
                <a href="/dash/:id">Dashboard</a>
                <a href="/newjob">Create Job</a>
                <a href="/profile/:id" style={{
                    borderWidth: "thin",
                    borderStyle: "solid",
                    borderColor: '#f1356d',
                    borderRadius: '8px'
                }}>Edit Profile</a>
                <a href="/signout" style={{
                    color: "white",
                    backgroundColor: '#f1356d',
                    borderRadius: '8px'
                }}>Sign-Out</a>
            </div>
        </nav>
    );
}
 
export default Navbar;