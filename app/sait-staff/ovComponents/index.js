import Head from 'next/head';
import Overview from './overview';
import Table from './table';
import { useState } from 'react';

export default function Dash() {
  const [isAdding, setIsAdding] = useState(false);

  // Random data
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
    <div className="min-h-screen flex flex-col items-center justify-start py-2">
      <main className="flex flex-col items-start w-full px-20 py-4 ">
        <div className="self-start ml-5">
          <Overview />
        </div>
        <div className="flex flex-col items-center w-full mt-8">
          <Table
            admin={admin}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            setIsAdding={setIsAdding}
          />
        </div>
      </main>
    </div>
  );
}
