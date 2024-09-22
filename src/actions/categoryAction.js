 import axios from "../components/util"
 import Cookies from "js-cookie"; 
export const addCategory = (formData, resetForm) => {
    return async (dispatch) => {
      try {
     
        const res = await axios.post("category", formData,{

            headers: {
                Authorization: Cookies.get("token")
            },
           
        }
        );
        
        dispatch({ type: "ADD",payload:res.data });
        
        resetForm();
        
        dispatch(setErrors([]));
  
        
        
      } catch (err) {
        dispatch(setErrors(err.response?.data));
  
        console.log(err);
      }
    };
  };
  export const editCategory = (formData, resetForm,id) => {
    return async (dispatch) => {
      console.log(id)
      try {
     
        const res = await axios.put(`category/${id}`, formData,{

            headers: {
                Authorization: Cookies.get("token")
            },
           
        }
        );
        
        dispatch({ type: "EDIT",payload:res.data });
        
        resetForm();
        
        dispatch(setErrors([]));
  
        
        
      } catch (err) {
        dispatch(setErrors(err.response?.data));
  
        console.log(err);
      }
    };
  };
  const setErrors = (error) => {
    return { type: "SET_ERRORS", payload: error };
  };