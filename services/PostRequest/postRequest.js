import { db, storage } from "@/app/firebase/config";
import {
  collection,
  addDoc,
  where,
  query,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
  listAll,
  deleteObject,
} from "firebase/storage";
import { deleteUser } from "firebase/auth";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

//<<<-----------------------------------------------------------------Sait-staff------------------------------------------------------------------>>>>

//--------------------------------------------------------post admin data for sait staff home page---------------------------------------------------------

// to update status of sait staff employee
export async function updateSaitEmployeeStatus(id, active) {
  try {
    const docRef = doc(db, "saitStaff", id);
    await updateDoc(docRef, {
      active: !active,
    });
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

// to delete sait staff data from database and athentication
export async function deleteSaitUser(currentUser, docId) {
  const id = docId;
  const uid = currentUser.uid;
  if (currentUser) {
    try {
      // Step 1: Re-authenticate user if necessary
      await deleteUser(currentUser)
        .then(async () => {
          // Step 2: Delete user document from Firestore
          await deleteDoc(doc(db, "saitStaff", id));
        })
        .then(async () => {
          const storage = getStorage();
          const folderRef = ref(storage, `Saitstaff/${uid}`);

          const deleteFolder = async (folderRef) => {
            const res = await listAll(folderRef);
            for (const itemRef of res.items) {
              await deleteObject(itemRef);
            }

            for (const subfolderRef of res.prefixes) {
              await deleteFolder(subfolderRef);
            }
          };

          await deleteFolder(folderRef);
          alert("Your account has been deleted successfully!");
        });
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        alert(
          "Please log out first and then proceed with the account deletion."
        );
      }
    }
  } else {
    console.log("No current user found");
  }
}

//function to delete sait staff user from admin
export async function deleteSaitUserFromAdmin(docId, uid) {
  try {
    await deleteDoc(doc(db, "saitStaff", docId)).then(async () => {
      //delete user folder from storage
      const storage = getStorage();
      const folderRef = ref(storage, `Saitstaff/${uid}`);

      const deleteFolder = async (folderRef) => {
        const res = await listAll(folderRef);
        for (const itemRef of res.items) {
          await deleteObject(itemRef);
        }

        for (const subfolderRef of res.prefixes) {
          await deleteFolder(subfolderRef);
        }
      };

      await deleteFolder(folderRef);
    });
  } catch (error) {
    console.error("Error while deleting user:", error);
  }
}

//--------------------------------------------------------post students data for sait staff home page---------------------------------------------------------

//To update the student data of sait staff
export async function updateStudent(id, prop) {
  try {
    const docRef = doc(db, "students", id);
    await updateDoc(docRef, prop);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

// to update student status by sait staff
export async function updateSaitStudentStatus(id, active) {
  try {
    const docRef = doc(db, "students", id);
    await updateDoc(docRef, {
      active: !active,
    });
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

//function to delete sait staff student from admin
export async function deleteStudentsFromAdmin(docId, uid) {
  try {
    await deleteDoc(doc(db, "students", docId)).then(async () => {
      //delete user folder from storage
      const storage = getStorage();
      const folderRef = ref(storage, `students/${uid}`);

      const deleteFolder = async (folderRef) => {
        const res = await listAll(folderRef);
        for (const itemRef of res.items) {
          await deleteObject(itemRef);
        }

        for (const subfolderRef of res.prefixes) {
          await deleteFolder(subfolderRef);
        }
      };

      await deleteFolder(folderRef);
    });
  } catch (error) {
    console.error("Error while deleting user:", error);
  }
}

//--------------------------------------------------------post restaurants data for sait staff home page---------------------------------------------------------

// to update restaurant status by sait staff
export async function updateSaitRestaurantStatus(id, active) {
  try {
    const docRef = doc(db, "restaurants", id);
    await updateDoc(docRef, {
      active: !active,
    });
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

//function to delete restaurant user from admin
export async function deleteRestaurantsFromAdmin(docId, uid) {
  try {
    await deleteDoc(doc(db, "restaurants", docId)).then(async () => {
      //delete user folder from storage
      const storage = getStorage();
      const folderRef = ref(storage, `restaurants/${uid}`);

      const deleteFolder = async (folderRef) => {
        const res = await listAll(folderRef);
        for (const itemRef of res.items) {
          await deleteObject(itemRef);
        }

        for (const subfolderRef of res.prefixes) {
          await deleteFolder(subfolderRef);
        }
      };

      await deleteFolder(folderRef);
    });
  } catch (error) {
    console.error("Error while deleting user:", error);
  }
}

//To update the restaurant data of sait staff
export async function updateRestaurant(id, prop) {
  try {
    const docRef = doc(db, "restaurants", id);
    await updateDoc(docRef, prop);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

//<<<-----------------------------------------------------------------Restaurant------------------------------------------------------------------>>>>

// to add restaurant menu in database
export async function addRestaurantMenu(
  user,
  name,
  price,
  description,
  image,
) {
  const storageRef = ref(storage, `menu/${user}/${image.name}`);
  const uploadTask = uploadBytesResumable(storageRef, image);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const fileProgress =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${fileProgress}% done`);
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      console.error("Upload failed", error);
    },
    async () => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

      try {
        // Query to find the restaurant document with the matching userId
        await addDoc(collection(db, "restaurant_menu"), {
          uid: user,
          name,
          price,
          description,
          status: "Available",
          imageUrl: downloadURL,
          createdAt: new Date(),
        });
        console.log("Menu item successfully added!");
      } catch (error) {
        console.error("Error writing document: ", error);
      }
    }
  );
}

// to delete sait staff data from database and athentication
export async function deleteRestaurantUserByOwner(currentUser, docId) {
  const id = docId;
  const uid = currentUser.uid;
  if (currentUser) {
    try {
      // Step 1: Re-authenticate user if necessary
      await deleteUser(currentUser)
        .then(async () => {
          // Step 2: Delete user document from Firestore
          await deleteDoc(doc(db, "restaurants", id));
          const q = query(
            collection(db, "restaurant_menu"),
            where("uid", "==", uid)
          );

          // Get the documents matching the query
          const querySnapshot = await getDocs(q);

          // Loop through each document and delete it
          const deletePromises = querySnapshot.docs.map(async (document) => {
            await deleteDoc(doc(db, "restaurant_menu", document.id));
          });

          // Wait for all deletions to complete
          await Promise.all(deletePromises);
        })
        .then(async () => {
          const storage = getStorage();
          const folderRef = ref(storage, `restaurants/${uid}`);

          const deleteFolder = async (folderRef) => {
            const res = await listAll(folderRef);
            for (const itemRef of res.items) {
              await deleteObject(itemRef);
            }

            for (const subfolderRef of res.prefixes) {
              await deleteFolder(subfolderRef);
            }
          };

          await deleteFolder(folderRef);
          alert("Your account has been deleted successfully!");
        }).then(async () => {
          const storage = getStorage();
          const folderRef = ref(storage, `menu/${uid}`);

          const deleteFolder = async (folderRef) => {
            const res = await listAll(folderRef);
            for (const itemRef of res.items) {
              await deleteObject(itemRef);
            }

            for (const subfolderRef of res.prefixes) {
              await deleteFolder(subfolderRef);
            }
          };

          await deleteFolder(folderRef);
          alert("Your account has been deleted successfully!");
        });
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        alert(
          "Please log out first and then proceed with the account deletion."
        );
      }
    }
  } else {
    console.log("No current user found");
  }
}

// to add student information in database
export async function addStudentInformation(userId, userInformation, email) {
  const studentInformation = {
    studentId: userId,
    email: email,
    ...userInformation,
  };
  try {
    const docRef = await addDoc(collection(db, "students"), studentInformation);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
//restaurants

// to add restaurant information in database
export async function addRestaurantInformation(
  user,
  name,
  location,
  mobileNumber,
  postalCode,
  image,
  logo
) {
  const storageRef = ref(storage, `restaurants/${image.name}`);
  const uploadTask = uploadBytesResumable(storageRef, image);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const fileProgress =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${fileProgress}% done`);
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      console.error("Upload failed", error);
    },
    async () => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

      try {
        await addDoc(collection(db, "restaurants"), {
          userId: user,
          name,
          location,
          mobileNumber,
          postalCode,
          imageUrl: downloadURL,
          createdAt: new Date(),
          logo,
        });
        console.log("Document successfully written!");
      } catch (error) {
        console.error("Error writing document: ", error);
      }
    }
  );
}


export default async function addStudentEmailStatus(prop) {
  let { email, active } = prop;
  let data = { studentEmail: email, active: active };
  try {
    const q = query(collection(db, "student_email"));
    const querySnapshot = await getDocs(q);
    const userItems = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    const studentEmail = userItems.map((item) => {
      return item.studentEmail;
    });
    console.log(
      "total number of items added in database: ",
      userItems.length,
      " and number of emails enters is: ",
      studentEmail.length
    );
    console.log("");

    if (!studentEmail.includes(email)) {
      const docRef = await addDoc(collection(db, "student_email"), data);
      console.log(
        "Document for adding email and status has been done with id: ",
        docRef.id
      );
      console.log(`${email} with ${active} has been added to database`);
      integer += 1;
      console.log("data increment by: ", integer);
      return; // <--- Add this line to exit the function
    } else {
      console.log(`${email} has been register before`);
    }
  } catch (error) {
    console.log(
      "Error while adding data in firebase for email and emailActive",
      error
    );
  }
}

export async function deleteStudentData(id) {
  try {
    const docRef = doc(db, "students", id);
    await updateDoc(docRef, {
      active: false,
    });
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}
export async function deleteRestaurantData(id) {
  try {
    const docRef = doc(db, "restaurants", id);
    await updateDoc(docRef, {
      active: false,
    });
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}
export async function updateRestaurantData(id, name, address) {
  try {
    const docRef = doc(db, "restaurants", id);
    await updateDoc(docRef, {
      name: name,
      address: address,
    });
    console.log(
      `document has been updated where name: ${name}, id: ${id} and address is ${address}`
    );
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

// to delete the restaurant data by user (not by sait staff)
// export async function deleteRestaurantDataByUser(){
//   try{
//     const docRef = doc(db,rest)
//   }

export async function existingStudentData(email) {
  try {
    const q = query(collection(db, "students"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      await updateDoc(doc.ref, {
        active: true,
      });
    });
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}
export async function existingRestaurantData(email) {
  try {
    const q = query(collection(db, "restaurants"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      await updateDoc(doc.ref, {
        active: true,
      });
    });
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}
// to delete restarant data from database, storage and athentication
export async function deleteRestaurantUser(currentUser, id, userId) {
  const accountId = userId;
  if (currentUser) {
    try {
      // Step 1: Re-authenticate user if necessary
      try {
        await deleteUser(currentUser);
      } catch (error) {
        if (error.code === "auth/requires-recent-login") {
          const credential = EmailAuthProvider.credential(
            currentUser.email,
            prompt("Please enter your password to re-authenticate.")
          );
          await reauthenticateWithCredential(currentUser, credential);
          await deleteUser(currentUser);
        } else {
          throw error;
        }
      }

      // Step 2: Delete user document from Firestore
      await deleteDoc(doc(db, "restaurants", id));

      // Step 3: Delete user's data from restaurant_menu database
      const userCollectionRef = collection(db, "restaurant_menu");
      const q = query(userCollectionRef, where("userId", "==", accountId));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (docSnapshot) => {
        await deleteDoc(docSnapshot.ref);
      });

      // Step 4: Delete user's storage files
      const storage = getStorage();
      const folderRef = ref(storage, `menu/${accountId}`);

      const deleteFolder = async (folderRef) => {
        const res = await listAll(folderRef);
        for (const itemRef of res.items) {
          await deleteObject(itemRef);
        }

        for (const subfolderRef of res.prefixes) {
          await deleteFolder(subfolderRef);
        }
      };

      await deleteFolder(folderRef);
      alert("Your account has been deleted successfully!");
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        alert(
          "To delete your account, please log out first and then proceed with the account deletion."
        );
      } else {
        console.error("Error while deleting user:", error);
      }
    }
  } else {
    console.log("No current user found");
  }
}
