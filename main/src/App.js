import { Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About'
import Contact from './pages/Contact';
import Footer from './pages/Footer';
import Navbar from './components/NavBar';
import './index.css';
import './App.css'

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <div id='home'>
          <Home />
        </div>
        <div id='services'>
          <Services />
        </div>
        <div id='about'>
          <About />
        </div>
        <div id='contact'>
          <Contact />
        </div>
        <div>
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default App;
