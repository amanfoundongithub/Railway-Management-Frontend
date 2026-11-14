import { createTheme } from '@mui/material/styles';
import '@fontsource/outfit/300.css';
import '@fontsource/outfit/400.css';
import '@fontsource/outfit/500.css';
import '@fontsource/outfit/600.css';
import '@fontsource/outfit/700.css';

const railwayTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#17324D',
      light: '#355675',
      dark: '#102538',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#168A83',
      light: '#48AAA2',
      dark: '#0E6863',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#E7A23B',
      light: '#F2BE69',
      dark: '#B9781E',
      contrastText: '#17324D',
    },
    success: {
      main: '#2E8B68',
      light: '#64AC89',
      dark: '#21694E',
      contrastText: '#ffffff',
    },
    error: {
      main: '#C6534B',
      light: '#D87971',
      dark: '#963A35',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F4F7F9',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#203244',
      secondary: '#647586',
    },
    divider: '#E1E8ED',
  },
  typography: {
    fontFamily: '"Outfit", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
      letterSpacing: '-0.03em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.25rem',
      letterSpacing: '-0.02em',
    },
    h3: {
      fontWeight: 650,
      letterSpacing: '-0.015em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '10px 24px',
          boxShadow: 'none',
          borderRadius: 10,
          '&:hover': {
            boxShadow: '0 4px 12px rgb(23 50 77 / 0.14)',
          },
        },
        containedSecondary: {
          color: '#ffffff',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: '1px solid #E8EDF1',
          boxShadow: '0 8px 24px rgb(23 50 77 / 0.06)',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'medium',
      },
    },
  },
});

export default railwayTheme;