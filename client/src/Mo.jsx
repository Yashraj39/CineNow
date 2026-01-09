import React from 'react'

export default function mo() {
  return (
    <>
      <div className='flex md:flex-row flex-col '>
        <div className='flex justify-center items-center mb-10'>
          <img className='md:w-72 sm:w-56 w-40 h-auto rounded-4xl md:ml-20 mt-10 ml-0 ' src="./images/sos2.jpg" alt="" />
        </div>
        <div className='flex flex-col justify-center md:items-start md:ml-32 md:px-0 px-10 gap-5 w-full'>
          <p className='md:text-3xl text-2xl font-bold'>Mahavatar Narsimha</p>
          <p className='font-semibold flex md:flex-row flex-col md:gap-7 gap-5'>
            <p>• 2h 41m </p>
            <p>• Historical, Drama</p>
            <p>• UA16+</p>
            <p>• 14 Feb, 2025</p>
          </p>
          <p className='font-semibold'>About the movie :</p>
          
          <button className="btn btn-error"><p className='text-amber-50'>Book Now</p></button>
        </div>
        
      </div>
      <p className='pl-10 md:mt-0 mt-10 pr-10'>Deva is a high-octane action thriller featuring Shahid Kapoor in a never-before-seen avatar. The movie follows his journey as a rogue agent fighting against a powerful underground syndicate.</p>
    </>
  )
}
