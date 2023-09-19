import React, { useEffect, useState } from 'react'
import { FirmContext , useContext } from '../../useContext/firmContext'
import { Input, Textarea, User } from '@nextui-org/react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem , Button } from '@nextui-org/react'
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';

const FirmInformation = () => {

  const {firm} = useContext(FirmContext)
  const [firmDescription, setFirmDescription] = useState('biz cok iyi firmayız soyle iyiyiz boyle iyiyizbiz cok iyi firmayız soyle iyiyiz boyle iyiyizbiz cok iyi firmayız soyle iyiyiz boyle iyiyizbiz cok iyi firmayız soyle iyiyiz boyle iyiyizbiz cok iyi firmayız soyle iyiyiz boyle iyiyizbiz cok iyi firmayız soyle iyiyiz boyle iyiyizbiz cok iyi firmayız soyle iyiyiz boyle iyiyizbiz cok iyi firmayız soyle iyiyiz boyle iyiyizbiz cok iyi firmayız soyle iyiyiz boyle iyiyiz');
  
  const [isDescriptionDiffers, setIsDescriptionDiffers] = useState(false);
  const handleDescriptionChange = (e) =>{
    setFirmDescription(e.target.value);
    setIsDescriptionDiffers(true);
    
  }


  return (
    <div className='w-full h-full grid grid-rows-3'>
      <div className=' flex'>
        <div className='h-full w-full shadow-2xl'>
          <div className='w-full flex m-3'>
            <Dropdown>
              <DropdownTrigger>
                <Button 
                   className='w-32 h-32 bg-slate-100'
                >
                  <img alt='logo' src={`https://pbs.twimg.com/profile_images/1633395140336181249/x9T0zKKg_400x400.jpg`} 
                    className='w-full h-full rounded-full'
                  />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new" endContent={<AddIcon/>} color='secondary' className='text-secondary'>Fotoğraf ekle</DropdownItem>
                <DropdownItem key="delete" className="text-danger" color="danger" endContent={<ClearIcon/>}>
                  Fotoğrafı kaldır
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            

            <p className='my-auto ml-8'>{firm.name}</p>
          </div>
          
          <div className='w-full h-48 flex flex-col justify-evenly'>
            <p className='mx-auto'>{firm.email}</p>
            <p className='mx-auto'>{firm.phone}</p>
          </div>
          
        </div>

    
        
      </div>
      <div className='bg-slate-300'>
      <div className='w-full h-full shadow-2xl flex flex-col'>
          <h2 className='mx-auto  text-xl pt-2'>Firma özeti -kullanıcılar görebilir-</h2>
          
          <Textarea
          type='text'
          className='h-full w-full max-h-md mx-auto px-6 pt-3 rounded-xl '
          value={firmDescription}
          label="Firma açıklaması"
          onChange={handleDescriptionChange}
          
          />
          <Button
            disabled = {isDescriptionDiffers === false}
            className={`${isDescriptionDiffers === true ? `healthy-button-secondary`: `disabled-button`} w-96 h-12 mx-auto mb-2`}>Güncelle</Button>
        </div>
      </div>
      <div className='bg-slate-400'>
        dsaşlk
      </div>
    </div>
  )
}

export default FirmInformation