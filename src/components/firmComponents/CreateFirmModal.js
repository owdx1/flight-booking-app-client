import React, { useEffect, useState } from 'react'
import { CreateFirmContext , useContext } from '../../useContext/createFirmContext'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea} from "@nextui-org/react";
import {cities} from '../../data/cities'
import { Chip } from '@nextui-org/react';
import { DatePicker, StaticDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { months } from '../../data/months';
import { days } from '../../data/days';
const CreateFirmModal = () => {

  const {isOpen , onOpen , onClose} = useContext(CreateFirmContext);
  const [direction, setDirection] = useState([]);
  const [flightTime, setFlightTime] = useState('');
  const [flightInformation, setFlightInformation] = useState('');
  const [flightDate , setFlightDate] = useState({
    mounth:'',
    day:'',
    year:'',
    dayName:''
  });
  const handleAddToDirection = (cityId) => {

    if(!direction.includes(cityId)){
      setDirection([...direction, cityId]);
    } else {
      const withoutSpecificIdArray = direction.filter((idInArray) => idInArray !== cityId )
      setDirection(withoutSpecificIdArray)
    }
  }

  const handleFlightDateChange = (date) => {
    console.log(date);
    const year = date.$y;
    const monthID = date.$M
    const day = date.$D
    const dayNameId = date.$W;
    setFlightDate({
      mounth: months[monthID],
      year: year,
      dayName: days[dayNameId],
      day: day
    })
  }


  return (
    <Modal 
        
      size='5xl'
      isOpen={isOpen} 
      onClose={onClose} 
      scrollBehavior='outside'
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Sefer oluşturma</ModalHeader>
            <ModalBody className='w-full h-full'>
              <div className='w-full h-full flex justify-evenly'>
                <Chip className='' variant='dot'>{`Başlangıç: ${Object.keys(cities)[direction[0] - 1] || ' '}`}</Chip>
                <Chip className='' variant='dot'>{`Bitiş: ${Object.keys(cities)[direction[direction.length - 1] - 1] || ' '}`}</Chip>
                <Chip  color='danger'>{`Tahmini varış süresi: `}</Chip>
                <Chip  color='warning'>{`Toplam Fiyat: `}</Chip>
                

              </div>
              
              <div className='flex w-full gap-2'>
                <StaticDatePicker
                  label="Tarih seçiniz"
                  defaultValue={dayjs('2023-04-17')}
                  onChange={(newValue) => handleFlightDateChange(newValue)}
                  format='DD / MM / YYYY'
                  className='bg-white rounded-l shadow-xl'
                  
                />
                <Textarea 
                placeholder='Çok iyi yolculujk olcak'
                label='Sefer açıklaması'
                value={flightInformation}
                maxRows={24}
                onChange={(e) => setFlightInformation(e.target.value)}
                className='w-[16rem]'
                />
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
                  className='w-40'
                  placeholder='21:45'
                  label='Sefer başlangıç saati'
                  size='lg'
                />
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
                {direction.map((cityId, index) =>{
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
              <Button color="primary" onPress={onClose}>
                Sefer Oluştur
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default CreateFirmModal