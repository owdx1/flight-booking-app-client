import Background from '../components/Background';
import { MainContext } from '../useContext/context';
import FlightSelection from '../components/FlightSelection';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useState } from 'react';



function Home() {

  const [activeFlightType, setActiveFlightType] = useState('');



  const data = {
    
    activeFlightType,
    setActiveFlightType,
  }
  
  return (
    <MainContext.Provider value={data}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
  
        <div className="w-[1500px] h-[640px] justify-center flex">
          <Background/>
          <div className='w-full h-full grid grid-flow-row grid-cols-2 mx-auto'>
            <FlightSelection/>
            <img
            src={`https://www.thetrainline.com/cms/media/4625/southeastern-javelin-train-st-pancras-intl-retina_2x.jpg`}
            alt='hi'
            className='mx-auto object-cover rounded-3xl h-[600px] my-auto'/>
          </div>
          
        
        </div>
      </LocalizationProvider>
    </MainContext.Provider>
  );
}

export default Home;
