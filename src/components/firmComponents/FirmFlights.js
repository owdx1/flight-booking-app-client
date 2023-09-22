import React, { useEffect, useState } from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Chip, Switch, Avatar, Popover } from '@nextui-org/react'
import { Accordion, AccordionItem, Button, Card} from '@nextui-org/react';
import DirectionsBusFilledIcon from '@mui/icons-material/DirectionsBusFilled';
import AddIcon from '@mui/icons-material/Add';
import TrainIcon from '@mui/icons-material/Train';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { CreateFirmContext } from '../../useContext/createFirmContext';
import CreateFirmModal from './CreateFirmModal';
import {useDisclosure} from "@nextui-org/react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { MainContext, useContext } from '../../useContext/context';
import {FirmContext} from '../../useContext/firmContext'
import { cities } from '../../data/cities';
import { drivers } from '../../data/drivers';
import dayjs from 'dayjs';
import { days } from '../../data/days';
import { circIn } from 'framer-motion';





const flightsArray = [
  {
    flight_id: 1,
    flight_type:'bus',
    flight_day: 'Tuesday',
    flight_hour: '21.45',
    flight_time: '18/09/2023',
    flight_start: 'Ankara',
    flight_end: 'Tokat',
    status:1,
    price:599
  },
  {
    flight_id: 2,
    flight_type:'bus',
    flight_day: 'Tuesday',
    flight_hour: '21.45',
    flight_time: '18/09/2023',
    flight_start: 'İzmir',
    flight_end: 'Tokat',
    status:0,
    price:599
  },
  {
    flight_id: 3,
    flight_type:'bus',
    flight_day: 'Tuesday',
    flight_hour: '21.45',
    flight_time: '18/09/2023',
    flight_start: 'Ankara',
    flight_end: 'İstanbul',
    status:0,
    price:599
  },

]

const statusColorMap = {
  0: "success",
  1: "danger",
};
const statusMap = {
  0: 'Aktif',
  1: 'Aktif değil'
}

const flightType = {
  'bus' : <DirectionsBusFilledIcon/>,
  'train': <TrainIcon/>,
  'plane': <FlightTakeoffIcon/>
}

