import React, { useEffect, useState } from 'react'
import { Accordion, AccordionItem, Button, Chip, CircularProgress } from '@nextui-org/react'
import { useParams } from 'react-router-dom';
import { MainContext, useContext } from '../useContext/context';
import { cities } from '../data/cities';
import DirectionsBusFilledIcon from '@mui/icons-material/DirectionsBusFilled';
import AddIcon from '@mui/icons-material/Add';
import TrainIcon from '@mui/icons-material/Train';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { days } from '../data/days';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import CurrencyLiraIcon from '@mui/icons-material/CurrencyLira';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { Select , SelectItem } from '@nextui-org/react';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import { Badge } from '@nextui-org/react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react";


const SearchedFlights = () => {
  const navigate = useNavigate();
  const {activeFlightType, setActiveFlightType} = useContext(MainContext);

  const flightType = {
    'bus' : <DirectionsBusFilledIcon style={{fontSize:'40px'}}/>,
    'train': <TrainIcon style={{fontSize:'70px'}}/>,
    'plane': <FlightTakeoffIcon style={{fontSize:'70px'}}/>
  }


  const searchParams = new URLSearchParams(window.location.search); 
  console.log(searchParams.toString());
  const eid = searchParams.get('eid');
  const sid = searchParams.get('sid');
  const monthID = searchParams.get('monthID');
  const year = searchParams.get('year');
  const dayID = searchParams.get('dayID');
  const type = searchParams.get('type');
  const selectedSeatId = searchParams.get('selectedSeatID');
  const [selectedSeatIdUseState , setSelectedSeatIdUseState] = useState('');
  const defaultDate = new Date(year, monthID, dayID);
  
  const [isLoading , setIsloading] = useState(false);
  const [currentFlights, setCurrentFlights] = useState([]);




  const handleDateChange = (date) => {
    console.log('suanki date' , date);
    searchParams.set('monthID', date.$M);
    searchParams.set('year', date.$y);
    searchParams.set('dayID', date.$D);
    window.history.pushState(
      null,
      "",
      `?${searchParams.toString()}`
    )
  }
  useEffect(() => {
    const searchFlights = async () => {
      try {
        setIsloading(true)
        const response = await fetch(`http://localhost:5000/search`, {
          method:'POST',
          headers: {
            'Content-Type' :'application/json'
          },
          body: JSON.stringify({eid , sid ,monthID ,year , dayID, type})
        })

        const responseData = await response.json();
        setIsloading(false);
        if(response.status === 200) {
          setCurrentFlights(responseData.flights);
          console.log(responseData.flights);
          
        }
        
      } catch (error) {
        console.error(error);
      }
    }
    searchFlights();

  }, [])
  const handleStartingCityChange = (event) => {
    const cityName = event.target.value;
    
    
    //setStartingCityID(cities[cityName])
    searchParams.set('sid', cities[cityName])
    
    window.history.pushState(
      null,
      "",
      `?${searchParams.toString()}`
    )
  };
  const handleSelectedSeatIdChange = (seatId) => {
    searchParams.set('selectedCityID' , seatId);
    if(selectedSeatIdUseState === seatId) {
      setSelectedSeatIdUseState('');
    }
    else {
      setSelectedSeatIdUseState(seatId);
    }

    window.history.pushState(
      null,
      "",
      `?${searchParams.toString()}`
    )
  }

  const handleFinishingCityChange = (event) => {
    const cityName = event.target.value;
    
    searchParams.set('eid', cities[cityName])
    //setFinishingCityID(cities[cityName]);
    window.history.pushState(
      null,
      "",
      `?${searchParams.toString()}`
    )
   
  };


  if(isLoading === true) {
    return (
      <div className='w-[calc(100% - 7rem)] h-[40rem]  flex'>
        <CircularProgress className='mx-auto my-auto' label='Seferler yükleniyor...'/>
      </div>
    )
  }
  const handleNavigatePayment = () => {

      navigate(`/payment?${searchParams}`)
    
  }

  return ( 
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <div className='w-[78rem] h-32  mx-auto flex gap-12'>
          <div className='select-div flex w-[32rem] gap-8'>
            <Select
              size='lg'
              variant='underlined'
              label='Başlangıç'
              className='max-w-xs mx-auto my-auto shadow-lg'
              startContent={<LocationOnIcon/>}
              onChange={handleStartingCityChange}
              defaultSelectedKeys={[Object.keys(cities)[sid -1]]}
              
              >
                {Object.keys(cities).map ((city) => (
                  <SelectItem  key={city} value={city}>{city}</SelectItem>

                ))}

            </Select>
            <DoubleArrowIcon className='my-auto'/>
            <Select
              size='lg'
              label='Bitiş'
              variant='underlined'
              className='max-w-xs mx-auto my-auto shadow-lg '
              startContent={<LocationOnIcon/>}
              onChange={handleFinishingCityChange}
              defaultSelectedKeys={[Object.keys(cities)[eid - 1]]}
            >
                {Object.keys(cities).map ((city) => (
                  <SelectItem  key={city} value={city}>{city}</SelectItem>

                ))}

            </Select>
          </div>
          <div className='flex flex-col my-auto pt-2'>
            <DatePicker
              format='DD / MM / YYYY'
              className='my-auto  mx-auto w-48'
              defaultValue = {dayjs(defaultDate)}
              onChange={(newValue) => handleDateChange(newValue)}
            />
          </div>
          <Button size='xl'  className='my-auto mx-auto shadow-lg text-white bg-slate-500  hover:bg-slate-300 active:bg-slate-200' onClick={() => {
            window.location.reload();
          }}>
            Tekrar sefer ara
          </Button>
          
          

        </div>
        <div className='w-[78rem] h-full  flex justify-center mx-auto'> 
          <Accordion className='mx-auto'>
          
                  
            {currentFlights.map((flight) => {

              return (

                <AccordionItem key={flight._id} indicator='Koltuk seç'  title= {
                  <div className='w-full h-24 flex justify-evenly shadow-xl bg-stone-50'>
                    <div className='flex gap-2 w-full'>
                      <div className='mx-auto my-auto min-w-[10rem] flex'>
                        <Chip  variant='shadow' color='danger' className='mx-auto'>{flight.firmName}</Chip>
                      </div>
                      <Chip
                        variant="shadow"
                        classNames={{
                          base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30 ml-2",
                          content: "drop-shadow shadow-black text-white",
                        }}
                        className='mx-auto my-auto'
                        
                      >
                        {flightType[flight.flightType]}

                      </Chip>
                      <div className='flex flex-col'>
                        <Chip className='my-auto mx-auto border-none' variant='dot' color='warning' style={{fontSize:'24px'}}>{Object.keys(cities)[flight.searchStarting - 1]} - {Object.keys(cities)[flight.searchFinishing - 1]}</Chip>
                        <Chip className='border-none pb-6' variant='light'>{`Tahmini varış süresi: ${Math.floor(flight.intercityMinutes / 60)} saat ${flight.intercityMinutes % 60} dakika`}</Chip>
                      </div>
                      <Chip startContent={<QueryBuilderIcon/>} className='my-auto mx-auto border-none' variant='dot' style={{fontSize:'24px'}} color='warning'> {flight.searchFromStartToSidHour}:{flight.searchFlightMinutes}{flight.searchFlightMinutes === 0 ? '0' :''}</Chip>
                      <Chip className='my-auto mx-auto border-none' variant='dot' style={{fontSize:'24px'}} color='warning'> {flight.flightDate} {days[flight.dayNameId]}</Chip>
                      <Chip endContent={<CurrencyLiraIcon/>} className='my-auto mx-auto border-none' variant='dot' style={{fontSize:'24px'}} color='warning'> {flight.intercityPrice}</Chip>
                      
                    </div>
                  </div>
                }>
                  <div className='w-full h-[24rem] '>
                    <div className='w-full h-16 flex gap-0.5 justify-between'>
                      
                      <Chip variant='dot' className='border-none my-auto' style={{fontSize:'24px'}}>Ana güzergah: </Chip>
                      {flight.direction.map((cityId) => (
                        <Chip className='border-none my-auto' variant='shadow' color={`${(cityId === flight.searchStarting || cityId === flight.searchFinishing) ? 'danger' : 'default'}`}>{Object.keys(cities)[cityId - 1]}</Chip>
                      ))}
                      <Chip className='my-auto border-none' variant='light' style={{fontSize:'20px'}}>Ana Güzergah Başlangıç Saati: {flight.flightTime}</Chip>
                    </div>
                    <div className='w-full flex flex-wrap flex-row gap-2 overflow-x-auto h-64 p-4 px-6 bg-slate-100 rounded-lg'>
                      {flight.seats.map((seat) => {
                        
                        let selectedColor;
                        let direction = flight.direction;
                        const searchFirst = direction.indexOf(parseInt(sid));
                        const searchSecond = direction.indexOf(parseInt(eid));
                        const seatFirst = direction.indexOf(parseInt(seat.selectedFirstCityId));
                        const seatSecond = direction.indexOf(parseInt(seat.selectedSecondCityId));
                        
                        
                        
                        if (searchFirst <= seatFirst && searchSecond <= seatFirst) {
                          selectedColor = 'text-stone-200';
                        } 
                        else if (searchFirst >= seatSecond && searchSecond >= searchSecond) {
                          selectedColor = 'text-stone-200';
                        }
                        else if (searchFirst > searchFirst && searchSecond < searchSecond) {
                          selectedColor = 'text-stone-200';
                        }
                        else {
                          selectedColor = 'text-[#c7e2fb]';
                        }



                        /*if (
                          (direction.indexOf(parseInt(sid)) < direction.indexOf(parseInt(seat.selectedFirstCityId)) &&
                            direction.indexOf(parseInt(seat.selectedFirstCityId)) < direction.indexOf(parseInt(eid))) ||
                          (direction.indexOf(parseInt(sid)) < direction.indexOf(parseInt(seat.selectedSecondCityId)) &&
                            direction.indexOf(parseInt(seat.selectedSecondCityId)) < direction.indexOf(parseInt(eid)))
                        ) {
                          selectedColor = 'text-[#c7e2fb]';
                        } else {
                          selectedColor = 'text-stone-200';
                        }*/
                        
                        

                        
                        return (
                          
                          <div className={`cursor-pointer  ${selectedColor === 'text-[#c7e2fb]' ? 'pointer-events-none' : ''} `} onClick={() => {
                            seat._id === selectedSeatIdUseState ? handleSelectedSeatIdChange('') : handleSelectedSeatIdChange(seat._id)
                          }}
                          
                          >
                          <Badge className='h-0 w-0' content={seat.seatNumber}>
                            <EventSeatIcon style={{ fontSize:'32px'}}
                            className={`${selectedSeatIdUseState === seat._id ? 'text-green-400': selectedColor} transition-all duration-300 ease-in-out`}/>
                          </Badge>
                          </div>
                          
                          
                        )
                      })}
                    </div>
                    <div className='right-0 mt-2'>
                      <Button onClick={() => handleNavigatePayment()} className={`${selectedSeatIdUseState === '' ? 'disabled-button' : 'healthy-button'} text-gray-100`}>
                        onayla ve devam et
                      </Button>
                    </div>
                    
                  </div>
                
                </AccordionItem>
              )
            })}

            
          </Accordion>
        </div>
      </div>
    </LocalizationProvider>
    
  )
}

export default SearchedFlights