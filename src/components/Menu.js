import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => (
  <div className="menu">
    <Link to="/dogs">Dogs</Link>
    <Link to="/cats">Cats</Link>
    <Link to="/birds">Birds</Link>
  </div>
);

export default Menu;