const FirmFlights = () => {

  const todaysDate = dayjs();
  

  const {currentFlights} = useContext(FirmContext);
  const {toast} = useContext(MainContext)
  const [isSwitchActive , setIsSwitchActive] = useState(false);
  const [displayedFlights, setDisplayedFlights] = useState([]);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const createFirmData = {
    isOpen , onClose, onOpen, toast
  }
  


  useEffect(() => {
    console.log(currentFlights);
  
    if (isSwitchActive === true) {
      const filtered = currentFlights.filter((flight) => {
        const flightDate = flight.flightDateDateObj !== null ? dayjs(flight.flightDateDateObj) : {};
        console.log('flightDate dayjs e donustukten sonra' , flightDate);
        

        return (flightDate.$y >= todaysDate.$y && flightDate.$M >= todaysDate.$M && flightDate.$D >= todaysDate.$D);
      });
      console.log('filtered flights', filtered);
      setDisplayedFlights(filtered);
    } else {
      setDisplayedFlights(currentFlights);
    }
  }, [isSwitchActive]);


  return (
    <div className='flex flex-col'>
      <div className='flex w-full justify-between'>
        <Dropdown backdrop='blur'>
          <DropdownTrigger>

            <Button 
              className='w-24 text-gray-500 my-3'
              variant='bordered'
            >
              <AddIcon/>
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant="flat" aria-label="Dropdown menu with shortcut">
            <DropdownItem
            key="new" endContent={<AddIcon/>} color='secondary' className='text-secondary'
            onPress={() => onOpen()}
            >Sefer Oluştur</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Switch color={`${isSwitchActive ? 'success' : ''}`} isSelected={isSwitchActive} onValueChange={setIsSwitchActive}>Sadece aktifleri gör</Switch>
      </div>
      {displayedFlights.length === 0 ? <Chip variant='dot' color='danger'>Gösterilecek sefer bulunamadı</Chip> : ''}
      <Accordion className=''>
        
        {displayedFlights.map((flight) => {

          const captainArray = drivers.filter((driver) => driver.id === parseInt(flight.captainId)) // burda duruma göre parseint yok, parseint olmayan versioyna geç
          const captain = captainArray.length !== 0 ? captainArray[0] : null;
          const handmanArray = drivers.filter((handman) => handman.id === parseInt(flight.handmanId))
          const handman = handmanArray.length !== 0 ? handmanArray[0] : null
          const flightDate = dayjs(flight.flightDateDateObj);
          
          let status = 0
          
          
          if((flightDate.$y <= todaysDate.$y) && (flightDate.$M <= todaysDate.$M) && (flightDate.$D <= todaysDate.$D)) status = 1;
          
          return (
          <AccordionItem 
          startContent=
          
          
          { <div>
            <Chip
              variant="shadow"
              classNames={{
                base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30 ml-2",
                content: "drop-shadow shadow-black text-white",
              }}
            >
              {flightType[flight.flightType]}

            </Chip>
            
              <Chip color={statusColorMap[status]} className=' ml-2' variant='dot'>
                {statusMap[status]}
              </Chip>
            </div>
          }
          key={flight.flight_id} aria-label={flight.flight_id} className='bg-stone-100 mt-3 shadow-sm'

          title = {
            <div className='flex w-full  justify-evenly'>
              <div className='flex cities gap-2 w-48'>
                <p className='mx-auto'>{Object.keys(cities)[flight.direction[0] - 1]}</p>
                <p>-</p>
                <p className='mx-auto'>{Object.keys(cities)[flight.direction[flight.direction.length - 1] - 1]}</p>
              </div>
              <Chip variant='dot' color='warning'>{flight.flightDate}</Chip>
              <Chip variant='dot' color='warning'>{days[flight.dayNameId]}</Chip>
              <Chip variant='dot' color='warning'>{flight.flightTime}</Chip>
            </div>
          }
          >
            <Card className='w-full h-[24rem] flex flex-col'>
              <div className='flex w-full justify-evenly h-12'>
                <div className='flex gap-1'>
                  <Chip className='flex my-auto border-none' variant='dot' color='success'>Kaptan: {captain.name}</Chip>
                  <Avatar src={captain.avatar} className='w-6 h-6 my-auto'></Avatar>

                </div>
                <div className='flex gap-1'>
                  <Chip variant='dot' color='success' className='my-auto border-none'>Muavin: {handman.name}</Chip>
                  <Avatar src={handman.avatar} className='w-6 h-6 my-auto'></Avatar>
                </div>
                <div className='shadow-md rounded-xl flex w-52 h-full justify-center'>
                  <Chip variant='light' className='my-auto'>Toplam Gelir:</Chip>
                  <Chip variant='light' style={{fontSize:'20px'}} className='my-auto'> {flight.totalIncome} TL </Chip>
                  
                </div>
                <div className='shadow-md rounded-xl flex w-48 h-full justify-center'>
                <Chip variant='light' className='my-auto'>Toplam Yolcu:</Chip>
                <Chip variant='light' style={{fontSize:'20px'}} className='my-auto'>{flight.totalPassangers}</Chip>
                </div>
              </div>
              <div className='w-[calc(100%-29rem)] h-48 flex flex-wrap gap-1.5 ml-2 mt-2'>
                {flight.seats.map((seat) => {
                  console.log(seat.bookersInformation);
                  let totalMoneyFromThisSeat = 0;
                  seat.bookersInformation.map((booker) => {
                    totalMoneyFromThisSeat += booker.customersTotalPayment
                  })
                  
                  
                  return (
                    <Dropdown size='lg'>
                      <DropdownTrigger>
                        <Chip
                          className='m-0 p-0 border-none cursor-pointer hover:bg-slate-100'
                          color={`${seat.bookingCounter === 0 ? '' : 'success'}`}
                          variant='dot'
                        >
                          {seat.seatNumber}
                        </Chip>
                      </DropdownTrigger>
                      <DropdownMenu className='hover:bg-none'>
                        <DropdownItem className=''>
                          <Card className='rounded-none hover:bg-none bg-none'>
                            <p className='mx-auto mt-2'>Kullanım Sayısı: {seat.bookingCounter}</p>
                            <p className='mx-auto mt-2'>Koltuk getirisi: {totalMoneyFromThisSeat} TL</p>
                            <p className='mt-3 mx-auto' style={{fontSize:'20px'}}>Koltuk Yolcu Listesi</p>
                            
                          </Card>
                        </DropdownItem>
                        <DropdownItem className='hover:bg-white '>
                          {seat.bookersInformation.map((booker) => {
                            return (
                              <Card className='rounded-none hover:bg-none bg-none border shadow-lg mt-2'>
                                <Chip variant='dot' className='border-none rounded-md'  color='secondary'>{booker.customersName}</Chip>
                                <Chip variant='dot' className='border-none rounded-md'  color='secondary'>{booker.customersID}</Chip>
                                <Chip variant='dot' className='border-none rounded-md'  color='secondary'>{booker.customersPhone}</Chip>
                                <Chip variant='dot' className='border-none rounded-md'  color='secondary'>{booker.customersEmail}</Chip>
                                <Chip variant='dot' className='border-none rounded-md'  color='secondary'>{Object.keys(cities)[booker.customersStartingCityId -1]} - {Object.keys(cities)[booker.customersEndingCityId - 1]}</Chip>

                                
                              </Card>
                            )
                          })}
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  )
                })}
              </div>
              <div className='w-64 flex left-1 justify-evenly'>
                <Chip variant='light' className='cursor-pointer hover:bg-slate-200 rounded-md'>Düzenle</Chip>
                <Chip color='danger' variant='shadow' className='rounded-md cursor-pointer hover:bg-red-200'>Seferi Sil</Chip>

              </div>
            </Card>

          </AccordionItem>  
        )})}
      </Accordion>

      <CreateFirmContext.Provider value={createFirmData}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CreateFirmModal/>
          </LocalizationProvider>
      </CreateFirmContext.Provider>

      




    </div>
    
  )
}

export default FirmFlights