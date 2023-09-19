import React, { useEffect, useState } from 'react'
import { MainContext, useContext } from '../useContext/context';
import { useNavigate } from 'react-router-dom';
import { Accordion, AccordionItem, Button, Card } from '@nextui-org/react';
import { Input } from '@nextui-org/react';
import PasswordInput from '../utils/PasswordInput';
import { PasswordContext } from '../useContext/passwordContext';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import { Chip } from '@nextui-org/react';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import ClearIcon from '@mui/icons-material/Clear';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import LockPersonIcon from '@mui/icons-material/LockPerson';





const FirmAuth = () => {

  const {toast , isLoggedIn , handleLogout, handleSetLoggedInToTrue} = useContext(MainContext);
  const navigate = useNavigate();
  useEffect(() =>{
    if(isLoggedIn === true){
      handleLogout();
    }
  })

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneNumberRegex = /^(5)[0-9][0-9][\s]([0-9]){3}[\s]([0-9]){2}[\s]([0-9]){2}/


  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [phone , setPhone] = useState('');
  const [name , setName] = useState('');
  const [password2 , setPassword2] = useState('');
  const [registeredSuccessfully , setRegisteredSuccessfully] = useState(false);
  const [isEmailRegex , setIsEmailRegex] = useState(false);
  const [isPhoneRegex , setIsPhoneRegex] = useState(false);
  //used in passwordinput
  const [isVisible, setIsVisible] = useState(false);
  const [isMatch, setIsMatch] = useState(false);
  const [isRegex ,setIsRegex] = useState(false);
  const [isLoading , setIsLoading] = useState(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isEmailLoginRegex, setIsEmailLoginRegex] = useState(false);

  //burası login kısmı için
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin , setPasswordLogin] = useState('');

  const passwordData = {
    password,
    password2,
    setPassword,
    setPassword2,
    isVisible,
    setIsVisible,
    isMatch,
    setIsMatch,
    isRegex,
    setIsRegex
  }

  // eğer çoktan giriş yapılı bir kullanıcı varsa, onu log out etmemiz gerekiyor.
  // bunun için de contextin içinden gelen giriş yapılı mı, değil mi bilgisini kullanmamız gerekli.
  useEffect(() =>{
    if(isLoggedIn) {
      handleLogout();
    }

  }, [])

  const handleEmailLoginChange = (e) =>{
    setEmailLogin(e.target.value);
    console.log(e.target.value);
  }
  const handleClearEmailLogin = () =>{
    setEmailLogin('');
  }
  const handlePasswordLoginChange =(e)=>{
    setPasswordLogin(e.target.value);
  }
  const handleEmailChange = (e) =>{
    setEmail(e.target.value);
    console.log(e.target.value);
  }
  const handleClearEmail = () => {
    setEmail('');
  }
  const handleClearName = () => {
    setName('');
  }
  const handleNameChange = (e) =>{
    setName(e.target.value);
    console.log(e.target.value);
  }
  const handlePhoneChange = (e) =>{
    setPhone(e.target.value);
    console.log(e.target.value);
  }
  const handleClearPhone = () =>{
    setPhone('');
  }




  const handleRegister = async () => {
    setIsLoading(true);
    const response = await fetch('http://localhost:5000/firm/register' , {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({email, password, phoneNumber:phone, name})
    })

    const responseData = await response.json();
    setIsLoading(false);
    const {message} = responseData;

    if(response.status === 200) {
      toast.success(message);
      setRegisteredSuccessfully(true);
    } else{
      toast.warn(message);
    }
  }
  const handleLogin = async () => {
    setIsLoadingLogin(true);
    const response = await fetch('http://localhost:5000/firm/login' , {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({email:emailLogin, password:passwordLogin})
    })

    const responseData = await response.json();
    setIsLoadingLogin(false);
    const {message} = responseData;

    if(response.status === 200) {
      toast.success(message);
      const {firmToken} = responseData;
      localStorage.setItem('firmToken' , firmToken);
      handleSetLoggedInToTrue();
      navigate('/firm-dashboard');
      
    } else{
      toast.warn(message);
    }
  }

   // email regex test
   useEffect(() => {
    if(!emailRegex.test(email)){
      setIsEmailRegex(false);

    } else{
      setIsEmailRegex(true);
    }

   }, [email])
   useEffect(() => {
    if(!emailRegex.test(emailLogin)){
      setIsEmailLoginRegex(false);

    } else{
      setIsEmailLoginRegex(true);
    }

   }, [emailLogin])

   useEffect(() => {
    if(!phoneNumberRegex.test(phone)) {
      setIsPhoneRegex(false)
    } else {
      setIsPhoneRegex(true);
    }
   })


  return (
    <div className='w-[1500px] h-[640px] flex'>
      <div className='w-full h-full grid grid-flow-row grid-cols-2 mx-auto'>
        <Accordion variant='shadow' className='w-[30rem] h-[38rem] mr-2 ml-2 mt-2 mb-2 bg-slate-200 mx-auto my-auto' isCompact>
          <AccordionItem className='' key={1} aria-label='Kayıt Ol' title={
            <p className='my-auto'>Kayıt Ol</p>
          } startContent={<LockOpenIcon/>}>
            <Card className='w-[28rem] h-[32rem] bg-slate-200 mx-auto my-auto gap-3'>
              <h1 className='mx-auto text-gray-900 h-8 my-auto'>Firma Kayıt</h1>
              <Input
                isRequired
                type="text"
                label="Firma ismi"
                placeholder="Can tourismo"
                className="max-w-xs mx-auto"
                value={name}
                onChange={handleNameChange}
                isClearable
                endContent={<ClearIcon className='cursor-pointer' onClick={handleClearName}/>}
              />
              <Input
                isRequired
                type="email"
                label="Email"
                placeholder="turizm@gmail.com"
                className="max-w-xs mx-auto"
                isClearable
                value={email}
                onChange={handleEmailChange}
                endContent={<ClearIcon className='cursor-pointer' onClick={handleClearEmail}/>}
              />
              <Input
                isRequired
                type="text"
                label="Telefon numarası"
                placeholder="507 548 47 03"
                className="max-w-xs mx-auto"
                value={phone}
                onChange={handlePhoneChange}
                isClearable
                endContent={<ClearIcon className='cursor-pointer' onClick={handleClearPhone}/>}
              />
              <PasswordContext.Provider value={passwordData}>
                <PasswordInput/>
              </PasswordContext.Provider>

              {isEmailRegex === false && email !== '' && <Chip startContent={<PriorityHighIcon/>} color="warning" variant="shadow" className='h-8 w-full mr-3 ml-3 text-white transition-all duration-300 ease-in-out'>Geçerli e-posta giriniz</Chip>}
              {isPhoneRegex === false && phone !== '' && <Chip startContent={<PriorityHighIcon/>} color="warning" variant="shadow" className='h-8 w-full mr-3 ml-3 text-white transition-all duration-300 ease-in-out'>Geçerli e-posta giriniz</Chip>}


              <Button
                color='danger'
                isLoading={isLoading}
                endContent={<CarRepairIcon/>}
                disabled = {name === '' || email === '' || isRegex === false || isMatch === false}
                className={` bottom-0 my-auto mx-auto transition-all duration-250 ease-in-out 
                ${isMatch === false || isRegex === false ? `disabled-button` : `healthy-button`}
                              
                `}
                onClick={() => handleRegister()}
                
              >
                  {registeredSuccessfully === false ? `Firma Kaydını Gerçekleştir` : `Kayıt Başarılı`}
                
              </Button>


            </Card>
          </AccordionItem>
          <AccordionItem key={2} aria-label='Giriş Yap' title='Giriş yap' className='' startContent={<LockPersonIcon/>}> 
          <Card className='w-[28rem] h-[32rem] bg-slate-200 mx-auto my-auto gap-3'>
              <h1 className='mx-auto text-gray-900 h-8 my-auto'>Firma Giriş</h1>
              <Input
                isRequired
                type="email"
                label="Email"
                placeholder="turizm@gmail.com"
                className="max-w-xs mx-auto"
                isClearable
                value={emailLogin}
                onChange={handleEmailLoginChange}
                endContent={<ClearIcon className='cursor-pointer' onClick={handleClearEmailLogin}/>}
              />
              
              <Input
                label="Şifre"
                placeholder="Şifrenizi giriniz"
                type="password"
                className="max-w-xs mx-auto"
                onChange={handlePasswordLoginChange}
                value={passwordLogin}
              />
              {isEmailLoginRegex === false && emailLogin !== '' && <Chip startContent={<PriorityHighIcon/>} color="warning" variant="shadow" className='h-8 w-full mr-3 ml-3 text-white transition-all duration-300 ease-in-out'>Geçerli e-posta giriniz</Chip>}

            

              <Button
                color='danger'
                isLoading={isLoadingLogin}
                endContent={<CarRepairIcon/>}
                disabled = {emailLogin === '' || passwordLogin === ''}
                className={` bottom-0 my-auto mx-auto 
                ${isEmailLoginRegex === false || passwordLogin === '' ? `disabled-button` : `healthy-button`}
                              
                `}
                
                onClick={() => handleLogin()}
                
              >
                  Giriş Yap
                
              </Button>
              


            </Card>
          </AccordionItem>
          
          
        </Accordion>
        <img
          src={`https://www.thetrainline.com/cms/media/4625/southeastern-javelin-train-st-pancras-intl-retina_2x.jpg`}
          alt='hi'
          className='mx-auto object-cover rounded-3xl h-[600px] my-auto'
        />


      </div>
    </div>
  )
}

export default FirmAuth