import './App.css';
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import theme from './utilities/theme';
import { NavBar } from './components/Navbar';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import {Skins} from './pages/Skins'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/skins" element={<Skins />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
