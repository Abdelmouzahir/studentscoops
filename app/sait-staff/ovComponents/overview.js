import React from 'react';
import Card from "./card";

import { FaUsers, FaChartLine } from 'react-icons/fa';
import { AiOutlineShop,AiOutlineTeam } from 'react-icons/ai';

const Overview = () => {
  return (
    <div className="flex justify-between flex-wrap">
      <Card 
        title="New Students" 
        value="512" 
        icon={<AiOutlineTeam className='w-10 h-10'/>} 
        change="12" 
        changeType="increase" 
        text="in The last 7 days"
      />
      <Card 
        title="New Restaurants" 
        value="10" 
        icon={<AiOutlineShop className='w-10 h-10' />} 
        change="12" 
        changeType="decrease" 
        text="in The last 7 days"
      />
      <Card 
        title="App use" 
        value="256%" 
        icon={<FaChartLine   className='w-10 h-10'/>} 
        change="Overflow" 
        changeType="increase" 
        text="Based on site Data"
      />
    </div>
  );
};

export default Overview;
