import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, BrowserRouter as Router} from 'react-router-dom';
import { AppContextProvider } from './AppContext';
import "react-toastify/dist/ReactToastify.min.css";import { SearchContext, SearchProvider } from './searchContext';
;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
<AppContextProvider>
  <BrowserRouter>
  
<SearchProvider>
      <App />
</SearchProvider>
  
  </BrowserRouter>
</AppContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
