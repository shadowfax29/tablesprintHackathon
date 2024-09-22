const initialvalue={
    data:[],
    serverErrors:[],
    isLogIn:false
}
 const userReducer=(state=initialvalue,action)=>{
    switch(action.type){
        case "REGISTER":{
            return {...state,data:action.payload}
        }
        case "LOGIN":{
            return {...state,data:action.payload,islogin:true}
        }
        case "LOGOUT": {
            return { ...state, isLogIn: false, data: [], serverErrors: [] };
          }
       
        case "SET_ERRORS":{
            return {...state,serverErrors:action.payload}
        }
default:{
    return {...state}
}
    }
}
export default userReducer