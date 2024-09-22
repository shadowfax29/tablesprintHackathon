const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    category: {
      type: String,
      
    },
    subcategory: {
      type: String,
   
    },
    productName: {
      type: String,
         },
    image: {
      type: String,
  
    },
    status: {
      type: String,
      default:"active"
      
    },
    userId:{type: Schema.Types.ObjectId, ref: "User"}
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
