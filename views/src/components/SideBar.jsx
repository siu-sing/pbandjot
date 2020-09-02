import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import LogoDisplay from './LogoDisplay';

export default function SideBar(props) {

    let isAuth = props.isAuth;
    const history = useHistory();

    let sideBarLogoutHandler = () => {
        props.closeMenu();
        props.logoutHandler();
        history.push("/home")
    }

    return (
        <div>
            {/* <LogoDisplay size={30} /> */}
            <Link to="/home" onClick={props.closeMenu} className="bm-item">Home</Link>
            {
                isAuth && <>
                    <Link to="/records" onClick={props.closeMenu} className="bm-item">Records</Link>
                    <Link to="#" onClick={sideBarLogoutHandler} className="bm-item">Logout</Link>
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
