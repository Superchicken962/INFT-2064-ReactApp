import './App.css';
import { Outlet } from 'react-router-dom';

export default function StrudelDemo() {

    return (
        <div className="App container">
            <h2>Strudel Demo</h2>

            <Outlet />
        </div>
    )

};