import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../actions/productAction"; // Action to add product
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import axios from "../components/util"; // Adjust the path as needed
import Cookies from "js-cookie";

const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]); // State for categories
    const [subCategories, setSubCategories] = useState([]); // State for subcategories
    const [category, setCategory] = useState(""); // Selected category
    const [subCategory, setSubCategory] = useState(""); // Selected subcategory
    const [productName, setProductName] = useState(""); // Product name
    const [image, setImage] = useState(null); // Product image
    const [error, setError] = useState("");

    // Fetch categories on component mount
useEffect(() => {
    const fetchCategories = async () => {
        try {
            const categoryResponse = await axios.get("category", {
                headers: {
                    Authorization: Cookies.get("token"),
                },
            });
            console.log("Categories:", categoryResponse.data);
            setCategories(categoryResponse.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    fetchCategories();
}, []);

// Fetch subcategories when category is selected
useEffect(() => {
    
        const fetchSubCategories = async () => {
            try {
                const subCategoryResponse = await axios.get(`subcategory`, {
                    headers: {
                        Authorization: Cookies.get("token"),
                    },
                });
                console.log("Subcategories:", subCategoryResponse.data);
                setSubCategories(subCategoryResponse.data);
            } catch (error) {
                console.error("Error fetching subcategories:", error);
            }
        };

        fetchSubCategories();
    }
, []);


    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 1048576) {
            setError("Image size should not exceed 1MB");
        } else {
            setImage(file);
            setError("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!category || !subCategory || !productName || !image) {
            setError("All fields are required.");
            return;
        }
const resetForm=()=>{
    setCategory("");
    setSubCategory("");
    setProductName("");
    setImage(null);

}
        const formData = new FormData();
        formData.append("category", category);
        formData.append("subcategory", subCategory);
        formData.append("productName", productName);
        formData.append("image", image);
        console.log(formData)

        dispatch(addProduct(formData,resetForm));
        // Optionally reset the form or navigate to the product listing page
    };

    return (
        <>
            <div className="relative min-h-screen">
                <Navbar />
                <div className="grid grid-cols-2 gap-4">
                    <Sidebar />
                    <div className="p-4 flex flex-col justify-center items-center fixed top-0 right-0 z-10 w-10/12 h-screen bg-white shadow-lg rounded-lg dark:border-gray-700">
                        <div className="flex items-center">
                            <h2 className="text-2xl font-semibold ml-4">Add Product</h2>
                        </div>

                        {error && <p className="text-red-500 mt-2">{error}</p>}

                        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                            {/* Category Selection */}
                            <div className="flex space-x-6">
                                <div className="w-1/2">
                                    <label htmlFor="categorySelect" className="block mb-2 text-sm font-medium text-gray-900">
                                        Select Category
                                    </label>
                                    <select
                                        id="categorySelect"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        required
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((cat) => (
                                            <option key={cat._id} value={cat.categoryName}>
                                                {cat.categoryName}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Subcategory Selection */}
                                <div className="w-1/2">
                                    <label htmlFor="subCategorySelect" className="block mb-2 text-sm font-medium text-gray-900">
                                        Select SubCategory
                                    </label>
                                    <select
                                        id="subCategorySelect"
                                        value={subCategory}
                                        onChange={(e) => setSubCategory(e.target.value)}
                                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        required
                                    >
                                        <option value="">Select a subcategory</option>
                                        {subCategories
                                             // Filter subcategories by selected category
                                            .map((subCat) => (
                                                <option key={subCat._id} value={subCat.subCategoryName}>
                                                    {subCat.subCategoryName}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            </div>

                            {/* Product Name */}
                            <div className="w-full">
                                <label htmlFor="productName" className="block mb-2 text-sm font-medium text-gray-900">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    id="productName"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Enter product name"
                                    required
                                />
                            </div>

                            {/* Image Upload */}
                            <div className="w-full">
                                <label htmlFor="imageUpload" className="block mb-2 text-sm font-medium text-gray-900">
                                    Upload Image
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center">
                                    {image ? (
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt="Uploaded"
                                            className="h-16 w-16 object-cover"
                                        />
                                    ) : (
                                        <label className="text-gray-400">
                                            <input
                                                type="file"
                                                id="imageUpload"
                                                className="hidden"
                                                onChange={handleImageUpload}
                                                accept="image/*"
                                            />
                                            <div className="flex flex-col items-center cursor-pointer">
                                                <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path d="M4 4v16h16V4H4zm4 14h8v-4h4v-8H8v8h4v4zm4-4v-4h-4v4H8v-4H4v8h16v-8h-8z"></path>
                                                </svg>
                                                <p className="text-sm">Upload Image (Max: 1MB)</p>
                                            </div>
                                        </label>
                                    )}
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end space-x-4 mt-6">
                                <button
                                    type="button"
                                    className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50"
                                    onClick={() => navigate("/product")}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-purple-700 text-white px-6 py-2 rounded-md hover:bg-purple-800"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddProduct;
