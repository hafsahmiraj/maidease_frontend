import React from 'react';
import './aboutus.css';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

function AboutUs() {
  return (
    <>
      <div className="aboutus-page">
        <header className="top-nav">
          <h1>ABOUT US</h1>
        </header>

        <section className="about-banner">
          <p className="banner-text">
            MaidEase is a trusted platform that connects homes and offices in Pakistan with reliable, background-verified domestic staff. From maids and cleaners to nannies and cooks, we offer full-time, part-time, and on-demand support tailored to your needs. Our mission is to make hiring domestic help simple, safe, and stress-free.
          </p>
        </section>

        <section className="who-we-are">
          <h3>Who We Are</h3>
          <div className="cards-container">
            <div className="info-card">
              <img 
                src={`${process.env.PUBLIC_URL}/aboutus/about1.jpg`} 
                alt="Trained Maids" 
              />
              <h4>Trained Maids</h4>
              <p>All our maids are background-checked and trained to ensure safety.</p>
            </div>
            <div className="info-card">
              <img 
                src={`${process.env.PUBLIC_URL}/aboutus/about2.jpg`} 
                alt="Fast Service" 
              />
              <h4>Fast Service</h4>
              <p>Get your tasks done quickly with our skilled professionals.</p>
            </div>
            <div className="info-card">
              <img 
                src={`${process.env.PUBLIC_URL}/aboutus/about3.jpg`} 
                alt="Nationwide Network" 
              />
              <h4>Nationwide Network</h4>
              <p>We connect homes across Pakistan to dependable domestic help.</p>
            </div>
            <div className="info-card">
              <img 
                src={`${process.env.PUBLIC_URL}/aboutus/about4.jpg`} 
                alt="Easy Booking" 
              />
              <h4>Easy Booking</h4>
              <p>Seamless online process to book trusted professionals at your convenience.</p>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="social-icons">
            <a href="https://facebook.com"><FaFacebook size={20} /></a>
            <a href="https://twitter.com"><FaTwitter size={20} /></a>
            <a href="https://instagram.com"><FaInstagram size={20} /></a>
          </div>
          <p>
            Contact us: <a href="mailto:support@maidease.pk">support@maidease.pk</a> | <a href="tel:+923001234567">+92 300 1234567</a>
          </p>
          <p>&copy; 2025 MaidEase. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

export default AboutUs;
