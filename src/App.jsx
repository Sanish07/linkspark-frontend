import { BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import AboutUs from "./components/AboutUs";
import Navbar from "./components/elements/Navbar";
import Footer from "./components/elements/Footer";

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/about" element={<AboutUs/>}/>
          </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
