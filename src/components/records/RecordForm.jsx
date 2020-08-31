import React, { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import WeightForm from './WeightForm'
import TimeForm from './TimeForm'

export default function RecordForm(props) {

    // let defaultDate = 
    const [rDate, setRDate] = useState(new Date().toISOString().substring(0, 10))

    let dateChangeHandler = (e) => {
        setRDate(e.target.value)
    }

    // console.log(`WHY WHHY ${props.weighlifting}`)
    let workout_type = props.w;

    return (
        <Col>
            <Form>
                <Form.Group as={Row}>
                    <Col className="col-5 p-0">
                        {workout_type === "weightlifting" ? (<WeightForm />) : (<TimeForm />)}
                    </Col>
                    <Col className="col-5 p-0">
                        <Form.Control
                            size="sm"
                            type="date"
                            value={rDate}
                            onChange={dateChangeHandler} />
                    </Col>
                    <Col
                        className="col-2 p-0 pl-1 "
                    >
                        <Button className="btn btn-block" size="sm">+</Button>
                    </Col>
                </Form.Group >
            </Form>
        </Col>
    )
}
