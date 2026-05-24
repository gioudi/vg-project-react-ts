import type { FC } from "react";
import { Link, useLocation } from 'react-router-dom';

export const Navbar: FC = () => {
    const location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg bg-primary-light shadow-md py-3 mb-5 ">
            <div className="container-fluid">
                <a className="navbar-brand rufina-bold text-primary-lightest tracking-wide" href="#">
                    VGDB Admin
                </a>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto font-lato text-size-normal">
                        <li className="nav-item me-3">
                            <Link 
                                className={`nav-link ${location.pathname === '/' ? 'lato-bold text-primary-light' : 'text-gray-light'}`} 
                                to="/"
                            >
                                Game Catalog
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className={`nav-link ${location.pathname === '/inventory' ? 'lato-bold text-primary-light' : 'text-gray-light'}`} 
                                to="/inventory"
                            >
                                Inventory Catalog
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};