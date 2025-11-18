import './App.css';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useRef } from 'react';
import { AlertContext } from './components/alert/AlertContext';
import AlertManager from './components/alert/AlertManager';

export default function StrudelDemo() {
    const alertRef = useRef(null);

    return (
        <div>
            <nav className="navbar navbar-expand lg navbar-dark bg-secondary bg-gradient mb-3">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">MusicMixer</Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav">
                            {/* Use NavLink so that the active page link is given the 'active' className. */}
                            <NavLink className="nav-link" to="/">Mixer</NavLink>
                            <NavLink className="nav-link" to="/editor">Editor</NavLink>
                        </div>
                    </div>
                </div>
            </nav>
            
            <AlertContext.Provider value={{ alertRef }}>
                <div className="col-md-8">
                    <AlertManager ref={ alertRef }></AlertManager>
                </div>
                
                <Outlet/>
            </AlertContext.Provider>

        </div>
    )

};