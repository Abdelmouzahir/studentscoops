import { db } from "@/app/firebase/config";
import {
  collection,
  getDocs,
  query,
} from "firebase/firestore";

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
