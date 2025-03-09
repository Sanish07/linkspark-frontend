import { BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import AboutUs from "./components/AboutUs";

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/about" element={<AboutUs/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
