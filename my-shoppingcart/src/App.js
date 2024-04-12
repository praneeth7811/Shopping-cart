import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Product from './Component/Product';
import ProductDetail from './Component/ProductDetail';
import SearchItem from './Component/SearchItem';
import Cart from './Component/Cart';
import UserLogin from './Component/UserLogin';
import { items } from './Component/ItemList';
import Signup from './Component/Signup';
import axios from 'axios'; // Import Axios for HTTP requests

const App = () => {
  const [data, setData] = useState([...items]);
  const [cart, setCart] = useState([]);

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8080/users/login', {
        username,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        // Redirect or navigate to another page after successful login
      } else {
        throw new Error('Invalid username/password');
      }
    } catch (error) {
      console.error('Login Error:', error.message);
      throw new Error('Error logging in');
    }
  };
  const handleSignup = async (formData) => {
    try {
      const response = await axios.post('http://localhost:8080/users', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        
        alert('Account created successfully!');
      } else {
        throw new Error('Failed to create user.');
      }
    } catch (error) {
      console.error('Signup Error:', error.message);
      alert('Failed to create account. Please try again.');
    }
  };
  return (
    <>
      <Router>
        <Navbar cart={cart} setData={setData} />
        <Routes>
          <Route path="/" element={<Product cart={cart} setCart={setCart} items={data} />} />
          <Route path="/product/:id" element={<ProductDetail cart={cart} setCart={setCart} />} />
          <Route path="/search/:term" element={<SearchItem cart={cart} setCart={setCart} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/userlogin" element={<UserLogin onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
