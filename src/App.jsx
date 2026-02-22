
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { ThemeContext } from './contexts/themeContext.js';
import ThemeProvider from './contexts/ThemeProvider.jsx';

// Page Imports
import Intro from './components/Intro';
import Login from './pages/Login';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ContactUs from './pages/ContactUs';
import Header from './components/Header';
import Footer from './components/Footer';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f7f2f2', // Soft off-white
      paper: '#ffffff',
    },
    primary: {
        main: '#8c6d62', // Muted brown
    },
    text: {
        primary: '#3a3a3a',
        secondary: '#6f6f6f',
    }
  },
  typography: {
    fontFamily: '"Nanum Myeongjo", serif',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1f1f1f', // Deep charcoal
      paper: '#2e2e2e',
    },
    primary: {
      main: '#c5a79d', // Lighter, elegant brown
    },
    text: {
        primary: '#f5f5f5',
        secondary: '#b0b0b0',
    }
  },
  typography: {
    fontFamily: '"Nanum Myeongjo", serif',
  },
});

function AppContent() {
  const { theme } = useContext(ThemeContext);
  const activeTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <MuiThemeProvider theme={activeTheme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} className={`theme-${theme}`}>
            <Header />
            <Box component="main" sx={{ flexGrow: 1, py: 4, px: { xs: 2, md: 4 } }}>
                <Routes>
                    <Route path="/" element={<Intro />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-of-service" element={<TermsOfService />} />
                    <Route path="/contact" element={<ContactUs />} />
                </Routes>
            </Box>
            <Footer />
        </Box>
      </Router>
    </MuiThemeProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
