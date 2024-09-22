import axios from "../components/util"
import Cookies from "js-cookie"; 
export const addSubCategory = (formData, resetForm) => {
   return async (dispatch) => {
     try {
    console.log(formData)
       const res = await axios.post("subcategory", formData,{

           headers: {
               Authorization: Cookies.get("token")
           },
          
       }
       );
       
       dispatch({ type: "ADDSUB",payload:res.data });
       
       resetForm();
       
       dispatch(setErrors([]));
 
       
       
     } catch (err) {
       dispatch(setErrors(err.response?.data));
 
       console.log(err);
     }
   };
 };
 export const editSubCategory = (formData, resetForm,id) => {
    return async (dispatch) => {
      try {
     console.log(formData)
        const res = await axios.put(`subcategory/${id}`, formData,{
 
            headers: {
                Authorization: Cookies.get("token")
            },
           
        }
        );
        
        dispatch({ type: "ADDSUB",payload:res.data });
        
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