import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeNoFetch from './pages/HomeNoFetch.jsx';
import CardProduct from './pages/CardProduct.jsx';
import Home from './pages/Home';
import Cart from "./pages/Cart"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/listNotFetch" element={<HomeNoFetch/>}/>
        <Route path="/Cart" element={<Cart/>}/>
        <Route path="/CardProd" element={<CardProduct/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
