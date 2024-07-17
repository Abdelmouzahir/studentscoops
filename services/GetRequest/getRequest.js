import { db, storage } from "@/app/firebase/config";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  doc,
  orderBy,
} from "firebase/firestore";
import { getDownloadURL, ref, listAll } from "firebase/storage";





//<<<-----------------------------------------------------------------Sait-staff------------------------------------------------------------------>>>>

//--------------------------------------------------------Sait-staff for sait-staff home page---------------------------------------------------------

//get sait data for user profile
export async function getSaitDataByUser(uid){
  try{
    const q = query(collection(db, "saitStaff"),where("uid","==",uid));
    const querySnapshot = await getDocs(q);
    const saitItems = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return saitItems;
  }
  catch(error){
    console.error("Error getting sait information: ", error);
    return {status:false};
  }
}

// get sait data for sait staff home page
export function getSaitData(onChange) {
  try {
    const saitCollection = collection(db, "saitStaff");
    onSnapshot(saitCollection, (saitItems) => {
      const saitStaff = saitItems.docs.map((doc) => {
        console.log("getting sait staff ", doc.data());
        return { id: doc.id,...doc.data() };
      });
      console.log("information: ", saitStaff);
      onChange(saitStaff);
    });
  } catch (error) {
    console.error("Error getting sait information: ", error);
    onChange([]);
  }
}








//----------------------------------------------------get students data for sait staff home page-----------------------------------------------------

//get all students data
export function getStudentData(onChange) {
  try {
    const studentCollection = query(collection(db, "students"));
    onSnapshot(studentCollection, (students) => {
      const studentData = students.docs.map((doc) => {
        console.log("getting students:  ", doc.data());
        return { id: doc.id,...doc.data() };
      });
      console.log("information: ", studentData);
      onChange(studentData);
    });
  } catch (error) {
    console.error("Error getting student information: ", error);
    onChange([]);
  }
}









//----------------------------------------------------get restaurant data for sait staff home page-----------------------------------------------------

//getting restaurant data for sait staff home page

export function getRestaurantData(onChange) {
  try {
    const restaurantCollection = query(collection(db, "restaurants"));
    onSnapshot(restaurantCollection, (restaurants) => {
      const restaurantData = restaurants.docs.map((doc) => {
        console.log("getting restaurants:  ", doc.data());
        return { id: doc.id,...doc.data() };
      });
      console.log("information: ", restaurantData);
      onChange(restaurantData);
    });
  } catch (error) {
    console.error("Error getting restaurant information: ", error);
    onChange([]);
  }
}


















//<<<-----------------------------------------------------------------Restaurant------------------------------------------------------------------>>>>


// get restaurant data for user as restaurant

export async function getRestaurantDataByOwner(uid){
  try{
    const q = query(collection(db, "restaurants"),where("uid","==",uid));
    const querySnapshot = await getDocs(q);
    const saitItems = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return saitItems;
  }
  catch(error){
    console.error("Error getting sait information: ", error);
    return {status:false};
  }
}

// get restaurant menu data for restaurant

export function getRestaurantMenuByOwner(onChange, user) {
  try {
    const restaurantCollection = query(collection(db, "restaurant_menu"),where("uid","==",user));
    onSnapshot(restaurantCollection, (restaurants) => {
      const restaurantData = restaurants.docs.map((doc) => {
        console.log("getting restaurants:  ", doc.data());
        return { id: doc.id,...doc.data() };
      });
      console.log("information: ", restaurantData);
      onChange(restaurantData);
    });
  } catch (error) {
    console.error("Error getting restaurant information: ", error);
    onChange([]);
  }
}








//<<<-----------------------------------------------------------------Restaurant && Students------------------------------------------------------------------>>>>






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
