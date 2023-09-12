import React, { useEffect } from 'react'
import { useState } from 'react';
import { Input } from '@nextui-org/react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { PasswordContext , useContext } from '../useContext/passwordContext';
import { Chip } from '@nextui-org/react';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

const PasswordInput = () => {

  const {password, password2 , setPassword, setPassword2 , isVisible ,setIsVisible, isMatch , setIsMatch , isRegex , setIsRegex} = useContext(PasswordContext);
  

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

  }
  const handlePassword2Change = (e) => {
    setPassword2(e.target.value)
  }

  useEffect(() => {
    console.log('password' , password , password2);
    if(password === password2){
      setIsMatch(true)
    }
    else if( password !== password2){
      setIsMatch(false);
    }

    if(!passwordRegex.test(password)) {
      setIsRegex (false);
    } else{
      setIsRegex (true);
    }


  },[password , password2])



  return (
    <>
      <Input
        label="Şifre"
        
        placeholder="Şifrenizi giriniz"
        endContent={
          <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
            {isVisible ? (
              <VisibilityOffIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <VisibilityIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        className="max-w-xs mx-auto"
        onChange={handlePasswordChange}
        value={password}
      />
      <Input
        label="Şifre doğrulama"
        
        placeholder="Şifrenizi doğrulayınız"
        endContent={
          <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
            {isVisible ? (
              <VisibilityOffIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <VisibilityIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        className="max-w-xs mx-auto"
        onChange={handlePassword2Change}
        value={password2}
      />
      {isMatch === false && <Chip startContent={<PriorityHighIcon/>} color="warning" variant="shadow" className='h-8 w-full mr-3 ml-3 text-white'>Şifreler eşleşmiyor</Chip>}
      {isRegex === false && password !== '' && <Chip startContent={<PriorityHighIcon/>} color="warning" variant="shadow" className='h-12 w-full mr-3 ml-3 text-white transition-all duration-300 ease-in-out'>Şifre en az 6 karakter uzunluğunda olmalı ve  en az 1 harf ve rakam içermelidir.</Chip>}
    </>
    
  );

}

export default PasswordInput