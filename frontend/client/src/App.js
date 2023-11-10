import './App.css';
import {Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/' element={<Login/>} />
        <Route path='/' element={<Signup/>} />
        <Route path='/' element={<Dashboard/>} />
      </Routes>
    </div>
  );
}

export default App;
