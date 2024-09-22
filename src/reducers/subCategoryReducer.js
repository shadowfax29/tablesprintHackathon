const initialvalue={
    data:[],
    serverErrors:[],
    
}
 const subCategoryReducer=(state=initialvalue,action)=>{
    switch(action.type){
      case "ADDSUB":{
        return{
            ...state,data:action.payload
        }
      }
      case "EDITSUB": {
        const updatedData = state.data.map(sub =>
            sub._id === action.payload._id ? action.payload : sub
        );
        return {
            ...state,
            data: updatedData, // Update category with matching _id
        };
    }
        case "SET_ERRORS":{
            return {...state,serverErrors:action.payload}
        }
default:{
    return {...state}
}
    }
}
export default subCategoryReducer