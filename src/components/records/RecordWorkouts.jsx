import React, { useState, useEffect } from 'react'
import seed from '../../data/seed'
import WorkoutInfo from './RecordWorkoutInfo';
import { Button, Col } from 'react-bootstrap'

export default function Workouts() {

    let workouts_temp = seed.workouts;
    let records = seed.records;

    //Add records into the workouts array
    workouts_temp.forEach((w, idx) => {
        w['records']=[];
        w.records = w.records.concat((records.filter(r => r.workout_id == w.id)))
    })

    const [workouts, updateWorkouts] = useState(workouts_temp);
    const [filteredWorkouts, setFilteredWorkouts] = useState(workouts)
    const [userRecords, setUserRecords] = useState(seed.records);

    let filterClickHandler = async (e) => {
        let filtered = []
        if (e.target.value !== "all") {
            filtered = workouts.filter((w) => w.workout_type === e.target.value)
        } else {
            filtered = workouts
        }
        setFilteredWorkouts(filtered);
    }

    return (
        <div>
            <div className="my-2">
                <Button value="all" onClick={filterClickHandler} variant="outline-dark">All</Button>{" "}
                <Button value="weightlifting" onClick={filterClickHandler} variant="outline-dark">Weightlifting</Button>{" "}
                <Button value="benchmark" onClick={filterClickHandler} variant="outline-dark">Benchmark WODs</Button>{" "}
            </div>

            {
                filteredWorkouts.map(w => (
                    <WorkoutInfo workout={w} />
                ))
            }
        </div>
    )
}
