'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className={`menu ${isOpen ? 'menu--open' : ''}`}>
      <div className="menu__overlay" onClick={onClose} />
      
      <div className="menu__content">
        <button className="menu__close" onClick={onClose} aria-label="Close menu">
          <span className="menu__close-icon"></span>
        </button>
        
        <nav className="menu__nav">
          <ul className="menu__nav-list">
            <li className="menu__nav-item">
              <Link href="/" className="menu__nav-link" onClick={onClose}>
                <span className="menu__nav-number">01</span>
                <span className="menu__nav-text">Home</span>
              </Link>
            </li>
            <li className="menu__nav-item">
              <Link href="/about" className="menu__nav-link" onClick={onClose}>
                <span className="menu__nav-number">02</span>
                <span className="menu__nav-text">About</span>
              </Link>
            </li>
            <li className="menu__nav-item">
              <Link href="/works" className="menu__nav-link" onClick={onClose}>
                <span className="menu__nav-number">03</span>
                <span className="menu__nav-text">Works</span>
              </Link>
            </li>
            <li className="menu__nav-item">
              <Link href="/playground" className="menu__nav-link" onClick={onClose}>
                <span className="menu__nav-number">04</span>
                <span className="menu__nav-text">Playground</span>
              </Link>
            </li>
            <li className="menu__nav-item">
              <Link href="/contact" className="menu__nav-link" onClick={onClose}>
                <span className="menu__nav-number">05</span>
                <span className="menu__nav-text">Contact</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="menu__footer">
          <div className="menu__social">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="menu__social-link">
              Twitter
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="menu__social-link">
              LinkedIn
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="menu__social-link">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;