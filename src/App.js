import React from 'react';
import './App.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProblemsSection from './components/ProblemsSection';
import ScanSection from './components/ScanSection';
import Footer from './components/Footer';
import Mouth from './components/Mouth';


function App() {
  return (
    <div className="App">
      <HeroSection />
      <ProblemsSection />
      <ScanSection />
      <Footer />
    </div>
  );
}

export default App;
