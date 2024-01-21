import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./routes/home";
import MainPage from "./routes/main";
import VotePage from "./routes/vote";
import HistoryPage from "./routes/history";

function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/vote" element={<VotePage/>} />
          <Route path="/history" element={<HistoryPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
