import { db ,storage} from "@/app/firebase/config";
import {
  collection,
  getDocs,
  query,where
} from "firebase/firestore";
import { getDownloadURL, ref, listAll } from "firebase/storage";

export async function getStudentInformation(userId){
  try{
    const q = query(
      collection(db, "students"),where('id','==',userId),
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

export async function getAllStudentsInformation() {
  try {
    const q = query(collection(db, "students"));
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

export async function getRestaurantInformation(){
  try{
    const q = query(
      collection(db, "restaurants"),
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

export async function getRestaurantInformationByUser(user){
  try{
    const q = query(
      collection(db, "restaurants"),
      where("userId", "==", user)
      
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

export async function getMenuInformation(docId){
  try{
    const q = query(
      collection(db, "restaurants",docId, "menu"),
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

export async function getMenuInformationByUser(docId, user) {
  try {
    // Create a query against the collection with a where clause to filter by userId
    const q = query(
      collection(db, "restaurants", docId, "menu"),
      where("userId", "==", user)
    );

    // Execute the query
    const querySnapshot = await getDocs(q);

    // Map through the documents and return the data
    const userItems = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    return userItems;
  } catch (error) {
    console.error('Error getting user information: ', error);
    return [];
  }
}
export async function getStudentEmailWithStatus(){
  try{
    const q = query(
      collection(db,'student_email'),
      where('active',"==",true),
    );
    const querySnapshot = await getDocs(q);
    const userItems = querySnapshot.docs.map((doc)=>
      doc.data().studentEmail
    );
    return userItems;
  } catch (err){
    console.log('error while getting student email information ',err);
    return [];
  }
};
export async function getRestaurantLogos(){
  const storageRef = ref(storage,'restaurant_logo/');
  const result = await listAll(storageRef);
  const urlPromises = result.items.map((imageRef)=> getDownloadURL(imageRef));
  const urls = await Promise.all(urlPromises);
  return urls;
};