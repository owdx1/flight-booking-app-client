import React from 'react'
import { NavLink } from 'react-router-dom'
import { MainContext, useContext } from '../useContext/context'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem , Button } from '@nextui-org/react'
import SettingsIcon from '@mui/icons-material/Settings';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import LogoutIcon from '@mui/icons-material/Logout';
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
          const response = await fetch(`http://localhost:5000/firm/dashboard`, {
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
    <div className='w-full h-24 flex justify-evenly bg-slate-300'>
      <div className='mx-auto my-auto'>logo</div>
      <div className='mx-auto my-auto'>
      {isLoggedIn === false ? (<NavLink to='/firm-auth'>sirket girisi</NavLink>)
      :
      (
        <Dropdown>
          <DropdownTrigger>

            <Button 
              className='w-64 h-20 text-gray-500 my-3'
              variant='bordered'
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