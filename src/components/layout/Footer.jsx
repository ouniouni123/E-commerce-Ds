import React from 'react';

const Footer = () => {
  return (
    <footer className="py-4 border-top mt-5">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center text-muted small">
        <span>© {new Date().getFullYear()} Tech&Style Store</span>
        <span>Built with React · React Router · React Bootstrap</span>
      </div>
    </footer>
  );
};

export default Footer;
