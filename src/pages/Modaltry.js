import React, { useEffect, useState } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

const Modaltry = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [mesaj, setMesaj] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const datan = 'cancan'


  const handlefetch = async () => {
    try {
      setIsloading(true);
      const response = await fetch('http://localhost:5000/' , {
      method:'POST',
      body: JSON.stringify({datan}),
      
      headers:{
        'Content-Type' :'application/json'
      }
      })
      const data = await response.json();
      const {message} = data
      if(response.status === 200) {
        setIsloading(false)
        setMesaj(message);
      }
      
    } catch (error) {
      console.error(error)
    }
    

  }

  useEffect(() => {
    handlefetch()
  }, [])
  if(isLoading) {
    return (
      <p>loading...</p>
    )
  }

  return (

    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p> 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                  dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. 
                  Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. 
                  Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur 
                  proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handlefetch}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {mesaj && <p>{mesaj}</p>}
    </>
  )
}

export default Modaltry