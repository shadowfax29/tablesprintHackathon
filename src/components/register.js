import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startRegister } from "../actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import img from "./images/image.png"
import back from "./images/download.jpg"
const Register = () => {
  const serverErrors = useSelector((state) => state.user.serverErrors);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clientError, setClientError] = useState({});
  const errors = {};

  const handleSubmit = (e) => {
    e.preventDefault();
    const resetForm = () => {
      setEmail("");
      setPassword("");
    };
    validate();
    const formData = { email, password };
    if (Object.keys(errors).length === 0) {
      dispatch(startRegister(formData, resetForm, navigate));
      setClientError({});
    } else {
      setClientError(errors);
    }
  };

  const validate = () => {
    if (email.trim()==0) {
      errors.email = "Email is required";
    }
    if (password.trim()== 0) {
      errors.password = "Password is required";
    }
  };

  return (
    <div className="min-h-screen flex items-center bg-back justify-center  "
    style={{
      backgroundImage: `url(${back})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
    }}>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md relative ">
        <div className="absolute top-[-50px] left-[50%] transform -translate-x-[50%]">
         
          <img src={img} alt="Logo" className="w-16 " />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Welcome to TableSprint Admin</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="text"
              id="email"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {clientError.email && <div className="text-red-600 mt-1">{clientError.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {clientError.password && <div className="text-red-600 mt-1">{clientError.password}</div>}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            register
          </button>
        </form>

        <div className="text-center mt-4">
          already have an account?<Link to="/login" className="text-indigo-600 hover:underline">login</Link>
        </div>

        {serverErrors.length > 0 && (
          <ul className="mt-4 text-red-600">
            {serverErrors?.errors?.length ? (
              serverErrors.errors.map((ele, i) => (
                <li key={i}>{ele.msg}</li>
              ))
            ) : serverErrors?.error ? (
              <li>{serverErrors.error}</li>
            ) : null}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Register;
