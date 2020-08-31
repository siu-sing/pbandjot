import React from 'react'
import { Card, Col, Accordion, Row } from 'react-bootstrap'
import RecordForm from './RecordForm';
import RecordDisplay from './RecordDisplay';
import Axios from 'axios';
const URL = process.env.REACT_APP_URL;

export default function WorkoutInfo(props) {

    let { _id, workout_name, workout_type, description, prescribed_male, prescribed_female, records } = props.workout;

    //HANDLE NEW PB INPUT FOR EACH WORKOUT
    let addHandler = async (pb_details) => {
        console.log("Add button clicked")
        console.log(pb_details);
        //AXIOS CALL TO ADD NEW RECORD, USING USER TOKEN
        let token = localStorage.getItem("token");
        let postRes = await Axios.post(`${URL}/records`, pb_details, {headers: { "x-auth-token": token } });
        console.log(postRes)


        //CLEAR INPUT FIELDS

    }

    //GET AND SET PB FOR EACH WORKOUT
    let pb = "";
    if (records.length > 0) {
        switch (workout_type) {
            case "weightlifting":
                let pbwt = records[0].pb_weight;
                records.forEach(r => {
                    if (pbwt < r.pb_weight) pbwt = r.pb_weight
                })
                pb = `${pbwt}lb`
                break;
            case "benchmark":
                let pbtime = 86400;
                //CONVERT MIN TO SEC + SEC
                // let pbtime = records[0]./
                records.forEach(r => {
                    let totalTime = r.pb_time_min * 60 + r.pb_time_sec;
                    if (pbtime > totalTime) {
                        pbtime = totalTime
                    }
                    pb = `${Math.floor(pbtime / 60)}:${(pbtime % 60).toString().padStart(2, '0')}`
                })
                break;
            default:
                break;
        }
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

    //SET DISPLAY OF EACH RECORD
    let recordsDisplay = (
        records.map(r => (
            <RecordDisplay
                workout={props.workout}
                record={r}
                key={r._id}
            />
        ))
    )

    // console.log(records)
    return (
        <Col className="mx-auto my-1 ">
            <Accordion>
                <Card>
                    <Accordion.Toggle className="text-left" as={Card.Header} eventKey="0">
                        <Row>
                            <Col>
                                {workout_name}
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
                                    workout={props.workout}
                                    // pbChangeHandler={pbChangeHandler}
                                    addHandler={addHandler}
                                />
                            </Row>

                            <Row>
                                <Col>
                                    {recordsDisplay}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </Col>
    )
}
