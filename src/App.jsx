import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Archive from './pages/Archive';
import DialoguePage from './pages/DialoguePage';
import About from './pages/About';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/archive" element={<Archive />} />
      <Route path="/dialogue/:id" element={<DialoguePage />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
