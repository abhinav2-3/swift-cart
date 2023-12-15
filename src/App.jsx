import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./compoenents/Header";
import Home from "./screens/Home";
import About from "./screens/About";
import Products from "./screens/Products";
import Contacts from "./screens/Contacts";
import Cart from "./screens/Cart";
import SingleProduct from "./compoenents/SingleProduct";
import ErrorPage from "./compoenents/ErrorPage";
import Footer from "./compoenents/Footer";
import "./styles/App.scss";
import PrivateComponent from "./compoenents/PrivateComponent";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateComponent />}>
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contacts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/singleProduct/:id" element={<SingleProduct />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
