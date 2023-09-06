import { BrowserRouter as Router } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import './App.css';
import { darkTheme } from './utils/Themes';
import Navbar from './components/Navbar';


const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
`

function App() {
  return (
    <ThemeProvider theme={darkTheme} >
      <Router>
        <Navbar />
        <Body>

        </Body>
      </Router>
    </ThemeProvider>
  );
}

export default App;
