import AddCategory from "./components/addCategory";
import { Category} from "./components/category";
import Dashboard from "./components/dashboard";
import ForgotPassword from "./components/forgotPassword";
import Login from "./components/login";
import PrivateRoute from "./components/privateRoute";
import Register from "./components/register";
import {
  BrowserRouter
,Route,Routes



} from "react-router-dom"
import SubCategory from "./components/subCategory";
import AddSubCategory from "./components/addSubCategory";
import Product from "./components/product";
import AddProduct from "./components/addProduct";
import EditCategory from "./components/editCategory";
import EditSubCategory from "./components/editSubCategory";
import EditProduct from "./components/editProduct";
import ProductDetail from "./components/productDetail";

function App() {
  return (

    <>

      <BrowserRouter>
        <Routes>

          <Route index element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/product" element={<PrivateRoute><Product/></PrivateRoute>}/>
          <Route path="/addProduct" element={<PrivateRoute><AddProduct/></PrivateRoute>}/>
          <Route path="/editCategory" element={<PrivateRoute><EditCategory/></PrivateRoute>}/>
          <Route path="/editSubCategory" element={<PrivateRoute><EditSubCategory/></PrivateRoute>}/>
          <Route path="/editProduct" element={<PrivateRoute><EditProduct/></PrivateRoute>}/>
          <Route path="/detailProduct" element={<PrivateRoute><ProductDetail/></PrivateRoute>}/>
          <Route path="/category" element={<PrivateRoute><Category/></PrivateRoute>}/>
          <Route path="/addcategory" element={<PrivateRoute><AddCategory/></PrivateRoute>}/>
          <Route path="/addsubcategory" element={<PrivateRoute><AddSubCategory/></PrivateRoute>}/>
          <Route path="/subCategory" element={<PrivateRoute><SubCategory/></PrivateRoute>}/>
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        </Routes>


      </BrowserRouter>
    </>

  );
}

export default App;
