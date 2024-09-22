const initialvalue={
    data:[],
    serverErrors:[],
    
}
 const productReducer=(state=initialvalue,action)=>{
    switch(action.type){
      case "ADDPROD":{
        return{
            ...state,data:action.payload
        }
      }
      case "EDITPROD": {
        const updatedData = state.data.map(prod =>
            prod._id === action.payload._id ? action.payload : prod
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
export default productReducer