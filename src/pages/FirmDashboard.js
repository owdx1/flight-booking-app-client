import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MainContext, useContext } from '../useContext/context';
import { CardBody, User } from '@nextui-org/react';
import { Card } from '@nextui-org/react';
import { Tabs, Tab } from '@nextui-org/react';
import FirmInformation from '../components/firmComponents/FirmInformation';
import FirmDrivers from '../components/firmComponents/FirmDrivers';
import FirmFlights from '../components/firmComponents/FirmFlights';
import { firmContext } from '../useContext/firmContext';



const FirmDashboard = () => {

  const navigate = useNavigate();
  const {handleLogout,isLoggedIn} = useContext(MainContext);
  const [firm, setFirm] = useState({});
  useEffect(() => {
    try {
      const firmToken = localStorage.getItem('firmToken');

      const fetchProfile = async () => {

        try {
          const response = await fetch(`http://localhost:5000/firm/dashboard`, {
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

      if(firmToken !== null ){fetchProfile();}
      
    } catch (error) {
      console.error(error);
    }
  
},[])


  const firmData = {
    firm
  }

  


  return (
    <firmContext.Provider value={firmData}>
      <div className="flex w-full flex-col mt-3">
        <Tabs aria-label="Options" className='ml-20'>
          <Tab key="firm" title="Firma" className='px-20'>
            <Card className='firm-tab'>
              <CardBody className='w-full h-full'>
                <FirmInformation/>
              </CardBody>
            </Card>  
          </Tab>
          <Tab key="drivers" title="Şoförler" className='px-20'>
            <Card className='firm-tab'>
              <CardBody>
                <FirmDrivers/>
              </CardBody>
            </Card>  
          </Tab>
          <Tab key="flights" title="Seferler" className='px-20'>
            <Card className='firm-tab'>
              <CardBody>
                <FirmFlights/>
              </CardBody>
            </Card>  
          </Tab>
        </Tabs>
      </div>
    </firmContext.Provider>
  )
}

export default FirmDashboard