import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import railwayTheme from '../theme/theme';

const AppThemeProvider = ({ children }) => {
  return (
    <ThemeProvider theme={railwayTheme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
  )
};

export default AppThemeProvider;