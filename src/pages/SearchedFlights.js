import React, { useEffect, useState } from 'react'
import { CircularProgress } from '@nextui-org/react'
import { useParams } from 'react-router-dom';

const SearchedFlights = () => {

  const searchParams = new URLSearchParams(window.location.search); 
  console.log(searchParams.toString());
  const eid = searchParams.get('eid');
  const sid = searchParams.get('sid');
  const monthID = searchParams.get('monthID');
  const year = searchParams.get('year');
  const dayID = searchParams.get('dayID');
  console.log(eid);
  const [isLoading , setIsloading] = useState(true);
  const [currentFlights, setCurrentFlights] = useState([]);
  const [filteredFlights, setFilterefFlights] = useState([]);
  useEffect(() => {
    const searchFlights = async () => {
      try {
        const response = await fetch(`http://localhost:5000/search`, {
          method:'POST',
          headers: {
            'Content-Type' :'application/json'
          },
          body: JSON.stringify({eid , sid ,monthID ,year , dayID})
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



  if(isLoading === true) {
    return (
      <div className='w-[calc(100% - 7rem)] h-[40rem]  flex'>
        <CircularProgress className='mx-auto my-auto' label='Seferler yükleniyor...'/>
      </div>
    )
  }

  return (  
    <div>
      {currentFlights.map((flight) => {
        return (
          <div>
            {flight.flightDate} {flight.flightType} {flight.flightTime}
            {flight.direction.map((direction) => (
              <p>{direction}</p>
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default SearchedFlights