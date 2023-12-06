import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Player from "./pages/player";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/deeplink" element={<Home />} />

          <Route path="/play" element={<Player />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
