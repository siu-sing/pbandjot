import React, { useState, useEffect } from 'react'
import { Card, Col, Accordion, Row } from 'react-bootstrap'
import RecordForm from './RecordForm';
import RecordDisplay from './RecordDisplay';
import Axios from 'axios';
const URL = process.env.REACT_APP_URL;

export default function WorkoutInfo(props) {

    //Helper function to get PB depending on workout type
    let getPb = () => {
        if (records.length > 0) {
            switch (workout.workout_type) {
                case "weightlifting":
                    let pbwt = records[0].pb_weight;
                    records.forEach(r => {
                        if (pbwt < r.pb_weight) pbwt = r.pb_weight
                    })
                    return `${pbwt}lb`
                case "benchmark":
                    let pbtime = 86400;
                    //CONVERT MIN TO SEC + SEC
                    // let pbtime = records[0]./
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
        }
    }

    //STATES FOR FORM VALUES
    const [rDate, setRDate] = useState(new Date().toISOString().substring(0, 10))
    let pb_details_blk = {
        pb_date: rDate, pb_weight: null, pb_time_min: null, pb_time_sec: null, workout_id: props.workout._id
    }
    const [formData, setFormData] = useState(pb_details_blk);

    //STATES FOR WORKOUT PROPS
    const [workout, setWorkout] = useState(props.workout);
    const [records, setRecords] = useState([]);
    const [pb, setPb] = useState("");

    let fetchRecords = async () => {
        let token = localStorage.getItem("token");
        let getRes = await Axios.get(`${URL}/records/workouts/${props.workout._id}`,
            { headers: { "x-auth-token": token } });
        setRecords(getRes.data.records);
    }

    useEffect(() => {
        fetchRecords();
    }, [])
    console.log(workout);


    //HANDLE NEW PB INPUT FOR EACH WORKOUT
    let addHandler = async () => {
        //AXIOS CALL TO ADD NEW RECORD, USING USER TOKEN
        let token = localStorage.getItem("token");
        let postRes = await Axios.post(`${URL}/records`, formData, { headers: { "x-auth-token": token } });
        //Fetch records and update records state
        fetchRecords();
    }
    //SORT RECORDS BY TIME
    //Sort helper function
    let compareRecords = (a, b) => {
        if (a.pb_date > b.pb_date) {
            return -1;
        } else if (a.pb_date < b.pb_date) {
            return 1;
        } else {
            return 0;
        }
    }
    records.sort(compareRecords);
    // console.log(records)
    return (
        <Col className="mx-auto my-1 ">
            <Accordion>
                <Card>
                    <Accordion.Toggle className="text-left" as={Card.Header} eventKey="0">
                        <Row>
                            <Col>
                                {workout.workout_name}
                            </Col>
                            <Col className="text-right">
                                {pb}
                            </Col>
                        </Row>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body className="small__text">
                            <Row className="">
                                <RecordForm
                                    workout={workout}
                                    formData={formData}
                                    setFormData={setFormData}
                                    addHandler={addHandler}
                                />
                            </Row>
                            <Row>
                                <Col>
                                    {records.map(r => (
                                        <RecordDisplay
                                            workout={workout}
                                            record={r}
                                            key={r._id}
                                            fetchRecords={fetchRecords}
                                        />
                                    ))}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </Col>
    )
}
