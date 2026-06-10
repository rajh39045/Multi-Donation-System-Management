import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Toast from '../ui/Toast';

const PublicLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <Toast />
    </div>
  );
};

export default PublicLayout;
