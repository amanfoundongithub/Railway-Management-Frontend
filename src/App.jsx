import React from 'react';
import AppThemeProvider from './app/providers/AppThemeProvider';
import AppRouter from './app/routes/AppRouter';

const App = () => {
  return (
    // Wrap the router in the Material UI theme and CSS Baseline
    <AppThemeProvider>
      
      {/* Any other global providers (AuthContext, Redux Provider) go here */}
      
      <AppRouter />
      
    </AppThemeProvider>
  );
};

export default App;