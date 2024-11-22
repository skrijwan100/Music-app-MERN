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
import Singup from '../component/Singup';
import Login from '../component/Login';
import Alert from '../component/Alert';
function App() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setalert] = useState(null)
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
  const showAlert = (msg, ty) => {
    setalert({
      msg: msg,
      ty: ty
    })
  }
  return (
    <>
      <Router>
        <Loader isLoading={isLoading} progress={progress} />
        <Alert alert={alert}/>
        <Navbar startLoader={startLoader} />
        
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/singup' element={<Singup showAlert={showAlert}/>}/>
          <Route path='/login' element={<Login showAlert={showAlert}/>}/>

        </Routes>
      </Router>
    </>
  )
}

export default App
