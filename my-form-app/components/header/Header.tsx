import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className='flex items-center justify-center h-[100px] md:h-[150px] lg:h-[200px]'>
    <div className='relative w-[150px] h-[100px] md:w-[250px] md:h-[150px] lg:w-[333px] lg:h-[221px]'>
      <Image 
        alt='technext' 
        src={`/logothree.PNG`} 
        layout="fill" 
        objectFit='cover' 
        className='object-cover'
      />
    </div>
  </div>
  )
}

export default Header
