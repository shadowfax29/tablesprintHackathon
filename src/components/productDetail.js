
import Navbar from './navbar';
import Sidebar from './sidebar';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
const ProductDetail = () => {
    const location = useLocation();
    const { product } = location.state || {};
    const navigate = useNavigate();




    return (
        <>
            <div className='relative min-h-screen'>
                <Navbar />
                <div className="grid grid-cols-2 gap-4">
                    <Sidebar />
                    <div className="p-4 flex flex-col mt-20 fixed top-0 right-0 z-10 w-10/12 h-screen bg-white shadow-lg rounded-lg dark:border-gray-700">
                        <div className="p-6 w-full">
                        <div className="p-6 bg-gray-50 dark:bg-gray-700 shadow-md rounded-md">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Product Details</h1>
                            {product ? (
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Product Name:</h3>
                                        <p className="text-lg text-gray-600 dark:text-gray-300">{product.productName}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Category:</h3>
                                        <p className="text-lg text-gray-600 dark:text-gray-300">{product.category}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Subcategory:</h3>
                                        <p className="text-lg text-gray-600 dark:text-gray-300">{product.subcategory}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Status:</h3>
                                        <p className="text-lg text-gray-600 dark:text-gray-300">{product.status}</p>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-lg text-red-500">No product details available</p>
                            )}
                        </div>
                        </div>
                    </div>

                </div>
            </div>
        </>

    )
}

export default ProductDetail;
