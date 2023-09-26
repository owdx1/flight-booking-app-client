import React, { useEffect, useState } from 'react';
import { MainContext , useContext } from '../useContext/context';
import { Button } from '@nextui-org/button';
import PlaceIcon from '@mui/icons-material/Place';
import ExploreIcon from '@mui/icons-material/Explore';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { Select, SelectItem } from '@nextui-org/react';
import {cities} from '../data/cities'
import { useNavigate } from 'react-router-dom';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import TrainIcon from '@mui/icons-material/Train';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import {days} from '../data/days'
import {months} from '../data/months'


function FlightSelection() {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const startingCityID = searchParams.get('sid');
  const finishingCityID = searchParams.get('eid');
  const year = searchParams.get('year');
  const monthID = searchParams.get('monthID');
  const dayID = searchParams.get('dayID');
  const type = searchParams.get('type');

  useEffect(() => {
    console.log(year);
  }, [])

  const defaultValue = year === null ? dayjs() : dayjs(`${dayID}/${monthID}/${year}`) // calısmıyo

  const [activeType, setActiveType] = useState('');
  //const [startingCityID, setStartingCityID] = useState(0);
  //const [finishingCityID, setFinishingCityID] = useState(0);
  const [startingCity, setStartingCity] = useState('');
  const [finishingCity, setFinishingCity] = useState('');
  const [date, setDate] = useState({
    monthID : '',
    dayID : '',
    year : ''
  });


  useEffect(() => {
    console.log(searchParams.toString());
  }, [searchParams])


  const handleStartingCityChange = (event) => {
    const cityName = event.target.value;
    console.log('city name' ,cityName);
    setStartingCity(cityName);
    //setStartingCityID(cities[cityName])
    cityName !== undefined ? searchParams.set('sid', cities[cityName]) : searchParams.delete('sid');
    window.history.pushState(
      null,
      "",
      `?${searchParams.toString()}`
    )
  };

  const handleFinishingCityChange = (event) => {
    const cityName = event.target.value;
    setFinishingCity(cityName);
    cityName !== undefined ? searchParams.set('eid', cities[cityName]): searchParams.delete('eid');
    //setFinishingCityID(cities[cityName]);
    window.history.pushState(
      null,
      "",
      `?${searchParams.toString()}`
    )
   
  };
  const handleActiveFlightTypeChange = (newType) => {
    if(type === newType){
      searchParams.delete('type');
      setActiveType('');
    } else{
      searchParams.set('type' , newType);
      setActiveType(newType)
    }
      window.history.pushState(
        null,
        "",
        `?${searchParams.toString()}`
      )
    
  }


  const handleDateChange = (date) => {
    console.log('suanki date' , date);
    searchParams.set('monthID', date.$M);
    searchParams.set('year', date.$y);
    searchParams.set('dayID', date.$D);
    setDate({
      'monthID' : date.$M,
      'year' : date.$y,
      'dayID' : date.$D
    })
    window.history.pushState(
      null,
      "",
      `?${searchParams.toString()}`
    )
  }


  const handleSyncClick = () =>{
    const temp = startingCity;
    setStartingCity(finishingCity);
    setFinishingCity(temp);
  }

  const searchFlights = () => {
    console.log('gönderilecekler' , startingCityID , finishingCityID , startingCity , finishingCity , monthID , dayID , year);
    navigate(`/searched-flights?${searchParams}`)
  }

  /*useEffect(() => {
    window.history.pushState(
      null,
      "",
      `?sid=${startingCityID}&eid=${finishingCityID}&dayID=${dateInfo.day}&monthID=${dateInfo.monthID}&year=${dateInfo.year}`
    )
  },[])*/ 

  const isBusActive = type === 'bus';
  const isTrainActive = type === 'train';
  const isPlaneActive = type === 'plane';


  return (
    <div className='w-[500px] h-[600px] flex flex-col rounded-lg bg-stone-50 p-6 gap-12 mx-auto my-auto shadow-md'>
        <div className='mx-auto grid grid-flow-row grid-cols-3 justify-between w-full h-16 gap-3'>
        <div className={`cursor-pointer hover:bg-stone-300 w-full h-full rounded-lg bg-slate-100 shadow-xl transition-all duration-300 ease-in-out flex ${type === 'bus' ? 'bg-slate-300' : ''} ${activeType === 'bus' ? 'bg-slate-300': ''}`}
        onClick={() => handleActiveFlightTypeChange('bus')}
        ><DirectionsBusIcon className='mx-auto my-auto w-full h-full'
        
        />
        </div>
        <div className={`cursor-pointer hover:bg-stone-300 w-full h-full rounded-lg bg-slate-100 shadow-xl transition-all duration-300 ease-in-out flex ${type === 'train' ? 'bg-slate-300' : ''} ${activeType === 'train' ? 'bg-slate-300': ''}`}
        onClick={() => handleActiveFlightTypeChange('train')}
        ><TrainIcon className='w-full h-full mx-auto my-auto'
        
        />
        </div>
        <div className={`cursor-pointer hover:bg-stone-300 w-full h-full rounded-lg bg-slate-100 shadow-xl transition-all duration-300 ease-in-out flex ${type === 'plane' ? 'bg-slate-300' : ''} ${activeType === 'plane' ? 'bg-slate-300': ''}`}
        onClick={() => handleActiveFlightTypeChange('plane')}
        ><AirplanemodeActiveIcon className='mx-auto my-auto'
        
        />
        </div>
      </div>
      <div className='flex justify-between' style={{alignItems:'center'}}>
        <PlaceIcon className='text-slate-600'/>
        <Select
          defaultSelectedKeys={[Object.keys(cities)[startingCityID -1]] || 'Şehir seçiniz...'}
          label="Starting City"
          className='max-w-xs mx-auto shadow-lg'
          startContent={<LocationCityIcon/>}
          onChange={handleStartingCityChange}
          >
            {Object.keys(cities).map ((city) => (
              <SelectItem key={city} value={city}>{city}</SelectItem>

            ))}

        </Select>
        
      </div>
      <SyncAltIcon className='mx-auto rotate-90 cursor-pointer' onClick = {() => handleSyncClick()}/>
      <div className='flex justify-between' style={{alignItems:'center'}}>
        <ExploreIcon className='text-slate-600'/>
        <Select
        defaultSelectedKeys={[Object.keys(cities)[finishingCityID -1]]}
          label="Finishing City"
          className='max-w-xs mx-auto shadow-lg'
          startContent={<LocationCityIcon/>}
          onChange={handleFinishingCityChange}
          >
            {Object.keys(cities).map ((city) => (
              <SelectItem key={city} value={city}>{city}</SelectItem>

            ))}

        </Select>

      </div>
      <DatePicker
        label="Tarih seçiniz"
        defaultValue={year === null ? dayjs() : defaultValue}
        onChange={(newValue) => handleDateChange(newValue)}
        format='DD / MM / YYYY'
        className='bg-white rounded-l shadow-xl'
      />

      <Button 
      onClick={() => searchFlights()} 
      className={`bg-slate-800 w-32 mx-auto h-12 text-white ${((startingCity !== '' || startingCityID !== null) && (finishingCity !== '' || finishingCityID !== null) && (activeType !== '' || type !== null) && (date.year !== '' || year !== null))? 'healthy-button' : 'disabled-button'}`}
      >Sefer Ara</Button>
    </div>
  );
}

export default FlightSelection;
