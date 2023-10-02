import React from 'react'
import { NavLink } from 'react-router-dom'
import { MainContext, useContext } from '../useContext/context'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem , Button } from '@nextui-org/react'
import SettingsIcon from '@mui/icons-material/Settings';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '../images/biletinyo-logo.jpg'
import logoBakgroundless from '../images/biletinyo-logo-removebg-preview.png'
import {SERVER_URL} from '../config'
const Header = () => {
  const navigate = useNavigate();

  const {isLoggedIn, setIsLoggedIn, handleLogout} = useContext(MainContext);

  console.log('suanki log durumu' ,isLoggedIn);

  const handleHeaderLogout = () =>{
    handleLogout();
    navigate('/firm-auth')
  }
  const [firm, setFirm] = useState({});


  useEffect(() => {
    try {
      const firmToken = localStorage.getItem('firmToken');

      const fetchProfile = async () => {

        try {
          const response = await fetch(`${SERVER_URL}/firm/dashboard`, {
          headers:{
            Authorization: `Bearer ${firmToken}`
          }
        });

        if(response.status === 401 || response.status === 400){
          handleLogout();
          navigate('/firm-auth')
        }
        if (!response.ok) {
          throw new Error("Error fetching profile");
        }
        const data = await response.json();
        console.log('gelen data',data);
        const { firm } = data;
        const newFirmToken = data.firmToken;
        setFirm(firm);
        console.log('current firm' , firm);
        localStorage.setItem('firmToken' , newFirmToken);
  

          
        } catch (error) {
          console.error(error);
        }
        
      } 

      if(firmToken !== null ){fetchProfile();}
      
    } catch (error) {
      console.error(error);
    }
  
},[isLoggedIn])


  return (
    <div className='w-full h-24 flex justify-between bg-gradient-to-tr bg-gray-500 text-white rounded-b-xl'>
      <NavLink to='/' className='mt-2 ml-10 p-0'>
        <img src={logoBakgroundless} className='h-20 my-auto'></img>
      </NavLink>
      
      <div className=''>
        {isLoggedIn === false ? (
          <div className='w-64 h-16 text-white flex shadow-xl my-4 mr-10 justify-center'>
            <NavLink to='/firm-auth' className='bg-slate-700 text-white w-full flex rounded-xl hover:bg-slate-500'>
              <p className='mx-auto my-auto font-light font-mono' style={{letterSpacing:'0.1rem'}}>Şirket Girişi</p>
            </NavLink>
          </div>
        )
        :
        (
        <Dropdown>
          <DropdownTrigger>

            <Button 
              className='w-64 h-16 text-white flex shadow-xl my-4 mr-10 bg-gray-700'
              variant='light'
            >
              <img
              src='https://i.pravatar.cc/150?u=a042581f4e29026024d'
              className='w-16 h-16 rounded-full object-cover'
              />
              {firm.name}
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant="flat" aria-label="Dropdown menu with shortcut">
            <DropdownItem key="firmName" endContent={<CoPresentIcon/>}  onClick={() => navigate('/firm-dashboard')}>Anasayfa</DropdownItem>
            <DropdownItem key="firmName" endContent={<SettingsIcon/>} >Ayarlar</DropdownItem>
            <DropdownItem key="firmName" endContent={<LogoutIcon/>} className='text-danger' color='danger' onClick={handleHeaderLogout}>Çıkış Yap</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        
        )
      
        }
      </div>
    </div>
  )
}

export default Header