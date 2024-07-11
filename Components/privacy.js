import React from "react";
import {motion} from "framer-motion";
import { TermsOfUse } from "@/app/auth/companyPolicies";


export default function Privacy({ setShow }) {
  return (
    <div className="flex flex-col lg:flex-row w-full h-full bg-white rounded-xl mx-auto shadow-xl overflow-hidden text-black">
      <div className="bg-slate- flex 100 p-3">
      <div className="overflow-y-auto max-h-[400px]">{TermsOfUse.map((item) => (
              <div className="bg-slate-100 p-3">
                <p className="font-semibold">{item.heading}</p>
                <p>{item.description}</p>
              </div>
            ))}</div>
                
      </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShow(false)}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6c5ce7] disabled:pointer-events-none disabled:opacity-50 dark:bg-[#6c5ce7] dark:text-gray-50 dark:hover:bg-[#6c5ce7]/90 dark:focus-visible:ring-[#6c5ce7]"
        >
          Close
        </motion.button>
      </div>
    
  );
}


