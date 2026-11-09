import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppThemeProvider } from './app/providers/AppThemeProvider';
import AppRouter from './app/routes/AppRouter';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppThemeProvider>
      <AppRouter />
    </AppThemeProvider>
  </React.StrictMode>
);