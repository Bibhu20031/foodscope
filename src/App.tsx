import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/ProductDetail";
import { ProductProvider } from "./context/Product.Context";
import './index.css'

function App(){
  return (
    <ProductProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/product/:code" element={<Product/>}/>
      </Routes>
    </BrowserRouter>
    </ProductProvider>
    
  )
}

export default App;