import React, { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import WeightForm from './WeightForm'
import TimeForm from './TimeForm'
import { useEffect } from 'react';

export default function RecordForm(props) {

    let { _id, workout_type } = props.workout;

    //Date handler to handle display
    const [rDate, setRDate] = useState(props.formData.pb_date);
    const [pbWeight, setPbWeight] = useState("");
    const [pbTimeMin, setPbTimeMin] = useState("");
    const [pbTimeSec, setPbTimeSec] = useState("");

    let dateChangeHandler = (e) => {
        setRDate(e.target.value);
        pbChangeHandler(e);
    }

    let pbWeightChangeHandler = (e) => {
        setPbWeight(e.target.value);
        pbChangeHandler(e);
    }

    let pbTimeMinChangeHandler = (e) => {
        setPbTimeMin(e.target.value);
        pbChangeHandler(e);
    }

    let pbTimeSecChangeHandler = (e) => {
        setPbTimeSec(e.target.value);
        pbChangeHandler(e);
    }

    let pbChangeHandler = (e) => {
        props.setFormData({
            ...props.formData,
            [e.target.name]: e.target.value
        })
    }

    let formAddHandler = async () => {
        await props.addHandler()
        setRDate(new Date().toISOString().substring(0, 10))
        setPbWeight("");
        setPbTimeMin("");
        setPbTimeSec("");
    }
    // console.log(props.formData);


    return (
        <Col>
            <Form>
                <Form.Group as={Row}>
                    <Col className="col-5 p-0">
                        {workout_type !== "weightlifting"
                            && (<Row className="mx-2 text-center">
                                <Col
                                    className="p-0 time__input"
                                // xs={{span:5, offset:0}}
                                >
                                    <Form.Control
                                        className="text-center"
                                        size="sm"
                                        type="number"
                                        placeholder="00"
                                        value={pbTimeMin}
                                        name="pb_time_min"
                                        onChange={pbTimeMinChangeHandler}

                                    />
                                </Col >
                                {/* <Col xs={{span:2, offset:0}}> */}
                                <span className="my-auto mx-1">:</span>
                                {/* </Col> */}
                                <Col
                                    className="p-0 time__input"
                                // xs={{span:5, offset:0}}
                                // className="pl-1 time__input"
                                >
                                    <Form.Control
                                        className="text-center"
                                        size="sm"
                                        type="number"
                                        placeholder="00"
                                        value={pbTimeSec}
                                        name="pb_time_sec"
                                        onChange={pbTimeSecChangeHandler}
                                    />
                                </Col>
                            </Row>)}
                        <Col>
                            <Form.Control
                                size="sm"
                                type="number"
                                placeholder="lb"
                                value={pbWeight}
                                name="pb_weight"
                                onChange={pbWeightChangeHandler} />
                            {/* <span className="my-auto">lb</span> */}
                        </Col>
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
                            onClick={formAddHandler}
                        >
                            +
                        </Button>
                    </Col>
                </Form.Group >
            </Form>
        </Col>
    )
}
