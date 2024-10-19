'use client'
import Image from 'next/image'
import React, { FC } from 'react'

const About: FC = () =>  {
  return (
    <div className='w-[90%] md:w-[80%] relative flex flex-col md:flex-row min-h-screen m-auto justify-between items-center'>
      
      {/* Text Section */}
      <div className='text-gray-400  p-6 md:w-[50%] w-full mb-6 md:mb-0'>
        <h1 className='text-foreground text-5xl font-dancing-script  mb-10 text-red-400'>AT ONE CLICK</h1>
        <p className='text-base md:text-lg lg:text-xl text-justify font-dancing-script'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, vel veritatis. Placeat nisi illum sunt natus nulla eligendi ut minus. Odit fugiat corporis blanditiis labore!
        </p>
      </div>
      
      {/* Image Section */}
      <div className='w-full md:w-[50%] flex justify-center  p-4'>
        <Image src={'/images/girls.png'} height={500} width={500} alt='Image description' className='object-cover' />
      </div>
      
    </div>
  )
}

export default About
