const productValidation = {
    category: {
        in: ["body"],
        exists: {
            errorMessage: "Category is required",
        },
        notEmpty: {
            errorMessage: "Category should not be empty",
        },
        
        trim: true,
    },
    subcategory: {
        in: ["body"],
        exists: {
            errorMessage: "Subcategory is required",
        },
        notEmpty: {
            errorMessage: "Subcategory should not be empty",
        },
       
        trim: true,
    },
    productName: {
        in: ["body"],
        exists: {
            errorMessage: "Product name is required",
        },
        notEmpty: {
            errorMessage: "Product name should not be empty",
        },
        
        trim: true,
    },
    
};

const productEditValidation = { category: {
    in: ["body"],
    exists: {
        errorMessage: "Category is required",
    },
    notEmpty: {
        errorMessage: "Category should not be empty",
    },
   
    trim: true,
},
subcategory: {
    in: ["body"],
    exists: {
        errorMessage: "Subcategory is required",
    },
    notEmpty: {
        errorMessage: "Subcategory should not be empty",
    },
   
    trim: true,
},
productName: {
    in: ["body"],
    exists: {
        errorMessage: "Product name is required",
    },
    notEmpty: {
        errorMessage: "Product name should not be empty",
    },
    
    trim: true,
},
image: {
    in: ["body"],
    
    notEmpty: {
        errorMessage: "Image should not be empty if provided",
    },
    
    trim: true,
},
status: {
    in: ["body"],
    
    notEmpty: {
        errorMessage: "Status should not be empty if provided",
    },
   
    isIn: {
        options: [["active", "inactive"]],
        errorMessage: "Status must be either 'active' or 'inactive'",
    },
    trim: true,
}, }; // Reuse the same rules for editing

module.exports = { productValidation, productEditValidation };
