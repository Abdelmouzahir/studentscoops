import { database } from "@/app/firebase/config";
import { ref, onValue } from "firebase/database";
// https://firebase.google.com/docs/database/web/read-and-write?_gl=1*1cqpw16*_up*MQ..*_ga*MTcxOTAyMzU5My4xNzIwNTU5NDIw*_ga_CW55HF8NVT*MTcyMDU1OTQxOS4xLjAuMTcyMDU1OTQxOS4wLjAuMA..#write_data


// to fetch the restaurant profile from the realtime database for sait staff
export function getRestaurantForSaitStaff() {
    return new Promise((resolve, reject) => {
      const restaurantRef = ref(database, 'restaurants/');
  
      onValue(restaurantRef, (snapshot) => {
        const data = [];
        snapshot.forEach(childSnapshot => {
          const restaurant = childSnapshot.val();
          data.push({ id: childSnapshot.key, ...restaurant });
        });
        return(data);
      }, (error) => {
        console.error('Error fetching data: ', error);
        reject(error);
      });
    });
  }

  //to fetch data from the realtime database for the restaurant owner "here id is user uid"
  export function getRestaurantDataForOwner(id) {
    return new Promise((resolve, reject) => {
      const restaurantRef = ref(database, 'restaurants/' + id);
  
      onValue(restaurantRef, (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      }, (error) => {
        console.error('Error fetching data: ', error);
        reject(error);
      });
    });
  }
  export function getRestaurantMenu(id) {
    return new Promise((resolve, reject) => {
      const restaurantRef = ref(database, 'restaurants/' + id + '/menu');
  
      onValue(restaurantRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const formattedData = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value
          }));
          resolve(formattedData);
        } else {
          resolve([]);
        }
      }, (error) => {
        console.error('Error fetching data: ', error);
        reject(error);
      });
    });
  }