import React, { useState } from 'react'
import { Card, Col, Accordion, Row } from 'react-bootstrap'
import RecordForm from './RecordForm';
import RecordDisplay from './RecordDisplay';


export default function WorkoutInfo(props) {

    let { id, workout_name, workout_type, description, prescribed_male, prescribed_female, records } = props.workout;
    let rxDetail = (
        <div className="font-italic font-weight-light">M:{prescribed_male}lb F:{prescribed_female}lb</div>
    )

    //Get PB for each workout
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
                    pb = `${Math.floor(pbtime/60)}:${(pbtime%60).toString().padStart(2,'0')}`
                })
                break;
            default:
                break;
        }
    }

    // const [pBest, setpBest] = useState(pbwt)

    let recordsDisplay = (
        records.map(r => (
            <RecordDisplay record={r} />
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
                                <RecordForm w={workout_type} />
                            </Row>

                            <Row>
                                <Col>
                                    {recordsDisplay}
                                </Col>
                            </Row>

                            {/* {description}
                            {prescribed_male && rxDetail} */}

                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </Col>
    )
}
