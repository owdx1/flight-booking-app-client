import React, { useEffect, useState } from 'react'
import {Card, CardHeader, CardBody, CardFooter, Image, Button, Chip, Snippet, Input, Checkbox} from "@nextui-org/react";
import { useLocation } from 'react-router-dom';
import { CardContent } from '@mui/material';
import { cities } from '../data/cities';
import { Avatar } from '@nextui-org/react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Background from '../components/Background';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CallIcon from '@mui/icons-material/Call';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import SecurityIcon from '@mui/icons-material/Security';
import CurrencyLiraIcon from '@mui/icons-material/CurrencyLira';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";

const TCIDRegex = /^[1-9]{1}[0-9]{9}[02468]{1}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneNumberRegex = /^(5)[0-9][0-9][\s]([0-9]){3}[\s]([0-9]){2}[\s]([0-9]){2}/



const Payment = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  })


  const location = useLocation();
  const stateData = location.state;
  const [isSelected, setIsSelected] = useState(false);
  const [isSelectedPromise, setIsSelectedPromise] = useState(false);
  const [email, setEmail] = useState('');
  const [tcno, setTcno] = useState('');
  const [phone , setPhone] = useState('');
  const [passangerName, setPassangerName] = useState('');

  const [isEmailCorrect, setIsEmailCorrect] = useState(false);
  const [isPhoneCorrect, setIsPhoneCorrect] = useState(false);
  const [isTCNoCorrect, setIsTCNoCorrect] = useState(false);
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);
  const [card, setCard] = useState('');
  const [monthAndYear, setMonthAndYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [paymentSuccessful , setPaymentSuccessful] = useState(false);

  
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  useEffect(() => {
    console.log(paymentSuccessful);
  }, [paymentSuccessful])


  const handleCardDisplay = () => {
    const rawText = [...card.split(' ').join('')] 
    const creditCard = [] 
    rawText.forEach((t, i) => {
        if (i % 4 === 0 && i !== 0) creditCard.push(' ')
        creditCard.push(t)
    })
    return creditCard.join('') 
  }
   const handleMYDisplay = () => {
    const rawText = [...monthAndYear];
    const monthAndYearArray = [];

    rawText.forEach((t,i) => {
      if (i === 2 ) monthAndYearArray.push('/');
      monthAndYearArray.push(t);
    })
    return monthAndYearArray.join('');
   }

   const handlePayment = async () => {
    try {
      setIsLoadingPayment(true);
      
      const response = await fetch('http://localhost:5000/payment/receive-payment' , {
        headers:{
          'Content-Type':'application/json'
        },
        method:'POST',
        body: JSON.stringify({stateData, email, tcno , phone , passangerName , isSelected , card , monthAndYear , cvc})
      })

      const responseData = await response.json();
      setIsLoadingPayment(false);
      const {message} = responseData;
      if(response.status === 200) {
        console.log(message);
        setPaymentSuccessful(true);
      } if (response.status === 500){
        console.log('server error');
      }

    } catch (error) {
      console.error(error);
    }


   }






  console.log(stateData);




 useEffect(() => {
    if(!emailRegex.test(email)){
      setIsEmailCorrect(false);

    } else{
      setIsEmailCorrect(true);
    }

   }, [email])
   useEffect(() => {
    if(!phoneNumberRegex.test(phone)){
      setIsPhoneCorrect(false);

    } else{
      setIsPhoneCorrect(true);
    }

   }, [phone])

   useEffect(() => {
    if(!TCIDRegex.test(tcno)){
      setIsTCNoCorrect(false);

    } else{
      setIsTCNoCorrect(true);
    }

   }, [tcno])






  return (
    <div className='bg-stone-50 h-[1500px]'>
      <Modal isOpen={paymentSuccessful} onOpenChange={onOpenChange} size='lg'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p>basari</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={() => setPaymentSuccessful(false)}>
                  Kapat
                </Button>
                
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      

      <div className=' w-[calc(screen - 4rem)] h-screen grid grid-cols-3 '>
        <div className='w-full h-full flex'>
          <Card isFooterBlurred className="w-[28rem] h-[450px] col-span-12 sm:col-span-7 m-10 shadow-2xl mx-auto">
            <CardHeader className="absolute z-10 top-1 flex-col items-start flex shadow-md">
              <div className='flex justify-between w-full'>
                <div className='flex gap-3'>
                  <Avatar  src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
                  <h4 className=" font-medium text-xl my-auto mr-4">{stateData.firmName}</h4>
                </div>
              </div>
              
            </CardHeader>

            <CardContent className='my-auto h-80 flex flex-col'>
              <div className='flex w-full gap-3 shadow-md'>
                <div>
                  <p className='font-semibold'>Kalkış</p>
                  <Chip variant='dot' className='border-none' color='warning'>{Object.keys(cities)[stateData.sid - 1]}</Chip>
                </div>
                <div>
                  <p className='font-semibold'>Bitiş</p>
                  <Chip variant='dot' color='warning' className='border-none'>
                    {Object.keys(cities)[stateData.eid - 1]}
                  </Chip>
                </div>
              </div>
              <div className='flex w-full mt-10 justify-between shadow-md'>
                <div>
                  <p className='font-semibold'>Hareket zamanı</p>
                  <Chip size='lg' variant='light' style={{fontSize:'24px'}}>{stateData.flightTime}</Chip>
                </div>
                <div className='flex flex-col mt-2'>
                  <p className='mx-auto font-semibold'>Koltuk</p>
                  <Chip variant='dot' className='border-none mr-4 my-auto' size='lg'>{stateData.seatNo}</Chip>
                </div>
              </div>
              <div className='mt-5'>
                <Chip endContent={<ErrorOutlineIcon/>} variant='light' size='lg'>Biletiniz açığa alınamaz, değiştirilemez veya iptal edilemez.</Chip>
              </div>
            </CardContent>
            
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
              <div className="flex flex-grow gap-2 items-center">
                
                <div className="flex flex-col">
                  <p className="text-tiny text-white/60">biletinyo</p>
                  <p className="text-tiny text-white/60">motto-curtto</p>
                </div>
              </div>
            

              <Button radius="full" size="sm">Mobil uygulamamızı kullanın</Button>
            </CardFooter>
          </Card>

        </div>
        
        <div className='w-full h-full flex flex-col'>
          <div className='contact-info w-96 mx-auto mt-10 flex flex-col gap-7'>
            <Chip variant='light' className='mx-auto mb-8 font-light' style={{fontSize:'32px'}}>kişisel bilgiler</Chip>
            <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email giriniz..."
            labelPlacement="outside"
            size='lg'
            startContent={
              <AlternateEmailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            />
            <Input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="507 548 47 03"
            labelPlacement="outside"
            size='lg'
            startContent={
              <CallIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            />


            <Checkbox color='warning' onValueChange={setIsSelected} icon={<DoneAllIcon className='text-gray-300'/>} isSelected={isSelected}>Biletimi ÜCRETSİZ SMS ile alıp, kampanya ve duyuruları ticari elektronik ileti olarak almayı ve kişisel verilerimin pazarlama amacıyla işlenmesini onaylıyorum.</Checkbox>
          
          </div>
          <div className='user-info w-96 mx-auto mt-10 flex flex-col gap-7'>
          <Input
          value={passangerName}
            type="text"
            label='Yolcu ismi'
            onChange={(e) => setPassangerName(e.target.value)}
            placeholder="yolcu ismi giriniz..."
            labelPlacement="outside"
            size='lg'
            startContent={
              <PersonSearchIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            />
            <Input
            type="text"
            value={tcno}
            onChange={(e) => setTcno(e.target.value)}
            label='T.C Kimlik NO'
            placeholder="Karayolu Taşıma Yönetmeliğince gereklidir"
            labelPlacement="outside"
            size='lg'
            startContent={
              <FingerprintIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            />
            <div className='flex flex-col gap-3'>
              {isEmailCorrect === false && email !== ''? <Chip variant='shadow' className='text-gray-200' color='warning' endContent={<ErrorOutlineIcon/>}>Lütfen geçerli bir email giriniz</Chip> : ''}
              {isPhoneCorrect === false && phone !== ''? <Chip variant='shadow' className='text-gray-200' color='warning' endContent={<ErrorOutlineIcon/>}>Lütfen formatta bir telefon numarası giriniz</Chip> : ''}
              {isTCNoCorrect === false && tcno !== ''? <Chip variant='shadow' className='text-gray-200' color='warning' endContent={<ErrorOutlineIcon/>}>Lütfen geçerli bir T.C. NO giriniz</Chip> : ''}
            </div>
          </div>
        </div>
        <div className='w-full h-full flex flex-col mt-10'>
          <Chip variant='light' className='mx-auto font-light' style={{fontSize:'32px'}}>kart bilgileri</Chip>
          <div className='cart-info w-96 mx-auto mt-10 flex flex-col gap-7'>
            <Input
              type="text"
              value={handleCardDisplay()}
              onChange={(e) => setCard(e.target.value)}
              label='Kart Numarası'
              placeholder="**** **** **** ****"
              labelPlacement="outside"
              size='lg'
              startContent={
                <CreditCardIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
            />
            <div className='flex w-full justify-evenly gap-3'>
              <Input
                type="text"
                value={handleMYDisplay()}
                onChange={(e) => setMonthAndYear(e.target.value)}
                placeholder="AA / YY"
                labelPlacement="outside"
                size='lg'
                startContent={
                  <CreditCardIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
              />
              <Input
                type="text"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                placeholder="***"
                labelPlacement="outside"
                size='lg'
                startContent={
                  <AccountBalanceWalletIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
              />
            </div>
            <div className='mt-2'>
              <Checkbox color='warning' onValueChange={setIsSelectedPromise} icon={<DoneAllIcon className='text-gray-300'/>} isSelected={isSelectedPromise}>Ön Bilgilendirme Formu'nu , Mesafeli Satış Sözleşmesi'ni okudum ve onaylıyorum. Kişisel verilerin işlenmesine ilişkin Aydınlatma Metni’ni okudum. Kullanım Koşulları’nı kabul ediyorum.</Checkbox>
            </div>

            <div className='flex w-full mt-32 gap-6'>
              <SecurityIcon style={{fontSize:'60px'}} className='my-auto'/>
              
              <Button endContent={<KeyboardTabIcon/>} className={`flex w-full h-24 bg-slate-100 ${isEmailCorrect === false || isPhoneCorrect === false || passangerName === '' || email === '' || phone === '' || setIsSelectedPromise === false || email === '' || card === '' || cvc === '' || monthAndYear === '' || paymentSuccessful === true || isSelectedPromise === false ? `disabled-button` : `healthy-button-third`}`} variant='light'
              disabled = {tcno === '' || passangerName === '' || email === '' || phone === '' || setIsSelectedPromise === false || email === '' || card === '' || cvc === '' || monthAndYear === '' || isSelectedPromise === false}
              isLoading={isLoadingPayment}
              onClick={() => handlePayment()}
              >
              
                <Chip variant='light' style={{fontSize:'32px'}} className='border-none text-gray-400' endContent={<CurrencyLiraIcon/>}>{stateData.bookingPrice}</Chip>
                <p className='mx-auto'>Güvenli ödemeye geç</p>
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment