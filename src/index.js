import React from 'react';

import ReactDOM from 'react-dom/client';
import './index.css';
import "./App.css" ;
import App from './App';

import {Provider} from "react-redux"
import configureStore from './store/configureStore';
const store=configureStore()
console.log("react-redux",store.getState())
store.subscribe(()=>{
  console.log("reduc state",store.getState())
})
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  
    <Provider store={store}>
<App />
</Provider>


   

);
