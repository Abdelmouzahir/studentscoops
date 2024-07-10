"use client";
import SDashboard from "./SDashboard";
import RDashboard from "./RDashboard";
import Dash from "./overviewDash";
import Settings from "./settingS";
import { LuLogOut } from "react-icons/lu";
import UserGreeting from "@/components/UserGreeting";
import SaitStaffNav from "@/components/SaitStaffNav";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSaitDataByUser } from "@/services/GetRequest/getRequest";
import { useUserAuth } from "@/services/utils";

export default function Page() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [hideUserGreeting, setHideUserGreeting] = useState(false);
  const [userData, setUserData] = useState(null);
  const { user } = useUserAuth(); // Assuming useUserAuth handles user authentication

  const router = useRouter();

  // Function to fetch SAIT staff user information
  async function fetchSaitStaffUserInformation() {
    try {
      const data = await getSaitDataByUser(user);
      setUserData(data);
    } catch (error) {
      console.error("Error fetching SAIT staff user information:", error);
      setUserData(null); // Handle error state if necessary
    }
  }

  useEffect(() => {
    if (user) {
      fetchSaitStaffUserInformation();
    }
  }, [user]); // Fetch data when user state changes

  useEffect(() => {
    console.log("User data updated:", userData);
  }, [userData]); // Log when userData changes

  useEffect(() => {
    // Handle tab visibility based on activeTab state
    if (activeTab === "setting") {
      setHideUserGreeting(true);
    } else {
      setHideUserGreeting(false);
    }
  }, [activeTab]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handeLogoutClick = () => {
    // Handle logout action
    return router.push("/");
  };

  return (
    <div className="flex min-h-screen mx-auto" 
     style={{
        backgroundImage: "linear-gradient(115deg, #F7F5EB, #F9F5F6)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      <SaitStaffNav
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        onTabClick={handleTabClick}
      />
      {userData ? (
        <div
          className={`flex-1 flex flex-col mx-auto transition-all duration-300 ease-in-out ${
            isCollapsed ? "ml-20" : "ml-64"
          }`}
        >
          <div className="flex justify-between items-center px-4 py-3 mt-2 mr-5">
            <div className="grid grid-cols-3 w-full">
              <div
                className={
                  hideUserGreeting ? "hidden" : "inline-flex items-center ml-5 rounded-full"
                }
              >
                <UserGreeting setActiveTab={setActiveTab} data={userData} />
              </div>
              <div className="col-start-3 grid w-full justify-items-end">
                <button
                  onClick={handeLogoutClick}
                  className=" w-1/2 inline-flex h-10 items-center justify-center rounded-md bg-gray-600 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-[#F29F3D] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6c5ce7] disabled:pointer-events-none disabled:opacity-50 dark:bg-[#6c5ce7] dark:text-gray-50 dark:hover:bg-[#6c5ce7]/90 dark:focus-visible:ring-[#6c5ce7]"
                >
                  <LuLogOut className="mr-2 h-5 w-5" />
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 p-6">
            {/* Render different components based on activeTab */}
            {activeTab === "student" && <SDashboard />}
            {activeTab === "restaurant" && <RDashboard />}
            {activeTab === "home" && <Dash />}
            {activeTab === "setting" && (
              <Settings data={userData} getUserData={fetchSaitStaffUserInformation} />
            )}
          </div>
        </div>
      ) : (
        <div className="w-full text-center grid items-center h-screen">
          <p className="text-3xl font-bold animate-pulse">Loading...</p>
        </div>
      )}
    </div>
  );
}
