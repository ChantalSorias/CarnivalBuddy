import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange, purple } from '@mui/material/colors';
import Admin from './Admin/Admin';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[900],
    },
    secondary: {
      main: orange["A400"],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
