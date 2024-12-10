import About from '../component/About';
import Home from '../component/Home'
import Navbar from '../component/Navbar'
import './App.css'
import {
  BrowserRouter ,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from 'react';
import Loader from '../component/Loder';
import Singup from '../component/Singup';
import Login from '../component/Login';
import Alert from '../component/Alert';
import Modal from '../component/Modal';
import Allfavsong from '../component/Allfavsong';
function App() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setmodal] = useState(null)
  const [alert, setalert] = useState(null)

  const showmodal = (name, email) => {
    setmodal({
      name: name,
      email: email,
    })
  }
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
      <BrowserRouter future={{ v7_relativeSplatPath: true }}>
        <Loader isLoading={isLoading} progress={progress} />
        <Alert alert={alert}/>
        <Modal modal={modal}/>
        <Navbar startLoader={startLoader}  showAlert={showAlert} showmodal={showmodal} />
        
        <Routes>
          <Route path='/' element={<Home showAlert={showAlert} showmodal={showmodal}/>} />
          <Route path='/about' element={<About />} />
          <Route path='/singup' element={<Singup showAlert={showAlert} startLoader={startLoader}/>}/>
          <Route path='/login' element={<Login showAlert={showAlert} startLoader={startLoader}/>}/>
          <Route path='/allfavsong' element={<Allfavsong showAlert={showAlert} startLoader={startLoader}/>}/>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
