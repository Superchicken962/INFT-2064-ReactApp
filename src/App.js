import './App.css';
import { Link, Outlet } from 'react-router-dom';

export default function StrudelDemo() {

    return (
        <div className="App container">
            <nav className="navbar navbar-expand lg navbar-light bg-light mb-3">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">MusicMixer</Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav">
                            <Link className="nav-link active" to="/">Home</Link>
                            <Link className="nav-link" to="/editor">Editor</Link>
                        </div>
                    </div>
                </div>
            </nav>

            <Outlet />
        </div>
    )

};