const subCategoryValidation = {
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
    subCategoryName: {
        in: ["body"],
        exists: {
            errorMessage: "SubCategory name is required",
        },
        notEmpty: {
            errorMessage: "SubCategory name should not be empty",
        },
        isString: {
            errorMessage: "SubCategory name must be a string",
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
        isInt: {
            options: { min: 1 },
            errorMessage: "Sequence must be an integer greater than 0",
        },
    },
    
};
const subCategoryEditValidation = {
    subCategoryName: {
        in: ["body"],
        exists: {
            errorMessage: "SubCategory name is required",
        },
        notEmpty: {
            errorMessage: "SubCategory name should not be empty",
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
        trim:true,
    },
    
    status: {
        in: ["body"],
        exists: {
            errorMessage: "Status field is required",
        },
        notEmpty: {
            errorMessage: "Status should not be empty",
        },
       
        isIn: {
            options: [["active", "inactive"]],
            errorMessage: "Status must be either 'active' or 'inactive'",
        },
        trim: true,
    },
};

module.exports = { subCategoryValidation ,subCategoryEditValidation};