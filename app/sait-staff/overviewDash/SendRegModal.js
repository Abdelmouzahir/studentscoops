'use client';
import React, { useState } from "react";
import { sendMail } from "@/lib/mail";
import EmailTemplate from "@/components/emailTemplate";
import ReactDOMServer from "react-dom/server";

export default function SendRegModal({onClose}) {
    const [emailName, setEmailName] = useState("");
    const [emailReciever, setEmailReciever] = useState("");

    const handleInputChange = (setter) => (event) => {
        setter(event.target.value);
    };

    //send email
    const send = async (event) => {
        event.preventDefault(); // Prevent default form submission
        //convert the template to be readable for the user in the email
        const emailBody = ReactDOMServer.renderToString(
            <EmailTemplate name={emailName} url="http://localhost:3000/sait-staff/register" />
        );

        try {
            await sendMail({
                to: emailReciever,
                name: 'Jalil',
                subject: 'Registration email 📩',
                body: emailBody,
            });
            alert("Email sent successfully!");
        } catch (error) {
            console.error("Error sending email:", error);
            alert("Failed to send email. Please try again.");
        }
    };

    return (
        <div>
            <p className="text-3xl mb-4 text-black">Send Registration Email 📧</p>
            <div>
                <form onSubmit={send} className="mb-3">
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Name"
                            value={emailName}
                            onChange={handleInputChange(setEmailName)}
                            required
                            className="border border-gray-400 py-1 px-2 w-full rounded-md"
                        />
                    </div>
                    <div className="mb-1">
                        <input
                            type="email"
                            placeholder="Email"
                            value={emailReciever}
                            onChange={handleInputChange(setEmailReciever)}
                            required
                            className="border border-gray-400 py-1 px-2 w-full rounded-md"
                        />
                    </div>
                    <div  className="flex mt-3 justify-between space-x-3">
                        <button
                            type="submit"
                            className="bg-orange-400 hover:bg-orange-600 py-2  px-4 text-white rounded-md focus:outline-none"
                        >
                            Send Email
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-red-400 hover:bg-red-600 py-2 px-4 text-white rounded-md focus:outline-none"
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
