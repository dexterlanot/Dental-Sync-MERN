import { Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import './index.css';
import './App.css'

function App() {
  const isUserSignedIn = !!localStorage.getItem('token')
  const location = useLocation();

  return (
    <div className="App">
      <Navbar />
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          {isUserSignedIn && <Route path='/dashboard' element={<Dashboard />} />}
        </Routes>
      </CSSTransition>
    </TransitionGroup>
    </div >
  );
}


export default App;
