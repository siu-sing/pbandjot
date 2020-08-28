import React from 'react'
import { Link } from 'react-router-dom'

export default function SideBar(props) {
    return (
        <div>
            <Link to="/" onClick={props.closeMenu} className="bm-item">Home</Link>
            <Link to="/workouts" onClick={props.closeMenu} className="bm-item">Workouts</Link>
            <Link to="/register" onClick={props.closeMenu} className="bm-item">Register</Link>
            <Link to="/login" onClick={props.closeMenu} className="bm-item">Login</Link>
        </div>
    )
}
