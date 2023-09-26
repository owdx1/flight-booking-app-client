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
import Modaltry from './pages/Modaltry';
import Footer from './components/firmComponents/Footer';
import SearchedFlights from './pages/SearchedFlights';
import Payment from './pages/Payment';
import ScrollButton from './utils/ScrollButton';




function App() {
  const navigate = useNavigate();
  const [activeFlightType, setActiveFlightType] = useState('');
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
      localStorage.removeItem('firmToken');
    } else {
      setIsLoggedIn(true);   
    }
  }, [])
  
  const data = {
    isLoggedIn,
    handleLogout,
    toast,
    handleSetLoggedInToTrue,
    activeFlightType,
    setActiveFlightType
    
  }
  return (
    <MainContext.Provider value={data}>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/firm-auth' element={<FirmAuth/>}/>
        <Route path='/firm-dashboard' element={<FirmDashboard/>} />
        <Route path='/modaltry' element={<Modaltry/>}/>
        <Route path='/searched-flights' element={<SearchedFlights/>}></Route>
        <Route path='/payment' element={<Payment/>}></Route>
      </Routes>

      {/*<Footer/>*/}
      <ToastContainer/>
      <ScrollButton/>
    </MainContext.Provider>
  
  );
}

export default App;
