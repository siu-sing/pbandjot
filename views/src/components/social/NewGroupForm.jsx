import React from 'react'
import { useFormik, Formik, Field, FieldArray } from 'formik';
import { Form, Button, Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';

export default function NewGroupForm(props) {

    const { getFieldProps, handleSubmit, values, errors, touched } = useFormik({
        initialValues: {
            groupName: null,
            groupDescription: null,
            groupMembers: [],
        },

        validationSchema: Yup.object().shape({
            groupName: Yup.string().required("Required"),
            groupDescription: Yup.string().nullable(),
            groupMembers: Yup.array().of(Yup.string())
        }),

        onSubmit(values) {
            props.handleCloseModal()
            console.log(values)

        }
    })


    return (
        <div>
            <Form>
                <Row>
                    <Col
                        className="yellow__text text-center my-3"
                    >
                        <h5>New Group</h5>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Group Name</Form.Label>
                                    <Form.Control
                                        type="string"
                                        {...getFieldProps("groupName")}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Group Description</Form.Label>
                                    <Form.Control
                                        type="string"
                                        {...getFieldProps("groupDescription")}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Members
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col
                                className="text-center my-3"
                                md={{ span: 6 }} xs={{ span: 6 }}
                            >
                                <Button variant="warning" onClick={handleSubmit} block>Create</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}
