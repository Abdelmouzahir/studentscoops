'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const PersonalInfo = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    setError('');

    if (!name || !address || !phoneNumber) {
      setError('All fields are required.');
      return;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      setError('Invalid phone number. Please enter a 10-digit phone number.');
      return;
    }

    // Save the personal info to a database or state management solution
    // For demonstration, we will just log the data
    console.log('Name:', name);
    console.log('Address:', address);
    console.log('Phone Number:', phoneNumber);

    // Redirect to another page if needed
    router.push("/student/homepage");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Personal Information</h1>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
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
