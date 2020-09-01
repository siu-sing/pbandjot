import React from 'react'
import { Link, useHistory } from 'react-router-dom'

export default function SideBar(props) {

    const history = useHistory();
    
    let logoutHandler = () => {    
        localStorage.clear("token")
        props.closeMenu();
        history.push("/")   
    }

    return (
        <div>
            <Link to="/" onClick={props.closeMenu} className="bm-item">Home</Link>
            <Link to="/records" onClick={props.closeMenu} className="bm-item">Records</Link>
            <Link to="/register" onClick={props.closeMenu} className="bm-item">Register</Link>
            <Link to="/login" onClick={props.closeMenu} className="bm-item">Login</Link>
            <Link to="#" onClick={logoutHandler} className="bm-item">Logout</Link>
        </div>
    )
}
