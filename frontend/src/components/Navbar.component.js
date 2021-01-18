const Navbar = () => {
    return (  
        <nav className="navbar">
            <h1>Work-Way</h1>
            <div className="links">
                <a href="/">Home</a>
                <a href="/signup" style={{
                    color: "white",
                    backgroundColor: '#f1356d',
                    borderRadius: '8px'
                }}>Sign-Up</a>
                <a href="/signin" style={{
                    borderWidth: "thin",
                    borderStyle: "solid",
                    borderColor: '#f1356d',
                    borderRadius: '8px'
                }}>Sign-In</a>
            </div>
        </nav>
    );
}
 
export default Navbar;