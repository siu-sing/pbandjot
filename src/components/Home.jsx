import React from 'react'
import LogoDisplay from './LogoDisplay'

export default function Home({user}) {
    // let {username} = props.user;
    return (
        <div className="text-center">
            <LogoDisplay />
            Record your personal bests.
            {user && (<div>{user.username}</div>)}
        </div>
    )
}
