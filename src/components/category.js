import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import axios from "../components/util";
import Navbar from './navbar';
import Cookies from "js-cookie"; 
import Sidebar from './sidebar';
import { useNavigate } from 'react-router-dom';

export const Category = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('category', {
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/category/${id}`, {
        headers: {
          'Authorization': Cookies.get('token')
        }
      });
      // Remove the deleted category from the state
      setData(data.filter(category => category._id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  const handleEdit = (category) => {
    navigate("/editCategory", { state: { category } });
  };
  const columns = React.useMemo(
    () => [
      { Header: 'Category Name', accessor: 'categoryName' },
      { 
        Header: 'Image', 
        accessor: 'image',
        Cell: ({ value }) => <img src={value} alt="category" className="h-10 w-10 rounded-full" />
      },
      { Header: 'Sequence', accessor: 'sequence' },
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
        Cell: ({ value ,row}) => (
          <div className="flex space-x-2">
            <button onClick={() => handleEdit(row.original)} className="text-blue-600 hover:text-blue-900">Edit</button>
            <button 
              onClick={() => handleDelete(value)} 
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
                <h1 className="text-2xl font-bold">Category</h1>
                <button onClick={() => { navigate("/addCategory") }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Add Category
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
    </>
  );
}
