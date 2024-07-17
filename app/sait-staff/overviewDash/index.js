import Head from "next/head";
import Overview from "./overview";
import Table from "./table";
import { useState, useEffect } from "react";
import Add from "./Add";
import Edit from "./Edit";
import { useUserAuth } from "@/services/utils";
import { updateSaitEmployeeStatus, deleteSaitUserFromAdmin } from "@/services/PostRequest/postRequest";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { doc } from "firebase/firestore";

export default function Dash({ fetchData, fetchDataByUser, data, adminData, students, restaurants }) {
  const auth = getAuth();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [editEmployeData, setEditEmployeData] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const { user } = useUserAuth();
  const [admin, setAdmin] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (adminData) {
      setAdmin(adminData);
    }
    if (data) {
      setUserData(data);
    }
  }, [adminData]);

  useEffect(() => {
    if (user == false) {
      router.push("/");
    }
  }, [admin]);

  useEffect(() => {
    if (user) {
      fetchData();
      fetchDataByUser();
      console.log("user", auth.currentUser);
    }
    if (user == false) {
      router.push("/");
    }
  }, [user]);

  const handleEditRequest = (user) => {
    setEditEmployeData(user);
    setIsEditing(true);
  };


  //handle to delte user form auth,storage and firestore
  const handleDelete = async (uid, docId) => {
    // Handle delete logic
    if (uid && docId && userData) {
      if (user === uid) {
        alert("You can't delete your own account");
        return;
      }
      console.log('role: ',userData[0].role);
      if (userData[0].role === "Admin" || userData[0].role === "Editor") {
        try {
          const res = await fetch("api/deleteUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({uid:uid}),
          });

          const data = await res.json();
          console.log("data: ", data);
          if (data.message === "User has been deleted") {
            await deleteSaitUserFromAdmin(docId,uid).then(()=>{
              alert("User has been deleted");
            })
          }
        } catch (error) {
          console.error("An error occurred:", error);
          alert("An error occurred while deleting the user.");
        }
      }
    }
  };


  //to change the status of the user
  const handleChangeStatus = async (id, status, uid) => {
    if (user === uid) {
      alert("You can't change your own status");
      return;
    }

    if (userData[0].role === "Admin" || userData[0].role === "Editor") {
      try {
        const res = await fetch("/api/isDisableUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ condition: status, uid: uid }),
        });

        const data = await res.json();
        console.log("data: ", data);

        if (data.message === "User status has been updated") {
          await updateSaitEmployeeStatus(id, status);
          alert("Status for the given user has been changed");
          fetchData();
        } else if (
          data.error ===
          "There is no user record corresponding to the provided identifier."
        ) {
          alert(
            "Error: No user record corresponding to the provided identifier."
          );
        } else {
          alert("An unexpected error occurred.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert("An error occurred while changing the status.");
      }
    } else {
      alert("You are not authorized to change the status");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-2">
      <main className="flex flex-col items-start w-full px-20 py-4 ">
        <div className="self-start ml-5">
          <Overview studentData={students} restaurantData={restaurants}/>
        </div>
        <div className="flex flex-col items-center w-full mt-8">
          {isAdding ? (
            <>
              <Add
                admin={admin}
                setAdmins={setAdmin}
                setIsAdding={setIsAdding}
                fetchDataByUser={fetchData}
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
