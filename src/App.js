import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Portfolio from './Portfolio';
import Admin from './Admin';
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

function App() {
  return (

    <Router>
      <ReactLenis
        root
        options={{
          duration: 1.2,
          smoothWheel: true,
          wheelMultiplier: 0.9,
          touchMultiplier: 1,
          anchors: {
            offset: -80,
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin123" element={<Admin />} />
      </Routes>
    </Router>

  );
}

export default App;
