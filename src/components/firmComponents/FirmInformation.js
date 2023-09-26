import React, { useEffect, useState } from 'react'
import { FirmContext , useContext } from '../../useContext/firmContext'
import { Chip, Input, Textarea, User } from '@nextui-org/react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem , Button } from '@nextui-org/react'
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CallIcon from '@mui/icons-material/Call';
import CurrencyLiraIcon from '@mui/icons-material/CurrencyLira';

const FirmInformation = () => {

  const {firm} = useContext(FirmContext)
  const [firmDescription, setFirmDescription] = useState('biz cok iyi firmayız soyle iyiyiz boyle iyiyizbiz cok iyi firmayız soyle iyiyiz boyle iyiyizbiz cok iyi firmayız soyle iyiyiz boyle iyiyizbiz cok iyi firmayız soyle iyiyiz boyle iyiyizbiz cok iyi firmayız soyle iyiyiz boyle iyiyizbiz cok iyi firmayız soyle iyiyiz boyle iyiyizbiz cok iyi firmayız soyle iyiyiz boyle iyiyizbiz cok iyi firmayız soyle iyiyiz boyle iyiyizbiz cok iyi firmayız soyle iyiyiz boyle iyiyiz');
  
  const [isDescriptionDiffers, setIsDescriptionDiffers] = useState(false);
  const handleDescriptionChange = (e) =>{
    setFirmDescription(e.target.value);
    setIsDescriptionDiffers(true);
    
  }


  return (
    <div className='w-full h-full grid grid-cols-3'>
      <div className='flex'>
        <div className='h-full w-full mx-auto shadow-sm'>
          <div className='w-full h-48 flex flex-col bg-white rounded-tl-[90px] rounded-tr-[90px] rounded'>
            <Dropdown>
                <DropdownTrigger>
                  <Button 
                    className='w-32 h-24 bg-white mx-auto my-auto'
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
              <div className='flex w-full h-12 border-b-3'>
              <Chip endContent={<CheckIcon/>} className='mx-auto my-auto border-none w-full' variant='light' style={{fontSize:'24px'}}>{firm.name}</Chip>
              </div>
          </div>
          <div className='flex w-full h-32 justify-evenly bg-white border-b-3'>
            <div className='flex flex-col my-auto'>
              <p className='mx-auto font-medium text-2xl'>200</p>
              <p className='mx-auto'>Toplam Yolcu</p>
            </div>
            <div className='flex flex-col my-auto'>
              <Chip endContent={<CurrencyLiraIcon/>} variant='light' className='border-none mx-auto text-2xl font-semibold'>89.000</Chip>
              <p className='mx-auto'>Toplam gelir</p>
            </div>
            <div className='flex flex-col my-auto'>
              <p className='mx-auto text-2xl font-semibold'>54</p>
              <p className='mx-auto'>Toplam Sefer</p>
            </div>
          </div>
          <div className='w-full h-48 flex flex-col bg-white rounded-sm gap-2'>
            <Chip className='text-lg mr-2 mt-2' startContent={<AlternateEmailIcon style={{fontSize:'30px'}}/>} variant='light'>{firm.email}</Chip>
            <Chip className='text-lg mr-2' startContent={<CallIcon/>} variant='light'>{firm.phone}</Chip>
          </div>
          
        </div>

    
        
      </div>
      <div>
      <div className='w-full h-full shadow-sm flex flex-col'>
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
      <div>
        dsaşlk
      </div>
    </div>
  )
}

export default FirmInformation