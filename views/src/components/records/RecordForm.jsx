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
        <Col className="">
            <Form>
                <Form.Row>
                    <Col
                    // className="border border-success"
                    >
                        <Form.Control
                            size="sm"
                            type="date"
                            value={rDate}
                            onChange={dateChangeHandler}
                        />
                    </Col>
                    <Col
                    // className="border border-success"
                    >
                        <Row>
                            {workout_type === "weightlifting" ? (<WeightForm />) : (<TimeForm />)}
                        </Row>
                    </Col>

                </Form.Row>
                <Button
                    size="sm"
                    className="float-right m-1"
                >
                    Add
                    </Button>
            </Form>
        </Col>
    )
}
