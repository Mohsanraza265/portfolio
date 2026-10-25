import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Portfolio from './Portfolio';
import Admin from './Admin';

function App() {
  return (
    
      <Router>
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/admin123" element={<Admin />} />
          </Routes>
      </Router>
    
  );
}

export default App;
