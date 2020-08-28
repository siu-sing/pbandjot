import React from 'react'
import { Col, Form } from 'react-bootstrap'

export default function TimeForm() {
    return (

        <>
            <Col className="pr-1">
                <Form.Control
                    size="sm"
                    type="number"
                    placeholder="00"
                    
                />
            </Col>
            <span className="my-auto">:</span>
            <Col
                className="pl-1"
            >
                <Form.Control
                    size="sm"
                    type="number"
                    placeholder="00"

                />
            </Col>
        </>
    )
}
