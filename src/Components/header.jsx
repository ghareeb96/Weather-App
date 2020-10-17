import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <header>
            <nav>
                <div className="logo">
                    <h1>Logo</h1>
                </div>
                <ul>
                    <li><Link className="links" to="/">Home</Link></li>
                    <li><Link className="links" to="/about">About</Link></li>
                    <li><Link className="links" to="/contact">Contact Us</Link></li>
                    <li><Link className="links" to="/qrCode">Qr Code</Link></li>
                    <li><Link className="links" to="/movies">Movies</Link></li>
                </ul>

            </nav>
        </header>
    )
}

export default Nav;