import axios from "../components/util";
import Cookies from "js-cookie";

export const startRegister = (formData, resetForm, navigate) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("user/register", formData);
      console.log(res.data);
      dispatch({ type: "REGISTER", payload: res.data });
      resetForm();
      dispatch(setErrors([]));
      
     
    } catch (err) {
     
      dispatch(setErrors(err.response.data.errors));
      
    }
  };
};

export const startLogin = (formData, resetForm, navigate) => {
  return async (dispatch) => {
    try {
   console.log(formData)
      const res = await axios.post("http://localhost:5000/user/login", formData
      );
      const {token,user } = res.data;
    
      Cookies.set("token", token, { expires: 1, secure: true });
      Cookies.set("currentUser", JSON.stringify(user), { expires: 1, secure: true });

      navigate("/dashboard")
      dispatch({ type: "LOGIN",payload:user });
      
      resetForm();
      
      dispatch(setErrors([]));

      
      
    } catch (err) {
      dispatch(setErrors(err.response?.data));

      console.log(err);
    }
  };
};

export const startForgotPassword = (formData, resetForm,toast) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("user/forgotPassword", formData);
      resetForm();
      dispatch(setErrors([]));
      toast.success("Password reset link sent to your email")
    } catch (err) {
      console.log(err);
      dispatch(setErrors(err.response.data));
    }
  };
};

export const startResetPassword = (
  formData,
  resetForm,
  userId,
  setLoading,
  setSuccess,
  setError,
  navigate
) => {
  return async (dispatch) => {
    setLoading(true);
    try {
      const res = await axios.put(`user/resetPassword/${userId}`, formData);
      setLoading(false);
      setSuccess(res?.data?.message);
      resetForm();
      setError("");
      dispatch(setErrors([]));
      navigate("/login"); 
        } catch (err) {
      setLoading(false);
      const errorMessage = err.response?.data?.error || "Something went wrong";
      dispatch(setErrors(errorMessage));
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    dispatch({ type: "LOGOUT" });
  };
};

const setErrors = (error) => {
  return { type: "SET_ERRORS", payload: error };
};
