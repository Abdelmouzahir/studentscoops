import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa6'

const Footer = () => {
  return (
    <div className='pt-[5rem] pb-[3rem] bg-orange-400'>
      <div className='w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 
          gap-[3rem] items-start pb-[2rem] border-b-2 border-white border-opacity-10'>
        {/* footer section 1*/}
        <div>
          <h1 className='text-[24px] text-white mb-[1rem] font-bold uppercase'> StudentScoops </h1>
          <p className=' text-[14px] text-white text-opacity-70' >
            The world first and largest specialized talent solutions website
            connects opportunities at great companies with highly skilled job seekers
          </p>
          {/* social media icons*/}
          <div className='flex items-center space-x-3 mt-[1.5rem]'>
            <div className='w-[2.4rem] h-[2.4rem] bg-blue-600 rounded-full flex items-center
               justify-center flex-col'>
              <FaFacebook className='text-white' />
            </div>
            <div className='w-[2.4rem] h-[2.4rem] bg-sky-400 rounded-full flex items-center
               justify-center flex-col'>
              <FaTwitter className='text-white' />
            </div>
            <div className='w-[2.4rem] h-[2.4rem] bg-red-600 rounded-full flex items-center
               justify-center flex-col'>
              <FaYoutube className='text-white' />
            </div>
            <div className='w-[2.4rem] h-[2.4rem] bg-red-400 rounded-full flex items-center
               justify-center flex-col'>
              <FaInstagram className='text-white' />
            </div>
          </div>
        </div>
        {/* 2nd part of footer*/}
        <div>
          <h1 className=' text-[22px] w-fit text-white font-semibold mb-[1.5rem]' >About US</h1>
          <p className=' text-[15px] text-white w-fit hover:text-yellow-300 cursor-pointer text-opacity-70 mb-[0.7rem] ' >Job</p>
          <p className=' text-[15px] text-white w-fit hover:text-yellow-300 cursor-pointer text-opacity-70 mb-[0.7rem] ' >Privacy</p>
          <p className=' text-[15px] text-white w-fit hover:text-yellow-300 cursor-pointer text-opacity-70 mb-[0.7rem] ' >Policy</p>
          <p className=' text-[15px] text-white w-fit hover:text-yellow-300 cursor-pointer text-opacity-70 mb-[0.7rem] ' >Application</p>
          <p className=' text-[15px] text-white w-fit hover:text-yellow-300 cursor-pointer text-opacity-70 mb-[0.7rem] ' >Candidates</p>
        </div>
        {/* 3nd part of footer*/}
        <div>
          <h1 className=' text-[22px] w-fit text-white font-semibold mb-[1.5rem]' >Quick Links</h1>
          <p className=' text-[15px] text-white w-fit hover:text-yellow-300 cursor-pointer text-opacity-70 mb-[0.7rem] ' >All Jobs</p>
          <p className=' text-[15px] text-white w-fit hover:text-yellow-300 cursor-pointer text-opacity-70 mb-[0.7rem] ' >How to Apply</p>
          <p className=' text-[15px] text-white w-fit hover:text-yellow-300 cursor-pointer text-opacity-70 mb-[0.7rem] ' >Job Fair</p>
          <p className=' text-[15px] text-white w-fit hover:text-yellow-300 cursor-pointer text-opacity-70 mb-[0.7rem] ' >Resume</p>
        </div>
        {/* 4th part of footer*/}
        <div>
          <h1 className=' text-[22px] w-fit text-white font-semibold mb-[1.5rem]' >Get In Touch </h1>
          <p className=' text-[15px] text-white w-fit hover:text-yellow-300 cursor-pointer text-opacity-70 mb-[0.7rem] ' >+0123456789</p>
          <p className=' text-[15px] text-white w-fit hover:text-yellow-300 cursor-pointer text-opacity-70 mb-[0.7rem] ' >example@eample.com</p>
          <p className=' text-[15px] text-white w-fit hover:text-yellow-300 cursor-pointer text-opacity-70 mb-[0.7rem] ' >Student Scoops</p>
        </div>
      </div>
      <h1 className=' mt-[2rem] text-[14px] w-[80%] mx-auto text-white opacity-70'>COPYRIGHT BY STUDENT SCOOPS © 2024</h1>
    </div>
  )
}

export default Footer
