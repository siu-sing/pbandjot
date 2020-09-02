import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Axios from 'axios'
import RecordHeader from './RecordHeader';
const URL = process.env.REACT_APP_URL;

export default function RecordList(props) {
    //FETCH RECORDS

    const [workoutRecords, setWorkoutRecords] = useState([]);

    //Get pb value of each workout where available
    let getPb = (records, workout_type) => {
        if (records.length > 0) {
            switch (workout_type) {
                case "weightlifting":
                    let pbwt = records[0].pb_weight;
                    records.forEach(r => {
                        if (pbwt < r.pb_weight) pbwt = r.pb_weight
                    })
                    return `${pbwt} lb`
                case "benchmark":
                    let pbtime = 86400;
                    records.forEach(r => {
                        let totalTime = r.pb_time_min * 60 + r.pb_time_sec;
                        if (pbtime > totalTime) {
                            pbtime = totalTime
                        }
                    })
                    return `${Math.floor(pbtime / 60)}:${(pbtime % 60).toString().padStart(2, '0')}`
                    break;
                default:
                    break;
            }
        } else {
            return ""
        }
    }

    //Get latest date from each workout where available
    let getLatestRecordDate = (records) => {
        if (records.length > 0) {
            let latestDate = records[0].pb_date;
            records.forEach(r => {
                if (r.pb_date > latestDate) {
                    latestDate = r.pb_date
                }
            });
            return latestDate;
        } else {
            return "";
        }
    };

    //Sort function for workout display - last updated first
    let compareRecords = (a, b) => {
        //IF BOTH WORKOUT HAS RECORDS
        if (a.records.length > 0 && b.records.length > 0) {
            if (a.latest_record_date > b.latest_record_date) {
                return -1;
            } else if (a.latest_record_date < b.latest_record_date) {
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

    //Main function to fetch records, get PB and sort them
    let fetchRecords = async () => {

        let token = localStorage.getItem("token");

        let getRes = await Axios.get(`${URL}/records/allworkouts`,
            { headers: { "x-auth-token": token } });

        let workouts = getRes.data.workouts;

        //Set PB and latest record date
        workouts.forEach(w => {
            w.pb_value = getPb(w.records, w.workout_type);
            w.latest_record_date = getLatestRecordDate(w.records);
        });

        //Sort workouts by latest entered desc
        workouts.sort(compareRecords);

        setWorkoutRecords(workouts);
    }

    useEffect(() => {
        fetchRecords();
    }, [])

    let display = (
        workoutRecords.map(w => (
            <RecordHeader
                workout={w}
                setCurrentWorkout={props.setCurrentWorkout}
            />
        ))
    )

    return (
        <>
            <Row className="mt-3">
                <Col>
                    {display}
                </Col>
            </Row>
        </>
    )
}
