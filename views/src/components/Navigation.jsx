import React, { useState } from 'react'
import SideBar from './SideBar'
// import LogoDisplay from './LogoDisplay';
import { slide as Menu } from 'react-burger-menu'
// import { Button } from 'react-bootstrap';


export default function Navigation(props) {

    const [open, setOpen] = useState(false);

    let handleStateChange = (state) => {
        setOpen(state.isOpen)
    }
    let closeMenu = () => {

        setOpen(false);
        // console.log(open)
        console.log("something happened")
    }

    return (
        <>
            <Menu
                width={150}
                isOpen={open}
                onStateChange={(state) => handleStateChange(state)}
                // noTransition
                pageWrapId={"page-wrap"} outerContainerId={"outer-container"}
            >
                {/* <Button onClick={closeMenu}>Toggle</Button> */}
                <SideBar
                    closeMenu={closeMenu}
                    isAuth={props.isAuth}
                    logoutHandler = {props.logoutHandler}
                />
            </Menu>
        </>
    )
}
