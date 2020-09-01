import React from 'react'
import logo from './logo.svg'
import { Fade as Anim } from "react-awesome-reveal";


export default function LogoDisplay(props) {

    let w = props.size ? props.size : 80
    return (
        <Anim>
            <div className="text-center">
                <div className="square">
                    <img src={logo} alt="pbandjot" width={w} className="p-2" />
                </div>
            </div>
        </Anim>
    )
}
