import Head from "next/head";
import Overview from "./overview";
import Table from "./table";
import { useState, useEffect } from "react";
import Add from "./Add";
import Edit from "./Edit";
import {
  getSaitData,
  getSaitDataByUser,
} from "@/services/GetRequest/getRequest";
import { useUserAuth } from "@/services/utils";
import { updateSaitEmployeeStatus } from "@/services/PostRequest/postRequest";
import { getAuth } from "firebase/auth";

export default function Dash() {
  const auth = getAuth();
  const [userData, setUserData] = useState(null);
  const [editEmployeData, setEditEmployeData] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const { user } = useUserAuth();
  const [admin, setAdmin] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  async function fetchData() {
    const data = await getSaitData();
    setAdmin(data);
  }
  async function fetchDataByUser() {
    const data = await getSaitDataByUser(user);
    setUserData(data);
  }

  useEffect(() => {
    if (user) {
      fetchData();
      fetchDataByUser(user);
      console.log("user", auth.currentUser);
    }
  }, [user]);

  useEffect(() => {
    if (admin) {
    }
  }, [admin]);

  const handleEditRequest = (user) => {
    setEditEmployeData(user);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    // Handle delete logic
    setAdmin(admin.filter((user) => user.id !== id));
  };

  const handleChangeStatus = async (id, status) => {
    if (userData[0].role === "Admin" || userData[0].role === "Editor") {
      await updateSaitEmployeeStatus(id, status).then(() => {
        alert("Status for given user has been changed");
        fetchData();
      });
    } else {
      alert("You are not authorized to change the status");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-2">
      <main className="flex flex-col items-start w-full px-20 py-4 ">
        <div className="self-start ml-5">
          <Overview />
        </div>
        <div className="flex flex-col items-center w-full mt-8">
          {isAdding ? (
            <>
              <Add
                admin={admin}
                setAdmins={setAdmin}
                setIsAdding={setIsAdding}
              />
            </>
          ) : (
            <>
              {isEditing ? (
                <>
                  {" "}
                  <Edit
                    employeeData={editEmployeData}
                    setIsEditing={setIsEditing}
                    getData={fetchData}
                    userData={userData}
                  />
                </>
              ) : (
                <>
                  <Table
                    admin={admin}
                    handleEdit={handleEditRequest}
                    handleDelete={handleDelete}
                    setIsAdding={setIsAdding}
                    handleChangeStatus={handleChangeStatus}
                  />
                </>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
