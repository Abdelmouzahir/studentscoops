'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserAuth } from '@/services/utils';
import { addUserInformation, addOtherUserInformation } from '@/services/PostRequest/postRequest';
import { formatPhoneNumber, formatPostalCode } from "@/Constant/formated";

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
  const [showFullMessage, setShowFullMessage] = useState(false);
  const [acceptConditions, setAcceptConditions] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user !== null) {
      console.log("User ID in page:", user); // Log the user ID
    } if (user === false){
      console.log("User not authenticated");
      // Redirect to login if not authenticated
      router.push('/auth/sign-in');
    }
  }, [user,router]);

  const handlePostalCodeChange = (e) => {
    setPostalCode(formatPostalCode(e.target.value));
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(formatPhoneNumber(e.target.value));
  };

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
    // router.push("/student/homepage");
  };

  return (

    <div className="min-h-screen py-40" style={{ backgroundImage: 'linear-gradient(115deg, #dfc42f, #faf7df)' }}>
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-xl overflow-hidden text-black">
          <div
            className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: 'url(/assets/images/food.png)' }}
          >
            <h1 className="text-white text-3xl mb-3">Welcome</h1>
            <div>
              <p className="text-white">
                {showFullMessage ? (
                  <>
                    Student Scoop initiative aims to address the challenges faced by students with low income by providing them access to discounted food and grocery items through a convenient and user-friendly platform.{' '}
                    <a href="#" className="text-yellow-500 font-semibold" onClick={() => setShowFullMessage(false)}>Show less</a>
                  </>
                ) : (
                  <>
                    Student Scoop initiative aims to address the challenges faced by students with...{' '}
                    <a href="#" className="text-yellow-500 font-semibold" onClick={() => setShowFullMessage(true)}>Learn more</a>
                  </>
                )}
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 py-16 px-12">
            <h2 className="text-3xl mb-4 text-black">Personal Information</h2>
            <form>
              <div className="grid grid-cols-2 gap-5">
                <input 
                  type="text" 
                  placeholder="First Name" 
                  value={fname} 
                  onChange={(e) => setfName(e.target.value)} 
                  className="border border-gray-400 py-1 px-2 w-full rounded-md"
                />
                <input 
                  type="text" 
                  placeholder="Last Name" 
                  value={lname} 
                  onChange={(e) => setlName(e.target.value)} 
                  className="border border-gray-400 py-1 px-2 w-full rounded-md"
                />
              </div>
              <div className="mt-5">
                <input 
                  type="text" 
                  placeholder="Address" 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} 
                  className="border border-gray-400 py-1 px-2 w-full rounded-md"
                />
              </div>
              <div className="mt-5">
                <input 
                  type="text" 
                  placeholder="Unit Number" 
                  value={unitnum} 
                  onChange={(e) => setUnitnum(e.target.value)} 
                  className="border border-gray-400 py-1 px-2 w-full rounded-md"
                />
              </div>
              <div className="mt-5">
                <input 
                  type="text" 
                  placeholder="Postal Code" 
                  value={postalCode} 
                  onChange={handlePostalCodeChange} 
                  className="border border-gray-400 py-1 px-2 w-full rounded-md"
                />
              </div>
              {postalcoderr && <div className="text-red-500 text-sm mb-4">{postalcoderr}</div>}
              <div className="mt-5">
                <input 
                  type="text" 
                  placeholder="Phone Number" 
                  value={phoneNumber} 
                  maxLength={12}
                  onChange={handlePhoneNumberChange} 
                  className="border border-gray-400 py-1 px-2 w-full rounded-md"
                />
              </div>
              {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
              <div className="mt-5">
                <input type="checkbox" className="cursor-pointer border border-gray-400 rounded-md" onClick={()=>{setAcceptConditions(!acceptConditions)}}/>
                <span className='ml-2 text-black'>
                  I accept the <a href="#" className="text-yellow-500 font-semibold">Terms of Use</a> & <a href="#" className="text-yellow-500 font-semibold">Privacy Policy</a>
                </span>
                {acceptConditions ? <button 
                  type="button"
                  onClick={handleSubmit}
                  className="w-full bg-yellow-500 py-3 text-center text-white mt-3 rounded-md"
                >
                  Submit
                </button>:<button 
                  type="button"
                  className="w-full bg-yellow-200 py-3 text-center text-white mt-3 rounded-md cursor-default"
                >
                  Submit
                </button>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
