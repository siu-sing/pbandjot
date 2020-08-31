import React, { useState, useEffect } from 'react'
import seed from '../../data/seed'
import RecordWorkoutInfo from './RecordWorkoutInfo';
import { Button, Col } from 'react-bootstrap';
import Axios from 'axios';
const URL = process.env.REACT_APP_URL;

export default function Workouts() {

    const [workouts, setWorkouts] = useState(null);
    const [filteredWorkouts, setFilteredWorkouts] = useState(workouts)

    let filterClickHandler = async (e) => {
        let filtered = []
        if (e.target.value !== "all") {
            filtered = workouts.filter((w) => w.workout_type === e.target.value)
        } else {
            filtered = workouts
        }
        setFilteredWorkouts(filtered);
    }

    //DISPLAY LIST OF WORKOUTS (SORTED BY LAST ENTERED), INCLUSIVE OF THOSE WITHOUT RECORDS AT THE TAIL

    //TRANSFORM FOR DISPLAY
    useEffect(
        () => {
            let token = localStorage.getItem("token");
            let userRecords = null;
            let allWorkouts = null;

            const fetchRecordsDisplay = async (userToken) => {
                try {
                    //AXIOS CALL TO PULL ALL RECORDS BY USER
                    let recordsRes = await Axios.get(`${URL}/records`, { headers: { "x-auth-token": userToken } })
                    userRecords = recordsRes.data.records;

                    //AXIOS CALL TO PULL ALL WORKOUTS AVAILABLE
                    let workoutsRes = await Axios.get(`${URL}/workouts`)
                    allWorkouts = workoutsRes.data.workouts;

                    //FOR EACH WORKOUT
                    allWorkouts.forEach(w => {
                        w["records"] = [];

                        //FOR EACH RECORD
                        userRecords.forEach(r => {

                            //IF RECORD BELONGS TO WORKOUT, PUSH INTO WORKOUT RECORDS ARRAY
                            if (w._id.toString() == r.workout_id.toString()) {
                                w["records"].push(r)
                            }
                        })
                    })

                    //SET STATES UPON FETCHING
                    setWorkouts(allWorkouts);
                    setFilteredWorkouts(allWorkouts);
                } catch (error) {
                    console.log(error)
                }
            }
            fetchRecordsDisplay(token);
        }, []
    );


    return (
        <div>
            <div className="my-2">
                <Button value="all" onClick={filterClickHandler} variant="outline-dark">All</Button>{" "}
                <Button value="weightlifting" onClick={filterClickHandler} variant="outline-dark">Weightlifting</Button>{" "}
                <Button value="benchmark" onClick={filterClickHandler} variant="outline-dark">Benchmark WODs</Button>{" "}
            </div>

            {filteredWorkouts ?
                (
                    filteredWorkouts.map(w => (
                        <RecordWorkoutInfo workout={w} />
                    ))
                )
                : "STANDBY FOR GAINS"
            }
        </div>
    )
}
