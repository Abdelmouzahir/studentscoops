import { db, storage } from "@/app/firebase/config";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { getDownloadURL, ref, listAll } from "firebase/storage";

export async function getStudentInformation(userId) {
  try {
    const colRef = collection((db, "students",userId),where("active","==",true));
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      snapshot.forEach((doc) => {});
    });
    return unsubscribe();
  } catch (error) {
    console.error("Error getting user information: ", error);
    return [];
  }
}

export async function getAllStudentsInformation() {
  try {
    
    const q = query((collection(db, "students")),where("active",'==',true));
    const querySnapshot = await getDocs(q);
    const studentItems = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return studentItems;
  } catch (error) {
    console.error("Error while fetching all students information:", error);
    return [];
  }
}
//get restaurant data for sait staff
export async function getRestaurantInformation() {
  try {
    const q = query(collection(db, "restaurants"), where("active",'==',true));
    const querySnapshot = await getDocs(q);
    const userItems = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return userItems;
  } catch (error) {
    console.error("Error getting user information: ", error);
    return [];
  }
}
// get restaurant data for user as restaurant
export async function getRestaurantInformationByUser(user) {
  try {
    const q = query(collection(db, "restaurants"), where("uid", "==", user),where('active',"==",true));
    const querySnapshot = await getDocs(q);
    const userItems = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return userItems;
  } catch (error) {
    console.error("Error getting user information: ", error);
    return false;
  }
}
// to get the restaurant menu for the user as restaurant owner or emloyee
export async function getMenuInformation(userId) {
  try {
    const q = query(
      collection(db, "restaurant_menu"),
      where("userId", "==", userId),
      orderBy("createdAt",'desc') // Add this line
    );
    const querySnapshot = await getDocs(q);
    const userItems = querySnapshot.docs.map((doc) => {
      return { id: doc.id,...doc.data() };
    });
    return userItems;
  } catch (error) {
    return [];
  }
}
export async function getStudentEmailWithStatus() {
  try {
    const q = query(
      collection(db, "student_email"),
      where("active", "==", true)
    );
    const querySnapshot = await getDocs(q);
    const userItems = querySnapshot.docs.map((doc) => doc.data().studentEmail);
    return userItems;
  } catch (err) {
    console.log("error while getting student email information ", err);
    return [];
  }
}
export async function getRestaurantLogos() {
  const storageRef = ref(storage, "restaurant_logo/");
  const result = await listAll(storageRef);
  const urlPromises = result.items.map((imageRef) => getDownloadURL(imageRef));
  const urls = await Promise.all(urlPromises);
  return urls;
}
