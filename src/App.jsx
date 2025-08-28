import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange, purple } from '@mui/material/colors';
import CarnivalManagement from './Admin/Carnivals/CarnivalManagement';
import Feed from './Feed/Feed';
import LogIn from './LogIn/LogIn';
import ProfileForm from './ProfileForm/ProfileForm';
import ViewProfile from './ViewProfile/ViewProfile';
import { useAuth } from '../src/context/AuthContext';
import NotFoundPage from './NotFoundPage/NotFoundPage';

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
  const { currentUser } = useAuth();
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/admin/carnivals' element={<CarnivalManagement />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<ProfileForm />} />
        <Route path="/profile/edit" element={ currentUser ? <ProfileForm /> : <LogIn />} />
        <Route path='/profile/:username' element={<ViewProfile />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
