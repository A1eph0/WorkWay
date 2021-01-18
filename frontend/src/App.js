import Navbar from './components/Navbar.component'
import SignInSide from './components/SignIn.component.js'
import SignUpSide from './components/SignUpSide.component'
import Home from './components/Home.component'

function App() {
  return (
    <div className="App">
      <Navbar sticky="top"  />
      <SignUpSide />
    </div>
  );
}

export default App;
