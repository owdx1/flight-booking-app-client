import React, { useEffect, useState } from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const ScrollButton = () => {

  const [isVisible , setIsVisible] = useState(false);

  const handleScroll = () => {
    if(window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll' , handleScroll);
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
  }


  return (
    <div
    onClick={scrollToTop}
    className={`fixed
    bottom-6
    right-6
    bg-slate-700
    rounded-full
    text-white
    hover:bg-slate-400
    cursor-pointer
    transition-all
    duration-300
    ease-in-out
    ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <ArrowUpwardIcon style={{width:'50px' , height:'50px'}}/>
    </div>
  )
}

export default ScrollButton