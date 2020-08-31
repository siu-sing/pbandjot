import React, { useState, useEffect } from 'react'
import RecordWorkoutInfo from './RecordWorkoutInfo';
import { Button } from 'react-bootstrap';
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
                    allWorkouts.sort(compareRecords);
                    setWorkouts(allWorkouts);
                    setFilteredWorkouts(allWorkouts);
                } catch (error) {
                    console.log(error)
                }
            }
            fetchRecordsDisplay(token);
        }, []
    );

    //Sort helper functions
    let compareRecords = (a, b) => {
        //IF BOTH WORKOUT HAS RECORDS
        if (a.records.length > 0 && b.records.length > 0) {
            let latestDateA = getLatestRecordDate(a.records);
            let latestDateB = getLatestRecordDate(b.records);
            if (latestDateA > latestDateB) {
                return -1;
            } else if (latestDateA < latestDateB) {
                return 1;
            } else {
                return 0;
            }
            //ONLY B HAS RECORDS
        } else if (a.records.length == 0 && b.records.length > 0) {
            return 1
            //ONLY A HAS RECORDS
        } else if (b.records.length == 0 && a.records.length > 0) {
            return -1
            //BOTH HAS NO RECORDS
        } else {
            return 0
        }
    }

    let getLatestRecordDate = (recArr) => {
        let latestDate = recArr[0].pb_date
        //for each record, get 
        recArr.forEach(r => {
            if (r.pb_date > latestDate) latestDate = r.pb_date;
        })
        return latestDate
    }

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
                        <RecordWorkoutInfo workout={w} key={w._id} />
                    ))
                )
                : "STANDBY FOR GAINS"
            }
        </div>
    )
}
