import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./Hero";
import Escaped from "./Escaped";
import Trapped from "./Trapped";
import Wrongp from "./Wrongp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/escaped" element={<Escaped />} />
        <Route path="/trapped" element={<Trapped />} />
        <Route path="/wrongp" element={<Wrongp />} />
      </Routes>
    </Router>
  );
}

export default App;
