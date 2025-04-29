import React from 'react';
import './components/styles.css';

export default function AboutUsPage() {
    return (
        <div className="about-us-container">
            <h2 text-size="500px" >About Us</h2>

            <section className="about-section">
                <h3>Our Mission</h3>
                <p>
                    At MaidEase, we are dedicated to providing top-notch maid services to households
                    around the city. Our mission is to make everyday life easier and more convenient for our clients by
                    offering reliable, vetted, and highly skilled maids who are trained to meet a variety of household needs.
                </p>
            </section>

            <section className="about-section">
                <h3>Our Vision</h3>
                <p>
                    Our vision is to become the most trusted and efficient maid service provider,
                    known for our commitment to customer satisfaction and creating a positive work environment for our maids.
                    We aim to revolutionize the way households hire and manage maid services by using technology and innovation.
                </p>
            </section>

            <section className="about-section">
                <h3>Our Values</h3>
                <ul>
                    <li>Integrity: We believe in honesty and transparency in everything we do.</li>
                    <li>Reliability: We provide dependable services that our clients can count on.</li>
                    <li>Respect: We treat our employees and customers with the utmost respect and understanding.</li>
                    <li>Quality: We ensure that every service meets high standards of excellence.</li>
                </ul>
            </section>

            <section className="about-section">
                <h3>Contact Us</h3>
                <p>
                    Have any questions or need assistance? 
                    <br></br>Feel free to reach out to us:
                </p>
                <ul>
                    <li>Email: <a href="mailto:support@maidease.com">support@maidease.com</a></li>
                    <li>Phone: <a href="tel:+123456789">+1 234 567 89</a></li>
                    <li>Address: Lahore, Pakistan</li>
                </ul>
            </section>
        </div>
    );
}
