import { db } from "@/app/firebase/config";
import {
  collection,
  getDocs,
  addDoc,
  query,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export async function addUserInformation(userId, userInformation) {
  try {
    const docRef = await addDoc(
      collection(db, "users", userId, "user-information"),
      userInformation
    );
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
