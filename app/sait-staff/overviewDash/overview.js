"use client";
import React, { useEffect, useState } from "react";
import Card from "./card";
import { getAllStudentsInformation, getRestaurantInformation } from "@/services/GetRequest/getRequest";

import { FaUsers, FaChartLine } from "react-icons/fa";
import { AiOutlineShop, AiOutlineTeam } from "react-icons/ai";

const Overview = () => {
  const [totalNumberStudent, setTotalNumberStudent] = useState(0);
  const [totalNumberRestaurant, setTotalNumberRestaurant] = useState(0);
  const [students, setStudents] = useState(0);
  const [restaurants, setRestaurants] = useState(0);
  const currentDate = new Date(); //current date of system
  const dateBefore7Days = new Date(currentDate);
  dateBefore7Days.setDate(currentDate.getDate() - 7); // first create current date and then set date as date before 7 days.

  useEffect(() => {
    async function gettingStudentInformation() {
      await getAllStudentsInformation().then((data) => {
        setTotalNumberStudent(data.length)
        if (data) {
            data.map((studentdata) => {
              const date = studentdata.acountCreated[0];
              const month = studentdata.acountCreated[1];
              const year = studentdata.acountCreated[2];
              const studentDate = new Date(year, month, date);
              if (studentDate >= dateBefore7Days) {
                setStudents(students+1);
                return { studentdata };
              }
            })
        }
      });
    }
    async function gettingRestaurantInformation() {
      await getRestaurantInformation().then((data) => {
        setTotalNumberRestaurant(data.length)
        if (data) {
            data.map((studentdata) => {
              const date = studentdata.acountCreated[0];
              const month = studentdata.acountCreated[1];
              const year = studentdata.acountCreated[2];
              const studentDate = new Date(year, month, date);
              if (studentDate >= dateBefore7Days) {
                setRestaurants(restaurants+1);
                return { studentdata };
              }
            })
        }
      });
    }
    gettingStudentInformation();
    gettingRestaurantInformation();
    
  }, []);
  return (
    <div className="flex justify-between flex-wrap">
      <Card
        title="New Students"
        value={students}
        icon={<AiOutlineTeam className="w-10 h-10" />}
        change={((students/totalNumberStudent)*100)}
        changeType="increase"
        text="in The last 7 days"
      />
      <Card
        title="New Restaurants"
        value={restaurants}
        icon={<AiOutlineShop className="w-10 h-10" />}
        change={(restaurants/totalNumberRestaurant)*100}
        changeType="increase"
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
