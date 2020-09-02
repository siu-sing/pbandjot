import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import Axios from 'axios';
const URL = process.env.REACT_APP_URL;

export default function CredentialsForm(props) {

    const { getFieldProps, handleSubmit, values, errors, touched } = useFormik({
        initialValues: {
            username: "",
            password: ""
        },

        validationSchema: Yup.object().shape({
            username: Yup
                .string()
                .required("Required")
                .test(
                    "checkUsernameExists", "Username already exists",
                    function (username) {
                        return new Promise((resolve, reject) => {
                            Axios.get(`${URL}/auth/usercheck/${username}`)
                                .then((res) => {
                                    // console.log(res.data.message)
                                    if (res.data.message == "User exists") {
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
            password: Yup
                .string()
                .min(8, "Must be more than 8 characters")
                .required("Required")
        }),

        onSubmit(values) {
            // console.log(values);
            props.saveData(values);
            props.nextStep();
        }
    })

    let userNameErrors = (touched.username && (errors.username ? (<span className="red__text">{errors.username}</span>) : "You are unique."))
    let userNameText = userNameErrors ? userNameErrors : (<span>&nbsp;</span>)
    let pwErrors = (errors.password && touched.password ? errors.password : null)
    let pwText = pwErrors ? pwErrors : (<span>&nbsp;</span>)
    return (
        <Row>
            <Col>
                <Row>
                    <Col
                        className="text-center"
                    >
                        <Form.Group>
                            <Form.Label>Select a Username</Form.Label>
                            <Form.Control
                                type="text"
                                id="username"
                                placeholder=""
                                {...getFieldProps("username")}
                            />
                            <Form.Text>
                                {userNameText}
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col
                        className="text-center"
                    >
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                id="password"
                                placeholder=""
                                {...getFieldProps("password")}
                            />
                            <Form.Text >
                                <span className="red__text">{pwText}</span>
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button
                            variant="warning"
                            block
                            onClick={handleSubmit}
                        >Next</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
