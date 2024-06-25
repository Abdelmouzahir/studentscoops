"use client";
import React, { useEffect, useState } from "react";
import Card from "./card";
import { getAllStudentsInformation, getRestaurantInformation } from "@/services/GetRequest/getRequest";

import { FaUsers, FaChartLine } from "react-icons/fa";
import { AiOutlineShop, AiOutlineTeam } from "react-icons/ai";

const Overview = () => {
  const [totalNumberStudent, setTotalNumberStudent] = useState(0);
  const [studentActive, setStudentActive] = useState(0);
  const [studentNotActive, setStudentNotActive] = useState(0);
  const [restaurantActive, setRestaurantActive] = useState(0);
  const [restaurantNotActive, setRestaurantNotActive] = useState(0);
  const [totalNumberRestaurant, setTotalNumberRestaurant] = useState(0);
  const [students, setStudents] = useState(0);
  const [restaurants, setRestaurants] = useState(0);
  const currentDate = new Date(); //current date of system
  const dateBefore7Days = new Date(currentDate);
  dateBefore7Days.setDate(currentDate.getDate() - 7); // first create current date and then set date as date before 7 days.

  useEffect(() => {
    async function gettingStudentInformation() {
      let studentCount = 0;
      let studentactive = 0;
      let studentnotactive = 0;
      await getAllStudentsInformation().then((data) => {
        setTotalNumberStudent(data.length)
        if (data) {
          data.forEach((studentdata) => {
            const date = studentdata.acountCreated[0];
            const month = studentdata.acountCreated[1];
            const year = studentdata.acountCreated[2];
            const studentDate = new Date(year, month, date);
            console.log(studentDate >= dateBefore7Days)
            if (studentDate >= dateBefore7Days) {
              studentCount++
            }
            if(studentdata.active){
              studentactive++
            }
            if(!studentdata.active){
              studentnotactive++
            }
          })
        }
      });
      setStudentActive(studentactive);
      setStudentNotActive(studentnotactive);
      setStudents(studentCount);
    }
    async function gettingRestaurantInformation() {
      let restaurantCount = 0;
      let restaurantactive = 0;
      let restaurantnotactive = 0;
      await getRestaurantInformation().then((data) => {
        setTotalNumberRestaurant(data.length)
        if (data) {
            data.map((restaurantdata) => {
              const date = restaurantdata.acountCreated[0];
              const month = restaurantdata.acountCreated[1];
              const year = restaurantdata.acountCreated[2];
              const restaurantDate = new Date(year, month, date);
              if (restaurantDate >= dateBefore7Days) {
                setRestaurants(restaurants+1);
                restaurantCount++
              }
              if(restaurantdata.active){
                restaurantactive++
              }
              if(!restaurantdata.active){
                restaurantnotactive++
              }
            })
        }
      });
      setRestaurantActive(restaurantactive);
      setRestaurantNotActive(restaurantnotactive);
      setRestaurants(restaurantCount)
    }
    gettingStudentInformation();
    gettingRestaurantInformation();    
  }, []);
  useEffect(()=>{
    console.log(students)
  },[students])
  return (
    <div className="flex justify-between flex-wrap">
      <Card
        title="New Students"
        value={students}
        icon={<AiOutlineTeam className="w-10 h-10" />}
        change={((students/totalNumberStudent)*100)}
        changeType={(studentActive-studentNotActive)>=0?"increase":"decrease"}
        text="in The last 7 days"
      />
      <Card
        title="New Restaurants"
        value={restaurants}
        icon={<AiOutlineShop className="w-10 h-10" />}
        change={(restaurants/totalNumberRestaurant)*100}
        changeType={(restaurantActive-restaurantNotActive)>=0?"increase":"decrease"}
        text="in The last 7 days"
      />
      <Card
        title="Transactions rate"
        value="256%"
        icon={<FaChartLine className="w-10 h-10" />}
        change="Overflow"
        changeType="increase"
        text="Based on site Data"
      />
    </div>
  );
};

export default Overview;
