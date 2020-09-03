import React from 'react'
import qrShare from '../../qrHome.png'

export default function QRShare() {
    return (
        <div className="text-center yellow__text">
            <h1 className="my-3">Share your gains with a friend.</h1>
            <div>
                <img src={qrShare} alt="pbandjot" className="p-2" />
            </div>
        </div>
    )
}
