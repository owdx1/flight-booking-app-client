import './App.css';
import { Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import FirmAuth from './pages/FirmAuth';
import { MainContext } from './useContext/context';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import FirmDashboard from './pages/FirmDashboard';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer , toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';




function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('firmToken');
  };
  const handleSetLoggedInToTrue = () => {
    setIsLoggedIn(true);
  }
  useEffect(() => {
    const firmToken = localStorage.getItem('firmToken');

    if(firmToken === null || firmToken === undefined || firmToken === ''){
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);   
    }
  }, [])
  
  const data = {
    isLoggedIn,
    handleLogout,
    toast,
    handleSetLoggedInToTrue
  }
  return (
    <MainContext.Provider value={data}>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/firm-auth' element={<FirmAuth/>}/>
        <Route path='/firm-dashboard' element={<FirmDashboard/>} />
      </Routes>

      <ToastContainer/>
    </MainContext.Provider>
  
  );
}

export default App;
