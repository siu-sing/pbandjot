import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Axios from 'axios';
const URL = process.env.REACT_APP_URL;

export default function ContactForm(props) {

    const { getFieldProps, handleSubmit, values, errors, touched } = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: ""
        },

        validationSchema: Yup.object().shape({
            firstname: Yup.string(),
            lastname: Yup.string(),
            email: Yup
                .string()
                .email("Invalid email address")
                .required("Required")
                .test(
                    "checkEmailExists", "Email already exists.",
                    function (email) {
                        return new Promise((resolve, reject) => {
                            Axios.get(`${URL}/auth/emailcheck/${email}`)
                                .then((res) => {
                                    // console.log(res.data.message)
                                    if (res.data.message == "Email exists") {
                                        resolve(false)
                                    } else {
                                        resolve(true)
                                    }
                                }).catch((error) => {
                                    console.log(error)
                                })
                        })
                    }
                ),
        }),

        onSubmit(values) {
            // console.log(values);
            props.saveData(values);
            props.nextStep();
        }
    })

    let emailErrors = (errors.email && touched.email ? errors.email : null)
    let emailText = emailErrors ? emailErrors : (<span>&nbsp;</span>)



    return (
        <Row>
            <Col>
                <Row>
                    <Col className="text-center">
                        <Form.Label>Contact Details</Form.Label>
                        <Form.Group>
                            <Form.Control
                                className="text-center"
                                type="text"
                                placeholder="First Name"
                                {...getFieldProps("firstname")}
                            />
                            {errors.firstname && touched.firstname ? errors.firstname : null}
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Control
                                className="text-center"
                                type="text"
                                placeholder="Last Name"
                                {...getFieldProps("lastname")}
                            />
                            {errors.lastname && touched.lastname ? errors.lastname : null}
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="text-center">
                            <Form.Control
                                className="text-center"
                                type="email"
                                placeholder="Email"
                                {...getFieldProps("email")}
                            />
                            <Form.Text className="red__text">
                                {emailText}
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button
                            block
                            variant="warning"
                            onClick={handleSubmit}
                        >Next</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
