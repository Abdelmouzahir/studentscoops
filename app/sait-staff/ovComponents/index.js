import Head from 'next/head';
import Overview from './overview';
import Table from './table';
import { useState } from 'react';


export default function Dash() {
  //random data
  const [admin, setAdmin] = useState([
    {
      id: 1,
      name: 'Vera Carpenter',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80',
      role: 'Admin',
      createdAt: 'Jan 21, 2020',
      status: 'Active',
      statusColor: 'text-green-900',
      statusBgColor: 'bg-green-200'
    },
    {
      id: 2,
      name: 'Blake Bowman',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80',
      role: 'Editor',
      createdAt: 'Jan 01, 2020',
      status: 'Active',
      statusColor: 'text-green-900',
      statusBgColor: 'bg-green-200'
    },
    // Add more data as needed
  ]);
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (id) => {
    // Handle edit logic
    console.log(`Edit user with id: ${id}`);
  };

  const handleDelete = (id) => {
    // Handle delete logic
    console.log(`Delete user with id: ${id}`);
    setAdmin(admin.filter(user => user.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-2">
      
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <Overview />
        <Table
          admin={admin}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          setIsAdding={setIsAdding}
         />
      </main>
    </div>
  );
}
