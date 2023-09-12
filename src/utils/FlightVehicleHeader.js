import React from 'react'
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import TrainIcon from '@mui/icons-material/Train';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import { MainContext , useContext } from '../useContext/context';
const FlightVehicleHeader = () => {

  const {activeFlightType, setActiveFlightType} = useContext(MainContext);

  const handleActiveFlightTypeChange = (newType) => {
    if(activeFlightType === newType){
      setActiveFlightType('')
    } else{
      setActiveFlightType(newType)
    }
  }
  const isBusActive = activeFlightType === 'bus';
  const isTrainActive = activeFlightType === 'train';
  const isPlaneActive = activeFlightType === 'plane';


  return (
    <div className='mx-auto grid grid-flow-row grid-cols-3 justify-between w-full h-16 gap-3'>
      <div className={`cursor-pointer hover:bg-stone-300 w-full h-full rounded-lg bg-slate-100 shadow-xl transition-all duration-300 ease-in-out flex ${isBusActive ? 'bg-slate-300': ''}`}
      onClick={() => handleActiveFlightTypeChange('bus')}
      ><DirectionsBusIcon className='mx-auto my-auto w-full h-full'
      
      />
      </div>
      <div className={`cursor-pointer hover:bg-stone-300 w-full h-full rounded-lg bg-slate-100 shadow-xl transition-all duration-300 ease-in-out flex ${isTrainActive ? 'bg-slate-300': ''}`}
      onClick={() => handleActiveFlightTypeChange('train')}
      ><TrainIcon className='w-full h-full mx-auto my-auto'
      
      />
      </div>
      <div className={`cursor-pointer hover:bg-stone-300 w-full h-full rounded-lg bg-slate-100 shadow-xl transition-all duration-300 ease-in-out flex ${isPlaneActive ? 'bg-slate-300': ''}`}
      onClick={() => handleActiveFlightTypeChange('plane')}
      ><AirplanemodeActiveIcon className='mx-auto my-auto'
      
      />
      </div>
    </div>
  )
}

export default FlightVehicleHeader;