import React from 'react'
import { useFormik } from 'formik';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function NewRecordForm(props) {

    console.log(props.workout_type)

    const { getFieldProps, handleSubmit, values, errors, touched } = useFormik({
        initialValues: {
            pbDate: "",
            pbWeight: null,
            pbTimeMin: null,
            pbTimeSec: null,
        },

        onSubmit(values) {
            console.log(values)
        }
    })

    let timeFormDisplay = (
        <Row className="justify-content-center">
            <Col
                className="text-center"
                md={{ span: 4 }} xs={{ span: 6 }}
            >
                <Form.Group>
                    <Form.Label>Your PB Time</Form.Label>
                    <Row>
                        <Col>
                            <Form.Control
                                type="number"
                                placeHolder="00"
                                className="text-center"
                                {...getFieldProps("pbTimeMin")}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="number"
                                placeHolder="00"
                                className="text-center"
                                {...getFieldProps("pbTimeSec")}
                            />
                        </Col>
                    </Row>
                </Form.Group>
            </Col>
        </Row>
    )


    return (
        <div>
            <Form>
                <Row>
                    <Col
                        className="yellow__text text-center my-3"
                    >
                        WHAT IS YOUR NEW PERSONAL BEST?
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col
                    // md={{ span: 4 }} xs={{ span: 4 }}
                    >
                        <Row className="justify-content-center">
                            <Col
                                className="text-center"
                                md={{ span: 3 }} xs={{ span: 4 }}
                            >
                                <Form.Group>
                                    <Form.Label className="">Weight in lb</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="lb"
                                        className="text-center"
                                        {...getFieldProps("pbWeight")}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        {props.workout_type!="weightlifting" && timeFormDisplay}
                        <Row className="justify-content-center">
                            <Col
                                className="text-center"
                                md={{ span: 6 }} xs={{ span: 6 }}
                            >
                                <Form.Group>
                                    <Form.Label>Date of PB</Form.Label>
                                    <Form.Control
                                        type="date"
                                        {...getFieldProps("pbDate")}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col
                                className="text-center my-3"
                                md={{ span: 6 }} xs={{ span: 6 }}
                            >
                                <Button variant="warning" onClick={handleSubmit} block>SAVE</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>


            </Form>
        </div>
    )
}
