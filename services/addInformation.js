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
export async function getUserInformation(userId){
  try{
    const q = query(
      collection(db, "student",userId, "user-information"),
    );
    const querySnapshot = await getDocs(q);
const userItems = querySnapshot.docs.map((doc) => {
  return { id: doc.id, ...doc.data() };
});
return userItems;
  } catch (error){
    console.error('Error getting user information: ', error);
    return[];
  }
};
