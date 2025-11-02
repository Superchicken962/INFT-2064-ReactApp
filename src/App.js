import './App.css';
import { Link, NavLink, Outlet } from 'react-router-dom';

export default function StrudelDemo() {
    
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

            <Outlet />
        </div>
    )

};