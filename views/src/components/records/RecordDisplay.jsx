import React from 'react'
import { Col, Row } from 'react-bootstrap'

export default function RecordDisplay(props) {
    let { pb_date, pb_time_min, pb_time_sec, pb_weight, prescribed, workout_name, workout_type } = props.record
    let pb_value = "";
    switch (workout_type) {
        case "weightlifting":
            pb_value=`${pb_weight}lb`;
            break;
        case "benchmark":
            pb_value=`${pb_time_min}:${pb_time_sec.toString().padStart(2,'0')}`
            break;
        default:
            break;
    }

    let recordDisplay = (
        <Row className="text-center my-1">
            <Col>{pb_date}</Col>
            <Col>{pb_value}</Col>
        </Row>
    )

    return (
        <div>
            {recordDisplay}
        </div>
    )
}
