import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/misc-pages/Home.page'
import SignIn from './components/misc-pages/SignIn.page'
import SignUp from './components/misc-pages/SignUp.page'
import Navbar from './components/misc/Navbar.component'
import Profile from './components/applicant/Profile.component'

export default function App() {
  return (
    <div className="App">
      <Router >
        <Route path="/" exact component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </Router>
    </div>
//     <div className="App">
//       <Navbar />
//       <Profile />
//     </div>
  );
}

