import React from 'react'
import { useFormik } from 'formik';
import { Form, Button, Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';


export default function NewRecordForm(props) {

    let currentDate = new Date().toISOString().substring(0, 10);

    const { getFieldProps, handleSubmit, values, errors, touched } = useFormik({
        initialValues: {
            pbDate: currentDate,
            pbWeight: null,
            pbTimeMin: null,
            pbTimeSec: null,
        },

        validationSchema: Yup.object().shape({
            pbDate: Yup.date(),
            pbWeight: Yup.number(),
            pbTimeMin: Yup.number().nullable(),
            pbTimeSec: Yup.number().max(59).nullable(),
        }),

        onSubmit(values) {
            props.handleCloseModal()
            console.log(values)
            //Reshape to prepare for submission
            let recordData = {
                pb_date: values.pbDate,
                pb_weight: values.pbWeight,
                pb_time_min: values.pbTimeMin,
                pb_time_sec: values.pbTimeSec,
            }

            console.log(recordData)
            //Add record
            props.addRecord(recordData);

        }
    })

    //Time form is only displayed for non weightlifting workouts
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
                                placeHolder="min"
                                className="text-center"
                                {...getFieldProps("pbTimeMin")}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="number"
                                placeHolder="sec"
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
                        {props.workout_type != "weightlifting" && timeFormDisplay}
                        <Row className="justify-content-center">
                            <Col
                                className="text-center"
                                md={{ span: 6 }} xs={{ span: 6 }}
                            >
                                <Form.Group>
                                    <Form.Label>Date of PB</Form.Label>
                                    <Form.Control
                                        type="date"
                                        max={currentDate}
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
