import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import LogoDisplay from './LogoDisplay';

export default function SideBar(props) {

    const history = useHistory();

    let logoutHandler = () => {
        localStorage.clear("token")
        props.closeMenu();
        history.push("/")
    }
    let isAuth = props.isAuth;

    return (
        <div>
            {/* <LogoDisplay size={30} /> */}
            <Link to="/" onClick={props.closeMenu} className="bm-item">Home</Link>
            {
                isAuth && <>
                    <Link to="/records" onClick={props.closeMenu} className="bm-item">Records</Link>
                    <Link to="#" onClick={logoutHandler} className="bm-item">Logout</Link>
                </>
            }
            {
                !isAuth && <>
                    <Link to="/register" onClick={props.closeMenu} className="bm-item">Register</Link>
                    <Link to="/login" onClick={props.closeMenu} className="bm-item">Login</Link>
                </>
            }
        </div>
    )
}
