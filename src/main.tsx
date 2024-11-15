import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import './index.css';
import App from './App.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContainer position="top-right" />
    <App />
  </StrictMode>,
);
