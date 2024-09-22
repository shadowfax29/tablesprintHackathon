import React from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';
import img from './images/image.png'
const Dashboard = () => {
  return (
    <>
      <div className='relative min-h-screen'>
        <Navbar />
        <div className="grid grid-cols-2 gap-4">
          <Sidebar />

          <div className="p-4 flex flex-col justify-center items-center fixed top-0 right-0 z-10  w-10/12 h-screen bg-white shadow-lg rounded-lg dark:border-gray-700">
          <div><p><span><img src={img}/>TableSprint</span></p></div>
            <p className="text-2xl font-semibold">Welcome to TableSprint Admin</p>
          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;
