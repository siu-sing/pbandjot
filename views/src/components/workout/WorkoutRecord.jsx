import React from 'react'
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';

export default function WorkoutRecord(props) {

    //Get pb value for display
    let getPbValue = (record, workout) => {
        console.log(record)
        switch (workout.workout_type) {
            case "weightlifting":
                return `${record.pb_weight} lb`;
            case "benchmark":
                return `${record.pb_time_min}:${record.pb_time_sec.toString().padStart(2, '0')}`
            default:
                break;
        }
    }

    let record = props.record;
    let workout = props.workout;
    let pbValue = getPbValue(record, workout);
    console.log(pbValue)

    //Make latest record larger
    let lead = props.rank == 0 ? "lead" : "";

    return (
        <div>
            <Row
                className="text-center mb-2"
            >
                <Col
                    className={lead}
                >
                    {moment(record.pb_date).format("DD MMM YYYY")}
                </Col>
                <Col
                    className={lead}
                >
                    {pbValue}
                </Col>
            </Row>
        </div>
    )
}
