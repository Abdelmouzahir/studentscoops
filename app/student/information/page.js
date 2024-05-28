'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserAuth } from '@/services/utils';
import { addUserInformation, addOtherUserInformation } from '@/services/addInformation';

const PersonalInfo = () => {
  const { user } = useUserAuth();
  const [fname, setfName] = useState('');
  const [lname, setlName] = useState('');
  const [address, setAddress] = useState('');
  const [unitnum, setUnitnum] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [postalcoderr, setpostalcoderr] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (user !== null) {
      console.log("User ID in page:", user); // Log the user ID
    } if (user === false){
      console.log("User not authenticated");
      // Redirect to login if not authenticated
      router.push('/student');
    }
  }, [user,router]);

  const handleSubmit = () => {
    const userInformation = { name: fname, lastName: lname, address: address, unitNum: unitnum, postalCode: postalCode, phoneNumber: phoneNumber };
    setError('');
    setpostalcoderr('');

    if (!fname || !lname || !address || !postalCode || !phoneNumber) {
      setError('All fields are required.');
      return;
    }

    // Check if postal code is Canadian 
    if (!postalCode.match(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/)) {
      setpostalcoderr('Postal code not Valid!');
      return;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      setError('Invalid phone number. Please enter a 10-digit phone number.');
      return;
    }

    // Save the personal info to a database or state management solution
    // For demonstration, we will just log the data
    console.log('First Name:', fname);
    console.log('Last Name:', lname);
    console.log('Address:', address);
    console.log('Unit Number:', unitnum);
    console.log('Postal Code:', postalCode);
    console.log('Phone Number:', phoneNumber);
    addUserInformation(user, userInformation);
    addOtherUserInformation(user, userInformation);
    router.push("/student/homepage");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Personal Information</h1>
        <input 
          type="text" 
          placeholder="First Name" 
          value={fname} 
          onChange={(e) => setfName(e.target.value)} 
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <input 
          type="text" 
          placeholder="Last Name" 
          value={lname} 
          onChange={(e) => setlName(e.target.value)} 
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <input 
          type="text" 
          placeholder="Address" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <input 
          type="text" 
          placeholder="Unit Number" 
          value={unitnum} 
          onChange={(e) => setUnitnum(e.target.value)} 
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <input 
          type="text" 
          placeholder="Postal Code" 
          value={postalCode} 
          onChange={(e) => setPostalCode(e.target.value)} 
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        {postalcoderr && <div className="text-red-500 text-sm mb-4">{postalcoderr}</div>}
        <input 
          type="text" 
          placeholder="Phone Number" 
          value={phoneNumber} 
          onChange={(e) => setPhoneNumber(e.target.value)} 
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <button 
          onClick={handleSubmit}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PersonalInfo;