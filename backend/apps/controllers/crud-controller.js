const Category = require("../models/category-model");
const SubCategory = require("../models/subcategory-model");
const Product = require("../models/product-model");
const cloudinary = require('cloudinary').v2;
const { validationResult } = require("express-validator")
require('dotenv').config();

const crud = {};
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
// ADD Category
crud.addCategory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        
        const result = await cloudinary.uploader.upload(req.file.path);
        
        const body = req.body;
        body.image = result.secure_url;
      body.userId=req.user.id
      
        const category = new Category(body);
        await category.save();
        res.status(201).json( category );
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// ADD SubCategory
crud.addSubCategory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        
        const result = await cloudinary.uploader.upload(req.file.path);
        
        const body = req.body;
        body.image = result.secure_url;
      body.userId=req.user.id
      
        const subcategory = new SubCategory(body);
        await subcategory.save();
        res.status(201).json( subcategory );
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
   
};

// ADD Product
crud.addProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        console.log(req.body)
        const result = await cloudinary.uploader.upload(req.file.path);
        
        const body = req.body;
        body.image = result.secure_url;
      body.userId=req.user.id
      
        const prod = new Product(body);
        await prod.save();
        res.status(201).json( prod );
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE Category
crud.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await Category.findByIdAndDelete(id);
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE SubCategory
crud.deleteSubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await SubCategory.findByIdAndDelete(id);
        res.status(200).json({ message: "SubCategory deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE Product
crud.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// VIEW Category
crud.viewCategory = async (req, res) => {
    try {
        const categories = await Category.find({ userId: req.user.id });
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// VIEW SubCategory
crud.viewSubCategory = async (req, res) => {
    try {
        const subCategories = await SubCategory.find();
        res.status(200).json(subCategories);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
crud.viewSubCat = async (req, res) => {
    console.log(req.params.category)
    try {
        const subCategories = await SubCategory.find({ categoryName: req.params.category });

        res.status(200).json(subCategories);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// VIEW Product
crud.viewProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// EDIT Category
crud.editCategory = async (req, res) => {
    console.log(req.body)
    try {
        const { id } = req.params;
        const body = req.body; 
        const category = await Category.findByIdAndUpdate(id, body, { new: true });
        res.status(200).json( category );
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// EDIT SubCategory
crud.editSubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;  // Removed status field
        const subCategory = await SubCategory.findByIdAndUpdate(id, body, { new: true });
        res.status(200).json(subCategory );
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// EDIT Product
crud.editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { category, subcategory, productName, image } = req.body;  // Removed status field
        const product = await Product.findByIdAndUpdate(id, { category, subcategory, productName, image }, { new: true });
        res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Export all CRUD operations
module.exports = crud;
