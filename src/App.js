import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/deeplink" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
