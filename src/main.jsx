import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AUTH_CONFIG } from './config/authConfig.js';
import { AuthProvider } from './context/AuthContext.js';
import { SnackbarProvider } from './context/SnackbarContext.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <SnackbarProvider>
        <GoogleOAuthProvider clientId={AUTH_CONFIG.GOOGLE_CLIENT_ID}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </GoogleOAuthProvider>
      </SnackbarProvider>
    </AuthProvider>
  </StrictMode>,
)
