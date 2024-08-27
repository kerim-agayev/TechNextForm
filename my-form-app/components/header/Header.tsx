import Image from 'next/image'
import React from 'react'
import { OrbitingCirclesDemo } from '../customCircle/OrbitingImage'
import { NumberTickerDemo } from '../animatedNumber/MagicNumber'


const Header = () => {
  return (
    <div className='flex items-center justify-center h-[100px] md:h-[150px] lg:h-[200px] mt-[70px] md:mt-10 lg:mt-6'>
    <div className='flex items-center justify-center w-full h-full'>
      <OrbitingCirclesDemo />
  
    </div>
  </div>
 
  )
}

export default Header
