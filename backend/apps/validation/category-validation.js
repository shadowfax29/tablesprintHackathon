const categoryValidation = {
    categoryName: {
        in: ["body"],
        exists: {
            errorMessage: "Category name is required",
        },
        notEmpty: {
            errorMessage: "Category name should not be empty",
        },
        
        trim: true,
    },
    sequence: {
        in: ["body"],
        exists: {
            errorMessage: "Sequence field is required",
        },
        notEmpty: {
            errorMessage: "Sequence field should not be empty",
        },
        trim: true,
    },
    
    
};

const categoryEditValidation = {    categoryName: {
    in: ["body"],
    exists: {
        errorMessage: "Category name is required",
    },
    notEmpty: {
        errorMessage: "Category name should not be empty",
    },
    
    trim: true,
},
sequence: {
    in: ["body"],
    exists: {
        errorMessage: "Sequence field is required",
    },
    notEmpty: {
        errorMessage: "Sequence field should not be empty",
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
}, }; 

module.exports = { categoryValidation, categoryEditValidation };
