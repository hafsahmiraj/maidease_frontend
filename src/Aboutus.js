import React from 'react';
import './components/styles.css';  // Assuming you have a separate CSS file for styling

export default function AboutUsPage() {
    return (
        <div className="about-us-container">
            <div className="about-header">
                <h2>About MaidEase</h2>
                <p>Reliable Maid Services at Your Doorstep</p>
            </div>

            <section className="about-section mission">
                <h3>Our Mission</h3>
                <p>
                    MaidEase is committed to providing exceptional and dependable maid services that elevate the
                    quality of life for families and households. Our goal is to simplify everyday living through
                    accessible, affordable, and highly skilled cleaning, cooking, babysitting, and other maid services.
                </p>
            </section>

            <section className="about-section vision">
                <h3>Our Vision</h3>
                <p>
                    We envision becoming the most trusted and innovative maid service provider, creating a seamless
                    connection between households and maids, using technology and human-centered services to meet your
                    needs with excellence.
                </p>
            </section>

            <section className="about-section values">
                <h3>Our Values</h3>
                <ul>
                    <li>Integrity: We operate with transparency and honesty.</li>
                    <li>Reliability: We ensure that our clients can trust us with their homes.</li>
                    <li>Respect: Every maid and client deserves dignity and respect in all interactions.</li>
                    <li>Quality: Excellence is our benchmark. We ensure high standards in all services.</li>
                </ul>
            </section>

            <section className="about-section team">
                <h3>Meet Our Team</h3>
                <div className="team-members">
                    <div className="team-member">
                        <img src="/images/team1.jpg" alt="Team Member 1" />
                        <h4>John Doe</h4>
                        <p>CEO & Founder</p>
                    </div>
                    <div className="team-member">
                        <img src="/images/team2.jpg" alt="Team Member 2" />
                        <h4>Jane Smith</h4>
                        <p>Operations Manager</p>
                    </div>
                    <div className="team-member">
                        <img src="/images/team3.jpg" alt="Team Member 3" />
                        <h4>Mary Johnson</h4>
                        <p>Customer Support Lead</p>
                    </div>
                </div>
            </section>

            <section className="about-section contact">
                <h3>Contact Us</h3>
                <p>If you have any questions, feel free to get in touch with us.</p>
                <ul>
                    <li>Email: <a href="mailto:support@maidease.com">support@maidease.com</a></li>
                    <li>Phone: <a href="tel:+123456789">+1 234 567 89</a></li>
                    <li>Address: 123 MaidEase Street, Lahore, Pakistan</li>
                </ul>
            </section>
        </div>
    );
}
