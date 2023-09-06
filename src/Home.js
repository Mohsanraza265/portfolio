
import styled, { ThemeProvider } from 'styled-components';
import './App.css';
import { darkTheme } from './utils/Themes';
import Navbar from './components/Navbar';

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
`

function Home() {
  return (
    <ThemeProvider theme={darkTheme} >
      
        <Navbar />
        <Body>

        </Body>
      
    </ThemeProvider>
  );
}

export default Home;
