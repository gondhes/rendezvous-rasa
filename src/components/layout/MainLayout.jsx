import React from 'react';
import NavBar from '../common/NavBar';
import Footer from '../common/Footer';
import styles from '../../assets/styles/MainLayout.module.css'; // Ensure this file exists and contains the necessary styles

const MainLayout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <main className="bg-white">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;