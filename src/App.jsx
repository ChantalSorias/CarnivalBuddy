import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange, purple } from '@mui/material/colors';
import Admin from './Admin/Admin';
import Feed from './Feed/Feed';
import LogIn from './LogIn/LogIn';
import CreateProfile from './CreateProfile/CreateProfile';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[900],
      light: purple[50]
    },
    secondary: {
      main: orange["A400"],
      light: orange["200"]
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<CreateProfile />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
