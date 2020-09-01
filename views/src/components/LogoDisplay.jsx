import React from 'react'
import logo from './logo.svg'

export default function LogoDisplay(props) {

    let w = props.size ? props.size : 80
    return (
        <div className="text-center">
            <div className="square">
            <img src={logo} alt="pbandjot" width={w} className="p-2" />
            </div>
        </div>
    )
}
