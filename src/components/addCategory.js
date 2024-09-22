import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "../actions/categoryAction";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

const AddCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [categoryName, setCategoryName] = useState("");
    const [categorySequence, setCategorySequence] = useState("");
    const [image, setImage] = useState(null);
    const [error, setError] = useState(""); // For validation error messages

    // Handle image upload and validate file size
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 1048576) {
            setError("Image size should not exceed 1MB");
        } else {
            setImage(file);
            setError(""); // Clear any previous errors
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate fields before submitting
        if (!categoryName || !categorySequence || !image) {
            setError("All fields are required, including an image.");
            return;
        }
        const resetForm = () => {
            setCategoryName("");
            setCategorySequence("");
            setImage(null);
        }
        const formData = new FormData();
        formData.append("categoryName", categoryName);
        formData.append("sequence", categorySequence);
        formData.append("image", image);



        dispatch(addCategory(formData, resetForm));
    };

    return (
        <>
            <div className='relative min-h-screen'>
                <Navbar />
                <div className="grid grid-cols-2 gap-4">
                    <Sidebar/>

                        <div className="p-4 flex flex-col justify-center items-center fixed top-0 right-0 z-10  w-10/12 h-screen bg-white shadow-lg rounded-lg dark:border-gray-700">
                        <div className="flex items-center">
                <h2 className="text-2xl font-semibold ml-4">Add Category</h2>
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div className="flex space-x-6">
                    <div className="w-1/2">
                        <label htmlFor="categoryName" className="block mb-2 text-sm font-medium text-gray-900">
                            Category Name
                        </label>
                        <input
                            type="text"
                            id="categoryName"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Enter category name"
                            required
                        />
                    </div>

                    <div className="w-1/2">
                        <label htmlFor="categorySequence" className="block mb-2 text-sm font-medium text-gray-900">
                            Category Sequence
                        </label>
                        <input
                            type="number"
                            id="categorySequence"
                            value={categorySequence}
                            onChange={(e) => setCategorySequence(e.target.value)}
                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Enter category sequence"
                            required
                        />
                    </div>
                </div>

                <div className="flex space-x-6">
                    <div className="w-1/2">
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
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                    <button
                        type="button"
                        className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50"
                        onClick={() => navigate("/category")}
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

export default AddCategory;
