import React, { StrictMode } from 'react'; 
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Toaster } from 'react-hot-toast';
import {store} from './redux-store/store.js';
import {Provider} from 'react-redux';
import { ThemeProvider } from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
    <ThemeProvider>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
    <App />

    </ThemeProvider>


  </Provider>




  </StrictMode>,
);