'use client'
// components/UserGreeting.js

const UserGreeting = () => {
    const userDisplayName = sessionStorage.getItem("displayName") || "User";

    console.log(userDisplayName)
  
    return (
      <h1 className="text-lg text-black-600 font-bold mt-2 ml-2">
        Hi! {userDisplayName}
      </h1>
    );
  };
  
  export default UserGreeting;
  