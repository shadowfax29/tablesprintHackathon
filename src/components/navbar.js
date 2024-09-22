import React, { useState } from 'react';
import img from "./images/image.png";
import Cookies from "js-cookie"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
const dispatch=useDispatch()
const navigate = useNavigate();
  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLogoutConfirm = () => {
   dispatch({ type: "LOGOUT"})
   Cookies.remove("token")
   Cookies.remove("currentUser")
   navigate("/login")
  };

  return (
    <nav className="bg-violet-800 border-gray-200 dark:bg-gray-900 w-full fixed top-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center">
          <img src={img} className="h-8" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">TableSprint</span>
        </div>
        
        <button id="deleteButton" onClick={handleLogoutClick} className="block text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
          <svg viewBox="0 0 24 24" fill="none" width={20} xmlns="http://www.w3.org/2000/svg">
            <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>

        {/* Logout Modal */}
        {showModal && (
          <div id="deleteModal" tabIndex="-1" aria-hidden="true" className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50">
            <div className="relative p-4 w-full max-w-md h-auto">
              <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
               
                <p className="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to log out?</p>
                <div className="flex justify-center items-center space-x-4">
                  <button onClick={handleCloseModal} className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">
                    No, cancel
                  </button>
                  <button onClick={handleLogoutConfirm} className="py-2 px-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600">
                    Yes, log out
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
