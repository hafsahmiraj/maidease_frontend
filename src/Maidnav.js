import React from 'react';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/lara-light-indigo/theme.css';  // Theme
import 'primereact/resources/primereact.min.css';                  // Core CSS
import 'primeicons/primeicons.css';                                // Icons

export default function MaidNav() {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0.8rem 2rem',
            backgroundColor: 'white',
            boxShadow: '0px 2px 8px rgba(0,0,0,0.1)'
        }}>
            {/* Left side - Logo and Title */}
            <img alt="logo" src="/logo.png" height="40" className="mr-2" />
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'black', flex: '0 0 auto' }}>
                MaidEase
            </div>

            {/* Center - Search Bar */}
            <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
                    <i 
                        className="pi pi-search" 
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '1rem',
                            transform: 'translateY(-50%)',
                            color: '#888'
                        }}
                    />
                    <InputText 
                        placeholder="Search by skill" 
                        style={{
                            width: '100%',
                            paddingLeft: '3rem',
                            textAlign: 'center'
                        }} 
                    />
                </div>
            </div>

            {/* Right side - Menu Links */}
            <div style={{ display: 'flex', gap: '1rem', flex: '0 0 auto', alignItems: 'center' }}>
                <a href="#" style={{ textDecoration: 'none', color: 'black', fontSize: '1rem' }}>Profile</a>
                <a href="#" style={{ textDecoration: 'none', color: 'black', fontSize: '1rem' }}>Hired</a>
                <a href="#" style={{ textDecoration: 'none', color: '#6366F1', fontWeight: 'bold', fontSize: '1rem' }}>Login</a>
            </div>
        </div>
    )
}
