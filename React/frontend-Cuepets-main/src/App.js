import './App.css';
import Cat from './components/Cat';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Home from './components/Home';
import H2 from './components/H2';
import H3 from './components/H3';
import Review from './components/Review';
import Foot from './components/Foot';
import Sign from './components/Sign';
// import H4 from './components/H4';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cat" element={<Cat />} />
        <Route path="/sign" element={<Sign />} />
      </Routes>
     
    </Router>
    

    <H2 />
    <H3 />
    <Review />
    <Foot />
    {/* <H4/> */}
    </div>
    )
}

export default App;
