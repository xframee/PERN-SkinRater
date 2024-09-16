import './App.css';
import { NavBar } from './components/Navbar';
import { Route, Routes } from "react-router-dom";
import { Home } from './pages/Home';
import { ThemeProvider } from '@mui/material/styles';
import theme from './utilities/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
