import axios from "../components/util"
import Cookies from "js-cookie"; 
export const addProduct = (formData, resetForm) => {
   return async (dispatch) => {
     try {
    console.log(formData)
       const res = await axios.post("product", formData,{

           headers: {
               Authorization: Cookies.get("token")
           },
          
       }
       );
       
       dispatch({ type: "ADDPROD",payload:res.data });
       
       resetForm();
       
       dispatch(setErrors([]));
 
       
       
     } catch (err) {
       dispatch(setErrors(err.response?.data));
 
       console.log(err);
     }
   };
 };
 export const updateProduct = (formData,resetForm, id) => {
    return async (dispatch) => {
      try {
     console.log(formData)
        const res = await axios.put(`product/${id}`, formData,{
 
            headers: {
                Authorization: Cookies.get("token")
            },
           
        }
        );
        
        dispatch({ type: "EDITPROD",payload:res.data });
        
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