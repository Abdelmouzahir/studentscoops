import { useEffect, useState } from "react";

const UserGreeting = () => {
  const [userName, setUserName] = useState("User");
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");

  useEffect(() => {
    // Ensure this runs only on the client-side
    if (typeof window !== "undefined") {
      const name = sessionStorage.getItem("name") || "User";
      const userEmail = sessionStorage.getItem("email") || "";
      const userUid = sessionStorage.getItem("uid") || "";
      setUserName(name);
      setEmail(userEmail);
      setUid(userUid);
    }
  }, []);

  return (
    <div>
      <h1 className="text-lg text-black-600 font-bold mt-2 ml-2" >Welcome, {userName}!</h1>
     { /*<p>Email: {email}</p>*/}
     { /*<p>UID: {uid}</p>*/}
    </div>
  );
};

export default UserGreeting;





