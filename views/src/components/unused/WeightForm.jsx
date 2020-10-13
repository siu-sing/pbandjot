import React from 'react'
import { Form, Col } from 'react-bootstrap'

export default function WeightForm(props) {

    // const [pbWeight, setPbWeight] = useState(props.formData.pb_weight)
    
    return (
        <>
            <Col>
                <Form.Control 
                size="sm" 
                type="number" 
                placeholder="lb" 
                value={props.pb_weight}
                name="pb_weight" 
                onChange={props.pbChangeHandler} />
                {/* <span className="my-auto">lb</span> */}
            </Col>
            
        </>
    )
}
