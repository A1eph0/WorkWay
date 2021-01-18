import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/page/Home.page'
import SignIn from './components/page/SignIn.page'
import SignUp from './components/page/SignUp.page'

export default function App() {
  return (
    <div className="App">
      <Router >
        <Route path="/" exact component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </Router>
        
    </div>
  );
}

