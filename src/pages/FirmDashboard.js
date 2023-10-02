import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MainContext, useContext } from '../useContext/context';
import { CardBody, Spinner, User } from '@nextui-org/react';
import { Card } from '@nextui-org/react';
import { Tabs, Tab } from '@nextui-org/react';
import FirmInformation from '../components/firmComponents/FirmInformation';
import FirmDrivers from '../components/firmComponents/FirmDrivers';
import FirmFlights from '../components/firmComponents/FirmFlights';
import { FirmContext } from '../useContext/firmContext';
import { toast } from 'react-toastify';
import { SERVER_URL } from '../config';



const FirmDashboard = () => {

  const navigate = useNavigate();
  const {handleLogout,isLoggedIn,} = useContext(MainContext);
  const [currentFlights , setCurrentFlights] = useState([]);
  const [firm, setFirm] = useState({});


  useEffect(() => {
    try {
      const firmToken = localStorage.getItem('firmToken');
      const fetchFlights = async () => {
        try {
          const response = await fetch(`${SERVER_URL}/flight/get-flights` ,{
            headers: {
              'authorization' : `Bearer ${firmToken}`
            }
          })
          const responseData = await response.json();
          const message = responseData.message ? responseData.message : '';
          console.log('flight geldi mi' , responseData);
          console.log(responseData.flights);

          if(response.status === 200) setCurrentFlights(responseData.flights);
          if(response.status === 500) toast.warn(message);
          
        } catch (error) {
          console.error(error)
          
        }
      }

      fetchFlights();
      
    } catch (error) {
      console.error(error)
    }


  }, [])




  useEffect(() => {
    try {
      const firmToken = localStorage.getItem('firmToken');

      const fetchProfile = async () => {

        try {
          const response = await fetch(`${SERVER_URL}/firm/dashboard`, {
          headers:{
            Authorization: `Bearer ${firmToken}`
          }
        });

        if(response.status === 401 || response.status === 400){
          handleLogout();
          navigate('/firm-auth')
        }
        if (!response.ok) {
          throw new Error("Error fetching profile");
        }
        const data = await response.json();
        
        console.log('gelen data',data);
        const { firm } = data;
        const newFirmToken = data.firmToken;
        setFirm(firm);
        console.log('current firm' , firm);
        localStorage.setItem('firmToken' , newFirmToken);
  

          
        } catch (error) {
          console.error(error);
        }
        
      } 
      if(firmToken !== null ){
        
        fetchProfile();}

      
    } catch (error) {
      console.error(error);
    }
  
},[])


  const firmData = {
    firm,
    currentFlights
  }

  


  return (
    <FirmContext.Provider value={firmData}>
      <div className="flex w-full flex-col mt-3">
        <Tabs aria-label="Options" className='ml-20'>
          <Tab key="firm" title="Firma" className=''>
            <Card className='firm-tab'>
              <CardBody className='w-full h-full'>
                <FirmInformation/>
              </CardBody>
            </Card>  
          </Tab>
          <Tab key="drivers" title="Şoförler" className=''>
            <Card className='firm-tab'>
              <CardBody>
                <FirmDrivers/>
              </CardBody>
            </Card>  
          </Tab>
          <Tab key="flights" title="Seferler" className=''>
            <Card className='firm-tab'>
              <CardBody>
                <FirmFlights/>
              </CardBody>
            </Card>  
          </Tab>
        </Tabs>
      </div>
      
    </FirmContext.Provider>
  )
}

export default FirmDashboard