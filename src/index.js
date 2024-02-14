import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
//import App from './App';
import reportWebVitals from './reportWebVitals';

//import { LibraryHeader } from './Components/Library-Header/Library-Header';
import { LibraryIndex } from './Components/Library-Index/Library-index';
import { CookiesProvider } from 'react-cookie';
//import { BooksHome } from './Components/HomePage/Home';

//import { Books } from './Components/HomePage/Books';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CookiesProvider>
    <LibraryIndex></LibraryIndex>  

    </CookiesProvider>
  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
