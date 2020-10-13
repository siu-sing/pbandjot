import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'

export default function TimeForm(props) {
    return (

        <Row className="mx-2 text-center">
            <Col
                className="p-0 time__input"
                // xs={{span:5, offset:0}}
            >
                <Form.Control
                    className="text-center"
                    size="sm"
                    type="number"
                    placeholder="00"
                    name="pb_time_min"
                    onChange={props.pbChangeHandler}

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
                    name="pb_time_sec"
                    onChange={props.pbChangeHandler}
                />
            </Col>
        </Row>
    )
}
