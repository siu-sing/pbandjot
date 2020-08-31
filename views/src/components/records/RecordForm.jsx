import React, { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import WeightForm from './WeightForm'
import TimeForm from './TimeForm'

export default function RecordForm(props) {

    let { _id, workout_type } = props.workout;

    // let defaultDate = 
    const [rDate, setRDate] = useState(new Date().toISOString().substring(0, 10))
    let pb_details_blk = {
        pb_date: rDate, pb_weight: null, pb_time_min: null, pb_time_sec: null, workout_id: _id
    }
    const [pb_details, setPBDetails] = useState(pb_details_blk);

    let dateChangeHandler = (e) => {
        setRDate(e.target.value);
        pbChangeHandler(e);
    }

    let pbChangeHandler = (e) => {
        setPBDetails({
            ...pb_details,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Col>
            <Form>
                <Form.Group as={Row}>
                    <Col className="col-5 p-0">
                        {workout_type !== "weightlifting" && (<TimeForm pbChangeHandler={pbChangeHandler} />)}
                        <WeightForm pbChangeHandler={pbChangeHandler} />
                    </Col>
                    <Col className="col-5 p-0">
                        <Form.Control
                            size="sm"
                            type="date"
                            value={rDate}
                            name="pb_date"
                            onChange={dateChangeHandler} />
                    </Col>
                    <Col
                        className="col-2 p-0 pl-1 "
                    >
                        <Button
                            className="btn btn-block"
                            size="sm"
                            onClick={()=>props.addHandler(pb_details)}
                        >
                            +
                        </Button>
                    </Col>
                </Form.Group >
            </Form>
        </Col>
    )
}
