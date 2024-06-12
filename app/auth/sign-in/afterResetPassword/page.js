'use client';
import { useState, Fragment } from 'react';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import { sendPasswordResetEmail } from "firebase/auth";
import Link from 'next/link';

const AfterResetPassword = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  }


return (
  <div
    className="min-h-screen py-40"
    style={{ 
        backgroundImage: "url(/assets/images/passwordCover.jpg)",
        backgroundSize: "cover", // Adjusts the size of the background image
        backgroundPosition: "center", // Centers the background image
        backgroundRepeat: "no-repeat", // Prevents the background image from repeating
          }}
  >
    <Fragment>
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-xl overflow-hidden">
          <div
            className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: "url(/assets/images/emailsent.jpg)" }}
          ></div>
          <div className="w-full lg:w-1/2 py-16 px-12 text-black">
            <h2 className="text-3xl mb-4 text-black">Thank you!</h2>
            <p className="mb-4">An email was sent 📩 to your email address! Please check and reset your password.</p>
            <div>
               <img src="/assets/images/email.jpg" alt="My Image" />
            </div>

            <div>
            </div>
            <div className="mt-4">
              <button
                onClick={handleClick}
                className="w-full bg-yellow-500 py-3 text-center text-white mt-3 rounded-md"
              >
                Back To Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  </div>
);
};

export default AfterResetPassword;