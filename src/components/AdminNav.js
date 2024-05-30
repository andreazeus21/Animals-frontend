import React from 'react';
import { Link } from 'react-router-dom';

const AdminNav = () => (
  <div className="menu">
    <Link to="/admin/dogs">Dogs</Link>
    <Link to="/admin/cats">Cats</Link>
    <Link to="/admin/birds">Birds</Link>
  </div>
);

export default AdminNav;