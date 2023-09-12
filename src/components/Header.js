import React from 'react'
import { NavLink } from 'react-router-dom'
import { MainContext, useContext } from '../useContext/context'
import { Button } from '@nextui-org/button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

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
        <div>
          <p>{firm.name}</p>
          <Button onClick={() => handleHeaderLogout()}>cıkıs yap</Button>
        </div>
        
      )
      
      }
      </div>
    </div>
  )
}

export default Header