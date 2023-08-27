import "./App.css";
import Home from "./components/Home";
import Difficulty from "./components/Difficulty";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quiz from "./components/Quiz";

function App() {
 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/difficulty" element={<Difficulty />}></Route>
          <Route exact path="/quiz" element={<Quiz />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
