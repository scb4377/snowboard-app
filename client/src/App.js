import "./App.css";
import React, { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { HeroImg } from "./components/HeroImg";
import { Products } from "./components/Products";
import { Cart } from "./components/Cart";
import { CartContext } from "./contexts/CartContext";
import { About } from "./components/About";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import axios from 'axios';



function App() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [isSelected, setIsSelected] = useState("home");
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoginShown, setLoginShown] = useState(false)
  const [isRegisterShown, setRegisterShown] = useState(false);

  const getData = () => {
    axios.get('/api/products')
      .then(data => {
        console.log(data.data)
        setProducts(data.data)
      })
      .catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <>
      <CartContext.Provider
        value={{ cart, setCart, isSelected, setIsSelected, total, setTotal, products, setLoginShown, setRegisterShown }}
      >
        <Navbar />
        {isLoginShown && <Login />}
        {isRegisterShown && <Register />}
        {isSelected === "home" && (
          <>
            <HeroImg />
            <Products />
          </>
        )}
        {isSelected === "cart" && (
          <>
            <Cart />
          </>
        )}
        {isSelected === "about" && <About />}
      </CartContext.Provider>
    </>
  );
}

export default App;
