import { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useUserAuth } from "@/services/utils";
import { getSaitDataByUser } from "@/services/GetRequest/getRequest";

const UserGreeting = ({setActiveTab}) => {
  const { user } = useUserAuth();
  const [userData, setUserData] = useState(null);
  const [userName, setUserName] = useState("User");
  const [email, setEmail] = useState("");
  const [userImage, setUserImage] = useState("");

  async function fetchSaitStaffUserInformation() {
    const data = await getSaitDataByUser(user);
    setUserData(data);
    console.log(data);
  }

  useEffect(() => {
    if (!user==false && user){
      fetchSaitStaffUserInformation();
    }
  }, [user]);

  useEffect(() => {
    if(userData){
      setUserName(userData[0].name);
      setEmail(userData[0].email);
      setUserImage(userData[0].imageUrl);
    }
  }, [userData]);

  useEffect(() => {console.log(userImage)}, [userName, email, userImage]);

  return (
    <div className="inline-flex items-center ml-5 rounded-full cursor-pointer" onClick={()=>{setActiveTab("setting")}}>
      <div className="bg-slate-200 relative h-12 w-12 border rounded-full overflow-hidden hover:bg-[#F29F3D]">
        <img
          className="w-full h-full rounded-full"
          src={userImage ? userImage : "/assets/images/UserDefaultSaitStaff.png"}
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
