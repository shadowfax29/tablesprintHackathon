import {createStore,combineReducers,applyMiddleware} from "redux"
import {thunk} from "redux-thunk"
import userReducer from "../reducers/userReducer"
import categoryReducer from "../reducers/categoryReducer"
import subCategoryReducer from "../reducers/subCategoryReducer"
import productReducer from "../reducers/productReducer"

const configureStore=()=>{
    const store=createStore(combineReducers({
user:userReducer,
category:categoryReducer,
subCategory:subCategoryReducer,
product:productReducer
    }),applyMiddleware(thunk))
    return store

}
export default configureStore