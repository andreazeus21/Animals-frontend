import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import DogsPage from './pages/DogsPage';
import CatsPage from './pages/CatsPage';
import BirdsPage from './pages/BirdsPage';
import ParticlesComponent from './components/particles';
import AdminPage from './components/AdminPage';
import AdminDogGallery from './components/AdminDogGallery';
import AdminCatGallery from './components/AdminCatGallery';
import AdminBirdGallery from './components/AdminBirdGallery';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/dogs" element={<DogsPage />} />
      <Route path="/cats" element={<CatsPage />} />
      <Route path="/birds" element={<BirdsPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/dogs" element={<AdminDogGallery />} />
      <Route path="/admin/cats" element={<AdminCatGallery />} />
      <Route path="/admin/birds" element={<AdminBirdGallery />} />
    </Routes>
    <ParticlesComponent id="particles" />
  </Router>
);

export default App;
