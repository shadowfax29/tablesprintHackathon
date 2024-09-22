const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const categorySchema = new Schema(
    {
      categoryName: {
        type: String,
        
      },
      sequence: {
        type: String,
       
      },
      image: {
        type: String,
       
      },
      status: {
        type: String,
       default:"inactive"
       
      },
      userId:{type: Schema.Types.ObjectId, ref: "User"}
    },
    {
      timestamps: true,
    }
  );
  
  const Category = model("Category", categorySchema);
  
  module.exports = Category;
  