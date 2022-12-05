import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ContextProvider } from './components/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <ContextProvider><App /></ContextProvider>
);
reportWebVitals();