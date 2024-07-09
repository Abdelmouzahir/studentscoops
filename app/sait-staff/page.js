"use client";
import Link from "next/link";
import SDashboard from "./SDashboard";
import RDashboard from "./RDashboard";
import Dash from "./overviewDash";
import Settings from "./settingS";
import { LuLogOut } from "react-icons/lu";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import UserGreeting from "@/Components/UserGreeting";
//import navbar
import SaitStaffNav from "@/Components/SaitStaffNav";
import { CgProfile } from "react-icons/cg";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("home"); // Set default active tab
  const [user, setUser] = useState(null);
  const [hideUserGreeting, setHideUserGreeting] = useState(false);

  const router = useRouter();

  // function to select the tab
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  function handeLogoutClick() {
    // handle logout click
    return router.push("/");
  }

  useEffect(() => {
    if (activeTab === "setting") {
      setHideUserGreeting(true);
    } else {
      setHideUserGreeting(false);
    }
  }, [activeTab]);

  return (
    <div
      className="flex min-h-screen mx-auto"
      style={{
        backgroundImage: "linear-gradient(115deg, #F7F5EB, #F9F5F6)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <SaitStaffNav
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        onTabClick={handleTabClick}
      />
      <div
        className={`flex-1 flex flex-col mx-auto transition-all duration-300 ease-in-out ${
          isCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-3 mt-2 mr-5">
          <div className="grid grid-cols-3 w-full">
            <div
              className={
                hideUserGreeting
                  ? "hidden"
                  : "inline-flex items-center ml-5 rounded-full"
              }
            >
              <UserGreeting setActiveTab={setActiveTab}/>
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
          {/* select the tab based on the click */}
          {activeTab === "student" && <SDashboard />}
          {activeTab === "restaurant" && <RDashboard />}
          {activeTab === "home" && <Dash />}
          {activeTab === "setting" && <Settings />}
        </div>
      </div>
    </div>
  );
}
