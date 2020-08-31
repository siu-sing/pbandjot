import React from 'react'
import { Col, Row } from 'react-bootstrap'
import moment from 'moment';

export default function RecordDisplay(props) {
    // console.log(props)
    let { pb_date, pb_time_min, pb_time_sec, pb_weight, prescribed, liked_by } = props.record;
    let { description, prescribed_female, prescribed_male, workout_name, workout_type } = props.workout;
    let pb_value = "";
    switch (workout_type) {
        case "weightlifting":
            pb_value = `${pb_weight}lb`;
            break;
        case "benchmark":
            pb_value = `${pb_time_min}:${pb_time_sec.toString().padStart(2, '0')}`
            break;
        default:
            break;
    }

    let pb_date_display = moment().diff(pb_date, "days") > 5 ? moment(pb_date).format("D MMM YYYY") : moment(pb_date).fromNow();
    
    let recordDisplay = (
        <Row className="my-2">
            <Col>
                <Row className="">
                    <Col
                        // xs={9}
                        className="text-right p-0">
                        {pb_value}
                    </Col>
                    <Col
                        // xs={3}
                        className="p-0 pl-1 text-center">
                        {prescribed && "Rx"}
                    </Col>
                </Row>
            </Col>
            <Col className="text-muted font-italic text-center">{pb_date_display}</Col>
        </Row>
    )

    return (
        <div>
            {recordDisplay}
        </div>
    )
}
