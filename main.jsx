import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { BucketListProvider } from './context/BucketListContext';
import './index.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BucketListProvider>
          <App />
        </BucketListProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);