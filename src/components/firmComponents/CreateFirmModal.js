import React, { useEffect, useState } from 'react'
import { CreateFirmContext , useContext } from '../../useContext/createFirmContext'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea} from "@nextui-org/react";
import {cities} from '../../data/cities'
import { Chip } from '@nextui-org/react';
import { DatePicker, StaticDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { months } from '../../data/months';
import { days } from '../../data/days';
import { drivers } from '../../data/drivers';
import { Select, SelectItem } from '@nextui-org/react';
import { Avatar } from '@nextui-org/react';
import AddIcon from '@mui/icons-material/Add';
import TrainIcon from '@mui/icons-material/Train';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import DirectionsBusFilledIcon from '@mui/icons-material/DirectionsBusFilled';
import 'dayjs/locale/tr';

import {SERVER_URL} from '../../config'




const CreateFirmModal = () => {
  
  dayjs.locale("tr");

  {/****
<Textarea 
                placeholder='Çok iyi yolculujk olcak'
                label='Sefer açıklaması'
                value={flightInformation}
                maxRows={24}
                onChange={(e) => setFlightInformation(e.target.value)}
                className='w-[16rem] h-[20rem]'
                /> 
*/}


  const {isOpen , onOpen , onClose , toast} = useContext(CreateFirmContext);
  const [direction, setDirection] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedCaptainId , setSelectedCaptainId] = useState('');
  const [selectedHandmanId, setSelectedHandmanId] = useState('');
  const [displayedTotalHours, setDisplayedTotalHours] = useState('');
  const [doublePathArray , setDoublePathArray] = useState([]);
  const [flightTime, setFlightTime] = useState('');
  const [isFlightReadyToCreate, setIsFlightReadyToCreate] = useState(false);
  const [flightInformation, setFlightInformation] = useState('');
  const [isLoadingCreateFlight , setIsLoadingCreateFlight] = useState(false);
  const [flightType , setFlightType] = useState('');
  const [flightDateDateObj , setFlightDateDateObj] = useState(new Date());
  const [flightDate , setFlightDate] = useState({
    mounth:'',
    day:'',
    year:-1,
    dayName:'',
    mounthId: -1,

  });
  const handleCaptainIdChange = (e) => {
    setSelectedCaptainId(e.target.value);
  };
  const handleHandmanIdChange = (e) => {
    setSelectedHandmanId(e.target.value);
  };

  const handleAddToDirection = (cityId) => {

    if(!direction.includes(cityId)){
      setDirection([...direction, cityId]);
    } else {
      const withoutSpecificIdArray = direction.filter((idInArray) => idInArray !== cityId )
      setDirection(withoutSpecificIdArray)
    }
  }
  const handleFlightTypeChange = (e) => {
    setFlightType(e.target.value);
  }
  const handleFlightDateChange = (date) => {
    setFlightDateDateObj(date);
    const year = date.$y;
    const monthID = date.$M
    const day = date.$D
    const dayNameId = date.$W;
    setFlightDate({
      month: months[monthID],
      year: year,
      dayName: days[dayNameId],
      day: day,
      monthId:monthID,
      dayNameId:dayNameId

    })
  }
  
  const handleDoublePathChange = (e, type , startingCityId, finishingCityId) => {
    const input = e.target.value
    
    const currentObjArray = doublePathArray.filter((path) => (path.startingCityId === startingCityId && path.finishingCityId === finishingCityId));
    
    if(currentObjArray.length !== 0){
      
      let currentObj = currentObjArray[0];
      const restOfTheArray = doublePathArray.filter((path) => path !== currentObj);
      if(type === 'price') currentObj.price = input;
      if(type === 'minutes') currentObj.minutes = input;
      setDoublePathArray([...restOfTheArray, currentObj]);

    } else {
      let newObj = {
        startingCityId: startingCityId,
        finishingCityId: finishingCityId,
        price:0,
        minutes:0
      }
      if(type === 'price') newObj.price = input;
      if(type === 'minutes') newObj.minutes = input;
      setDoublePathArray([...doublePathArray , newObj])
    }
  }

  useEffect(() => {
    let totalPrice = 0;
    let totalMinutes = 0;
    doublePathArray.map((path) => {
      totalPrice += parseFloat(path.price);
      totalMinutes += parseInt(path.minutes);
    })
    setTotalPrice(totalPrice);
  
    let temp = totalMinutes;
    let restMinutes = temp % 60;
    let hours = Math.floor(totalMinutes / 60);
    let display = `${hours} saat ${restMinutes} dakika`;
    setDisplayedTotalHours(display)

  }, [doublePathArray]);

  const handleCreateFlight = async () => {
    const firmToken = localStorage.getItem('firmToken')

    try {
      
      setIsLoadingCreateFlight(true);
      const response = await fetch (`${SERVER_URL}/flight/create-flight`, {
        method:'POST',
        body:JSON.stringify({direction , flightTime , flightDate , flightType ,selectedCaptainId , selectedHandmanId , doublePathArray, flightDateDateObj}),
        headers:{
          'Content-Type' :'application/json',
          'authorization':`Bearer ${firmToken}`
        }
      })

      const data = await response.json();
      const {message} = data;
      
      setIsLoadingCreateFlight(false);

      if(response.status === 200) {
        toast.success(message);
      } else {
        toast.warn(message)
      }

    } catch (error) {
      console.error(error);
      toast.warn(error)
    }
  }
  








  useEffect(() => {
    if (direction.length - 1 === doublePathArray.length && flightTime !== '' && flightDate.mounth !== '' && selectedCaptainId !== '' && selectedHandmanId !== '' && flightType !== ''){
      setIsFlightReadyToCreate(true)
    }
    else{
      setIsFlightReadyToCreate(false)
    }

  }, [doublePathArray , flightTime , flightDate])





  return (
    <Modal 
        
      size='5xl'
      isOpen={isOpen} 
      onClose={onClose} 
      scrollBehavior='outside'
    >
      <ModalContent>
        {(onClose) => {
          
        return  (
          
          <>
            <ModalHeader className="flex flex-col gap-1">Sefer oluşturma</ModalHeader>
            <ModalBody className='w-full h-full'>
              <div className='w-full h-full flex justify-evenly'>
                <Chip className='my-auto' variant='dot'>{`Başlangıç: ${Object.keys(cities)[direction[0] - 1] || ' '}`}</Chip>
                <Chip className='my-auto' variant='dot'>{`Bitiş: ${Object.keys(cities)[direction[direction.length - 1] - 1] || ' '}`}</Chip>
                <Chip className='my-auto' color='danger'>{`Tahmini varış süresi: ${displayedTotalHours}`}</Chip>
                <Chip className='my-auto' color='warning'>{`Toplam Fiyat: ${totalPrice} TL`}</Chip>
                <Input
                    
                    type='text'
                    value={flightTime}
                    onChange={(e) => 
                      {
                        let value = e.target.value;
                        if(value.length === 2){
                          value = e.target.value + ':'
                        }
                        setFlightTime(value);
                      }
                    }
                    className='w-40 h-full'
                    placeholder='21:45'
                    label='Sefer başlangıç saati'
                    size='lg'
                  />
                

              </div>
              
              <div className='flex w-full gap-2'>
                <StaticDatePicker
                  label="Tarih seçiniz"
                  defaultValue={dayjs()}
                  onChange={(newValue) => handleFlightDateChange(newValue)}
                  format='DD / MM / YYYY'
                  className='bg-white rounded-l shadow-xl'
                  locate="tr"
                  
                  
                />
                
                <div className='w-full'>
                  <div className='flex gap-3 w-full justify-evenly pt-2'>
                    <Select
                      className="max-w-xs w-[20rem]"
                      label="Kaptan seçiniz"
                      onChange={handleCaptainIdChange}
                      
                    >
                      {drivers.map((driver) => (
                        <SelectItem
                        disabled={true}
                        key={driver.id}
                        value={driver.name}
                        endContent={<Avatar alt={driver.id} className="w-6 h-6" src={driver.avatar} />}
                        
                        >
                        {driver.name}
                        
                        

                        </SelectItem>
                      ))}
                    </Select> 
                    <Select
                      className="max-w-xs w-[18rem]"
                      label="Muavin seçiniz"
                      onChange={handleHandmanIdChange}
                      
                    >
                      {drivers.map((driver) => (
                        <SelectItem
                        
                        key={driver.id}
                        endContent={<Avatar alt={driver.id} className="w-6 h-6" src={driver.avatar} />}
                        
                        >
                        {driver.name}

                        </SelectItem>
                      ))}
                    </Select>
                    
                  </div>
                  <Select
                  label='Seyahat Tipi'
                  onChange={handleFlightTypeChange}
                  className='mt-2'
                  >
                    <SelectItem key='bus' endContent={<DirectionsBusFilledIcon/>}>Otobüs</SelectItem>
                    <SelectItem key='train' endContent={<TrainIcon/>}>Tren</SelectItem>
                    <SelectItem key='plane' endContent={<FlightTakeoffIcon/>}>Uçak</SelectItem>


                  </Select>

                  
                
                  
                </div>
                
                  
               
              </div>
            
              <div className='choose-direction'>
                {Object.keys(cities).map((city) => {
                  const currentCityId = cities[city];
                return (
                  <Chip variant='bordered' color='default' className={`m-1 cursor-pointer  transition-all duration-300 ease-in-out ${direction.includes(currentCityId) === true ? 'active-chip' : ''}`} onClick={() => handleAddToDirection(cities[city])}>
                    {city}
                  </Chip>
                )})}
              </div>
              <div className='current-destination'>
                  {direction.map((cityId , index) => (

                    <p>{index + 1}.{Object.keys(cities)[cityId - 1]}</p>
                    
                  ))}
              </div>
              <div className='selection-of-time-and-price flex flex-col gap-3'>
                {direction.map((cityId, index) => {
                  const nextCity = direction[index + 1];
                  if (nextCity === undefined) { return }; 
                  return (
                    <div className='border px-2 py-2 flex flex-col'>
                      <Chip variant='dot' className='border-none'>{`${Object.keys(cities)[cityId - 1]} - ${Object.keys(cities)[nextCity - 1]} Arası`}</Chip>
                      <div className='flex'>
                        <Input
                          className='w-32'
                          type="number"
                          label="Fiyat"
                          onChange={(e) => handleDoublePathChange(e , 'price', cityId, nextCity)}
                          placeholder="0.00"
                          labelPlacement="outside"
                          startContent={
                            <div className="pointer-events-none flex items-center">
                              <span className="text-default-400 text-small">₺</span>
                            </div>
                          }
                        />
                        <Input
                          className='w-32 ml-5'
                          type="number"
                          label="Tahmini Varış süresi"
                          placeholder='0'
                          onChange={(e) => handleDoublePathChange(e , 'minutes', cityId, nextCity)}

                          labelPlacement="outside"
                          endContent={
                            <div className="pointer-events-none flex items-center">
                              <span className="text-default-400 text-small">dakika</span>
                            </div>
                          }
                        />
                      </div>
                    </div>

                  )
                })}
                    
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Kapat
              </Button>
              <Button color="primary"
              onPress={() => handleCreateFlight()}
              disabled={true}
              className={`${isFlightReadyToCreate === true ? 'healthy-button' : 'disabled-button'}`}
              isLoading={isLoadingCreateFlight}
              >
                Sefer Oluştur
              </Button>
            </ModalFooter>
          </>
        )}}
      </ModalContent>
    </Modal>
  )
}

export default CreateFirmModal