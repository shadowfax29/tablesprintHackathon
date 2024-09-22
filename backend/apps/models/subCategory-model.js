const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const subCategorySchema = new Schema(
    {
      categoryName:{
        type:String,
      },
      subCategoryName: {
        type: String,
        
      },
      sequence: {
        type: Number,
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
  
  const SubCategory = model("SubCategory", subCategorySchema);
  
  module.exports = SubCategory;
  