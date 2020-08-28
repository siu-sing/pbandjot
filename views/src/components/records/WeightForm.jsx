import React from 'react'
import { Form, Col } from 'react-bootstrap'

export default function WeightForm() {
    return (
        <>
            <Col>
                <Form.Control size="sm" type="number" placeholder="lb" />
                {/* <span className="my-auto">lb</span> */}
            </Col>
            
        </>
    )
}
