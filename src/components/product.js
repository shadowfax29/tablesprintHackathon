import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import axios from "../components/util";
import Navbar from './navbar';
import Cookies from "js-cookie"; 
import Sidebar from './sidebar';
import { useNavigate } from 'react-router-dom';

export const Product = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('product', {
          headers: {
            'Authorization': Cookies.get('token')
          }
        });
        const result = response.data;
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
 const handleView =(product)=>{
    navigate("/detailProduct", { state: { product } });
 }
  const handleEdit = (product) => {
    navigate("/editProduct", { state: { product } });
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/product/${id}`, {
        headers: {
          'Authorization': Cookies.get('token')
        }
      });
      // Remove the deleted category from the state
      setData(data.filter(category => category._id !== id));
      setModalOpen(false); // Close the modal after deletion
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const openModal = (id) => {
    setCategoryIdToDelete(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCategoryIdToDelete(null);
  };

  const columns = React.useMemo(
    () => [
      { Header: 'Category ', accessor: 'category' },
      { Header: 'subcategory ', accessor: 'subcategory' },
      { Header: 'Product', accessor: 'productName' },
      { 
        Header: 'Image', 
        accessor: 'image',
        Cell: ({ value }) => <img src={value} alt="category" className="h-10 w-10 rounded-full" />
      },

      { 
        Header: 'Status', 
        accessor: 'status',
        Cell: ({ value }) => (
          <span className={`font-bold ${value === 'active' ? 'text-green-600' : 'text-red-600'}`}>
            {value}
          </span>
        )
      },
      { 
        Header: 'Action', 
        accessor: '_id',
        Cell: ({ value,row }) => (
          <div className="flex space-x-2">
            <button onClick={() => handleView(row.original)} className="text-green-600 hover:text-green-900">view</button>
        
            <button onClick={() => handleEdit(row.original)} className="text-blue-600 hover:text-blue-900">Edit</button>
            <button 
              onClick={() => openModal(value)} 
              className="text-red-600 hover:text-red-900"
            >
              Delete
            </button>
          </div>
        )
      }
    ],
    [data] // Add data to dependencies to ensure the table updates when data changes
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className='relative min-h-screen'>
        <Navbar />
        <div className="grid grid-cols-2 gap-4">
          <Sidebar />
          <div className="p-4 flex flex-col mt-20 fixed top-0 right-0 z-10 w-10/12 h-screen bg-white shadow-lg rounded-lg dark:border-gray-700">
            <div className="p-6 w-full">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Product</h1>
                <button onClick={() => { navigate("/addProduct") }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Add Product
                </button>
              </div>
              <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {column.render('Header')}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
                  {rows.map(row => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map(cell => (
                          <td {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap">
                            {cell.render('Cell')}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {modalOpen && (
        <div id="deleteModal" tabIndex="-1" aria-hidden="true" className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50">
          <div className="relative p-4 w-full max-w-md h-auto">
            <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <p className="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this category?</p>
              <div className="flex justify-center items-center space-x-4">
                <button onClick={closeModal} className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">
                  No, cancel
                </button>
                <button 
                  onClick={() => {
                    handleDelete(categoryIdToDelete);
                  }} 
                  className="py-2 px-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600"
                >
                  Yes, delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
