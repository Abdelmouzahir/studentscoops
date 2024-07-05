import { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";

const UserGreeting = () => {
  const [userName, setUserName] = useState("User");
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");
  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    // Ensure this runs only on the client-side
    if (typeof window !== "undefined") {
      const name = sessionStorage.getItem("name") || "User";
      const userEmail = sessionStorage.getItem("email") || "";
      const userUid = sessionStorage.getItem("uid") || "";
      const userImage = sessionStorage.getItem("imageUrl") || "";

      setUserName(name);
      setEmail(userEmail);
      setUid(userUid);
      setUserImage(userImage);
    }
  }, []);

  return (
    <div className="inline-flex items-center ml-5 rounded-full">
      <div className="bg-slate-200 relative h-12 w-12 border rounded-full overflow-hidden hover:bg-[#F29F3D]">
        <img
          className="w-full h-full rounded-full"
          src={userImage}
          alt="User Image"
        />
      </div>
      <h1 className="text-lg text-black-600 font-bold mt-2 ml-2">
        Welcome, {userName}!
      </h1>
      {/*<p>Email: {email}</p>*/}
      {/*<p>UID: {uid}</p>*/}
    </div>
  );
};

export default UserGreeting;
