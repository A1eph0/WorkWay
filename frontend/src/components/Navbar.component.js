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
// import { 
//     Nav,
//     Navbar,
//     Form,
//     FormControl,
//     Button,
//     Container
// } from 'react-bootstrap'

// const Navbaru = () => {
//     return ( 
//         <div>
//             <Container>
//                 <Navbar bg="dark" variant="dark">
//                     <Navbar.Brand href="/">Job Portal</Navbar.Brand>
//                     <Nav className="mr-auto">
//                     <Nav.Link href="#home">Home</Nav.Link>
//                     <Nav.Link href="#features">Features</Nav.Link>
//                     <Nav.Link href="#pricing">Pricing</Nav.Link>
//                     </Nav>
//                     <Form inline>
//                     <FormControl type="text" placeholder="Search" className="mr-sm-2" />
//                     <Button variant="outline-info">Search</Button>
//                     </Form>
//                 </Navbar>
//             </Container>
//         </div>
//      );
// }
 
// export default Navbaru;