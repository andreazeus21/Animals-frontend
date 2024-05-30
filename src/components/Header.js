import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>Animal Gallery</h1>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/admin">Admin</Link>
      <Link to="/about">About Us</Link>
      <Link to="/contact">Contact Us</Link>
    </nav>
  </header>
);

export default Header;