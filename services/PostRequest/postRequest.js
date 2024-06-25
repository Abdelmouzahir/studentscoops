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
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

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

export async function addRestaurantMenu(user, name, price, description, image) {
  const storageRef = ref(storage, `menu/${image.name}`);
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
          userId: user,
          name,
          price,
          description,
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
export let integer = 0;
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

export async function updateStudent(id, prop) {
  try {
    const docRef = doc(db, "students", id);
    await updateDoc(docRef, prop);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}
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