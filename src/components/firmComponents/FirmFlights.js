import React, { useState } from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Chip, Switch } from '@nextui-org/react'
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
  const [isSwitchActive , setIsSwitchActive] = useState(false);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const createFirmData = {
    isOpen , onClose, onOpen
  }


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
        <Switch color={`${isSwitchActive ? 'warning' : ''}`} isSelected={isSwitchActive} onValueChange={setIsSwitchActive}>Sadece aktifleri gör</Switch>
      </div>
      <Accordion className=''>
        {flightsArray.map((flight) => (
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
              {flightType[flight.flight_type]}

            </Chip>
            
              <Chip color={statusColorMap[flight.status]} className=' ml-2' variant='dot'>
                {statusMap[flight.status]}
              </Chip>
            </div>
          }
          key={flight.flight_id} aria-label={flight.flight_id} className='bg-stone-100 mt-3 shadow-sm'
          title={`${flight.flight_start} - ${flight.flight_end} ${flight.flight_time} ${flight.flight_day} (${flight.flight_hour}) ${flight.price} TL`}>
            <Card className='w-[72rem] h-[20rem] bg-slate-200 mx-auto my-auto gap-3'>

            </Card>

          </AccordionItem>
        ))}
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