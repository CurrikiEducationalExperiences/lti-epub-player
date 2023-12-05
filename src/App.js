import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Player from "./pages/player";
import Player1 from "./pages/player1";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/deeplink" element={<Home />} />
          <Route path="/play/:id" element={<Player1 />} />
          <Route path="/play" element={<Player1 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
