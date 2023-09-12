import React, { useEffect, useState } from 'react';
import { MainContext , useContext } from '../useContext/context';
import { Button } from '@nextui-org/button';
import PlaceIcon from '@mui/icons-material/Place';
import ExploreIcon from '@mui/icons-material/Explore';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import FlightVehicleHeader from '../utils/FlightVehicleHeader';
import { MenuItem } from '@mui/material';
import { Input } from '@nextui-org/react';
import {InputLabel} from '@mui/material';
import { Menu } from '@mui/icons-material';
import { Select, SelectItem } from '@nextui-org/react';


function FlightSelection() {
  const {toast, activeFlightType} = useContext(MainContext);
  
 
  const citiesDictionary = {
    'Istanbul': 34,
    'Ankara': 6,
    'Izmir': 35,
  };

  const citiesArray = [
    'Istanbul','Ankara','Izmir','Tokat', 'Eskisehir'
  ]

  const [startingCityID, setStartingCityID] = useState(0);
  const [finishingCityID, setFinishingCityID] = useState(0);
  const [startingCity, setStartingCity] = useState('');
  const [finishingCity, setFinishingCity] = useState('');
  const [filteredCities, setFilteredCities] = useState([])
  const [date, setDate] = useState({
    monthID:'',
    day:'',
    year:''

  });


  const handleStartingCityChange = (event) => {
    setStartingCity(event.target.value)

    
  };

  const handleFinishingCityChange = (event) => {
    setFinishingCity(event.target.value);
   
  };


  useEffect(() => {
    console.log('current date year: ' , date.$y);

    console.log('current info' , date)
    if(date.$d !== undefined) {
      const info = date.$d;
      console.log(JSON.stringify(info));
      
    
    }
  }, [date])

  const handleSyncClick = () =>{
    const temp = startingCity;
    setStartingCity(finishingCity);
    setFinishingCity(temp);
  }

  const searchFlights = () => {
    console.log('suanki first' , startingCity);
    console.log('suanki end', finishingCity);
  }

  useEffect(() => {
    const filteredCities = citiesArray.filter ((city) => city.startsWith(startingCity));

    setFilteredCities(filteredCities);
  }, [startingCity])




  

  return (
    <div className='w-[500px] h-[600px] flex flex-col rounded-lg bg-stone-50 p-6 gap-12 mx-auto my-auto shadow-md'>
      <FlightVehicleHeader/>
      <div className='flex justify-between' style={{alignItems:'center'}}>
        <PlaceIcon className='text-slate-600'/>
        <Select
          label="Starting City"
          className='max-w-xs mx-auto shadow-lg'
          startContent={<LocationCityIcon/>}
          onChange={handleStartingCityChange}
          >
            {citiesArray.map ((city) => (
              <SelectItem key={city} value={city}>{city}</SelectItem>

            ))}

        </Select>
        
      </div>
      <SyncAltIcon className='mx-auto rotate-90 cursor-pointer' onClick = {() => handleSyncClick()}/>
      <div className='flex justify-between' style={{alignItems:'center'}}>
        <ExploreIcon className='text-slate-600'/>
        <Select
          label="Finishing City"
          className='max-w-xs mx-auto shadow-lg'
          startContent={<LocationCityIcon/>}
          onChange={handleFinishingCityChange}
          >
            {citiesArray.map ((city) => (
              <SelectItem key={city} value={city}>{city}</SelectItem>

            ))}

        </Select>

      </div>
      <DatePicker
        label="Tarih seçiniz"
        defaultValue={dayjs('2023-04-17')}
        onChange={(newValue) => setDate(newValue)}
        format='DD / MM / YYYY'
        className='bg-white rounded-l shadow-xl'
      />

      <Button 
      onClick={() => searchFlights()} className='bg-slate-800 w-32 mx-auto h-12 text-white disabled:bg-slate-300 disabled:cursor-not-allowed'
      disabled={activeFlightType === '' || startingCity==='' || finishingCity==='' || date.year===''}
      >Sefer Ara</Button>
    </div>
  );
}

export default FlightSelection;
