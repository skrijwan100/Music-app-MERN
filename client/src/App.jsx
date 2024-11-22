import About from '../component/About';
import Home from '../component/Home'
import Navbar from '../component/Navbar'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from 'react';
import Loader from '../component/Loder';
function App() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const startLoader = () => {
    setProgress(0);
    setIsLoading(true);
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 50);
  };
  return (
    <>
      <Router>
        <Loader isLoading={isLoading} progress={progress} />
        <Navbar startLoader={startLoader} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
