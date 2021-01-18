import Navbar from './components/Navbar.component'
import SignInSide from './components/SignIn.component.js'
import SignUpSide from './components/SignUpSide.component'

function App() {
  return (
    <div className="App">
      <Navbar sticky="top"  />
      <SignUpSide />
    </div>
  );
}

export default App;
