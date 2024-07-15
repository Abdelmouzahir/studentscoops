'use client';
import React, { useState } from "react";
import {  sendMail } from "@/lib/mail";
import EmailTemplate from "@/components/emailTemplate";
import ReactDOMServer from "react-dom/server";


export default function SendRegModal() {
    const [emailName, setEmailName] = useState("");
    const [emailReciever, setEmailReciever] = useState("");

    //send email
   const send = async () => {
    //convert the template to be readable for the user in the email
    const emailBody = ReactDOMServer.renderToString(
      <EmailTemplate name={emailName} url="http://localhost:3000/sait-staff/register" />
  );
    
    await sendMail({
      to: emailReciever,
      name: 'Jalil',
      subject: 'Registration email 📩',
      body: emailBody,
      
    });
   }

    return (
        <div>
            <p className="text-3xl mb-4 text-black">Send Registration Email 📧</p>
            <div>
              <form onSubmit={send} className=" mb-3">
              <div className=" mb-4">
                  <input
                    type="name"
                    placeholder="name"
                    value={emailName}
                    onChange={(e) => setEmailName(e.target.value)}
                    required
                    className="border border-gray-400 py-1 px-2 w-full rounded-md"
                  />
                </div>
                <div className=" mb-1">
                  <input
                    type="email"
                    placeholder="Email"
                    value={emailReciever}
                    onChange={(e) => setEmailReciever(e.target.value)}
                    required
                    className="border border-gray-400 py-1 px-2 w-full rounded-md"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-yellow-500 py-3 text-center text-white mt-3 rounded-md"
                  >
                    Send Email
                  </button>
                </div>
              </form>
            </div>
          </div>
    );
    }