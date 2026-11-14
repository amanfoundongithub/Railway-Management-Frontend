import AppThemeProvider from './app/AppThemeProvider';
import { BookingProvider } from "./screens/booking/common/BookingProvider";
import AppRouter from './app/AppRouter';

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