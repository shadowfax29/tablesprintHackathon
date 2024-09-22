const initialvalue = {
    data: [], // Array of categories
    serverErrors: [], // Array to store server errors
};

const categoryReducer = (state = initialvalue, action) => {
    switch (action.type) {
        case "ADD": {
            return {
                ...state,
                data: [...state.data, action.payload], // Add new category to the data array
            };
        }
        case "EDIT": {
            const updatedData = state.data.map(category =>
                category._id === action.payload._id ? action.payload : category
            );
            return {
                ...state,
                data: updatedData, // Update category with matching _id
            };
        }
        case "SET_ERRORS": {
            return {
                ...state,
                serverErrors: action.payload, // Set server errors
            };
        }
        default: {
            return state; // Return unchanged state by default
        }
    }
};

export default categoryReducer;
