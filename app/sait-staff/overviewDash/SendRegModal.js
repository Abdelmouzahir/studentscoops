'use client';
import React, { useState } from "react";
import { BiSolidCommentError } from "react-icons/bi";
import {  sendMail } from "@/lib/mail";
import EmailTemplate from "@/components/emailTemplate";
import ReactDOMServer from "react-dom/server";


export default function SendRegModal() {
    const [emailName, setEmailName] = useState("");

    //send email
   const send = async () => {
    //convert the template to be readable for the user in the email
    const emailBody = ReactDOMServer.renderToString(
      <EmailTemplate name={emailName} url="http://localhost:3000/sait-staff/register" />
  );
    
    await sendMail({
      to: 'jalil.mouzahir@gmail.com',
      name: 'Jalil',
      subject: 'Registration email 📩',
      body: emailBody,
      
    });
   }

    return (
        <div>
            <p className="text-3xl mb-4 text-black">Send Registration Email 📧</p>
            <div>
              <form onSubmit={handleForgotPassword}>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border border-gray-400 py-1 px-2 w-full rounded-md"
                  />
                  {emailError && (
                    <div className="text-red-500 text-sm mb-4 flex">
                      <BiSolidCommentError className="mt-1 mr-2" />
                      {emailError}
                    </div>
                  )}
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-yellow-500 py-3 text-center text-white mt-3 rounded-md"
                  >
                    Email Me
                  </button>
                </div>
              </form>
            </div>
          </div>
    );
    }