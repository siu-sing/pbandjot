import React from 'react'
import { Form, Col } from 'react-bootstrap'

export default function WeightForm(props) {
    return (
        <>
            <Col>
                <Form.Control size="sm" type="number" placeholder="lb" name="pb_weight" onChange={props.pbChangeHandler} />
                {/* <span className="my-auto">lb</span> */}
            </Col>
            
        </>
    )
}
