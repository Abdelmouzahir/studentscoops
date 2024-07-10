import { database, storage } from "@/app/firebase/config";
import { ref, set, child, push, update } from "firebase/database";
import {
    ref as storageRef,
    uploadBytesResumable,
    getDownloadURL,
    getStorage,
    listAll,
    deleteObject,
  } from "firebase/storage";

// https://firebase.google.com/docs/database/web/read-and-write?_gl=1*1cqpw16*_up*MQ..*_ga*MTcxOTAyMzU5My4xNzIwNTU5NDIw*_ga_CW55HF8NVT*MTcyMDU1OTQxOS4xLjAuMTcyMDU1OTQxOS4wLjAuMA..#write_data

// to add the restaurant in the realtime database
export async function addRestaurant({restaurant}){
    console.log('restaurant data: ',restaurant)
    try{
        await set(ref(database,'restaurants/'+restaurant.uid),{
            name: restaurant.name,
            address: restaurant.address,
            imageUrl: null,
            accountCreated: new Date().toISOString(),
            email: restaurant.email,
            phoneNumber: restaurant.phoneNumber,
            menu: null,
        })
    }catch(error){
        console.log('errror while adding data in realtime database of restaurants: ',error);
    }
}

// to add the menu in the realtime database
export async function addMenu(user, name, price, description, image) {
  console.log('menu data: ', name, price, description, image);
  
  const storageReference = storageRef(storage, `menu/${user}/${image.name}`);
  const uploadTask = uploadBytesResumable(storageReference, image);
  
  uploadTask.on(
      "state_changed",
      (snapshot) => {
          const fileProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
              const menu = {
                  name: name,
                  price: price,
                  description: description,
                  imageUrl: downloadURL,
                  createdAt: new Date().toISOString(),
                  status: "active",
              };
              // Generate a new key for the menu item
              const newMenuKey = push(ref(database, 'restaurant/'+user+'/menu')).key;
              console.log('New menu key: ', newMenuKey)
              // Save the menu item under the generated key
              await set(ref(database, 'restaurants/'+user+'/menu/'+newMenuKey), menu);
              console.log('Menu added successfully');
          } catch (error) {
              console.log('Error while adding menu in Realtime Database: ', error);
          }
      }
  );
}