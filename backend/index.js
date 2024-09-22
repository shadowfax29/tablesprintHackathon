const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const multer=require('multer')
const path = require("path");
const mongoose = require('mongoose'); // Import mongoose
const userController = require("./apps/controllers/user-controller");
const User = require('./apps/models/user-model');
const { checkSchema } = require('express-validator');
const authenticateUser=require("./apps/middleware/authenticateUser")
const { userRegisterValidation, userLoginValidation } = require('./apps/validation/user-validation');
const crudController = require('./apps/controllers/crud-controller');
const { categoryValidation, categoryEditValidation } = require('./apps/validation/category-validation');
const { subCategoryValidation, subCategoryEditValidation } = require('./apps/validation/subCategory-validation');
const { productValidation, productEditValidation } = require('./apps/validation/product-validation');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Stop the app if there's a connection error
  }
};

// Call the function to connect to MongoDB
connectDB();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + path.extname(file.originalname);
      cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.post("/user/register",checkSchema(userRegisterValidation), userController.register);
app.post("/user/login", checkSchema(userLoginValidation),userController.login);
app.post("/user/forgotPassword", userController.forgotPassword);
app.put("/user/resetPassword/:userId", userController.resetPassword);
// Category Routes
app.post("/category",authenticateUser,upload.single("image"),checkSchema(categoryValidation), crudController.addCategory);
app.delete("/category/:id", authenticateUser,crudController.deleteCategory);
app.get("/category",authenticateUser, crudController.viewCategory);
app.put("/category/:id",authenticateUser,upload.single("image"),checkSchema(categoryEditValidation), crudController.editCategory);

// SubCategory Routes
app.post("/subcategory",authenticateUser,upload.single("image"),checkSchema(subCategoryValidation), crudController.addSubCategory);
app.delete("/subcategory/:id",authenticateUser, crudController.deleteSubCategory);
app.get("/subcategory",authenticateUser, crudController.viewSubCategory);
app.put("/subcategory/:id",authenticateUser,upload.single("image"),checkSchema(subCategoryEditValidation), crudController.editSubCategory);

// Product Routes
app.post("/product", authenticateUser,upload.single("image"),checkSchema(productValidation),crudController.addProduct);
app.delete("/product/:id",authenticateUser, crudController.deleteProduct);
app.get("/product",authenticateUser, crudController.viewProduct);
app.put("/product/:id",authenticateUser,upload.single("image"),checkSchema(productEditValidation), crudController.editProduct);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
