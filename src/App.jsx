import React from 'react';
import AppThemeProvider from './app/providers/AppThemeProvider';
import { BookingProvider } from './app/providers/BookingProvider';
import AppRouter from './app/routes/AppRouter';

const App = () => {
  return (
    // Wrap the router in the Material UI theme and CSS Baseline
    <AppThemeProvider>
      <BookingProvider>
                <AppRouter />
      </BookingProvider>            
    </AppThemeProvider>
  );
};

export default App;