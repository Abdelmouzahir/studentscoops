import { db, storage } from "@/app/firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export async function addUserInformation(userId, userInformation) {
  try {
    const docRef = await addDoc(
      collection(db, "student", userId, "user-information"),
      userInformation
    );
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
export async function addOtherUserInformation(userId, userInformation) {
  try {
    const docRef = await addDoc(
      collection(db, "student", userId, "user-other-information"),
      userInformation
    );
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
export async function addRestaurantInformation(
  userId,
  name,
  location,
  mobileNumber,
  postalCode,
  image
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
        await addDoc(
          collection(db, "restaurants", userId, "restaurant-information"),
          {
            name,
            location,
            mobileNumber,
            postalCode,
            imageUrl: downloadURL,
            createdAt: new Date(),
          }
        );
        console.log("Document successfully written!");
      } catch (error) {
        console.error("Error writing document: ", error);
      }
    }
  );
}
export async function addRestaurantMenu(
  userId,
  name,
  price,
  description,
  image
) {
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
        await addDoc(
          collection(db, "restaurants", userId, "menu"),
          {
            name,
            price,
            description,
            imageUrl: downloadURL,
            createdAt: new Date(),
          }
        );
        console.log("Document successfully written!");
      } catch (error) {
        console.error("Error writing document: ", error);
      }
    }
  );
}
