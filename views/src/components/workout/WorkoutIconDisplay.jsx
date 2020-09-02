import React from 'react'
import workout_icon from '../../workout_icon.svg'

export default function WorkoutIconDisplay() {
    return (
        <div className="text-center">
            <img src={workout_icon} alt="workout" className="p-2" />
        </div>
    )
}
