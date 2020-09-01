import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button } from 'react-bootstrap';

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
                .required("Required"),
        }),

        onSubmit(values) {
            // console.log(values);
            props.saveData(values);
            props.nextStep();
        }
    })


    return (
        <div>
            <Form.Group>
                <Form.Label>Your contact details</Form.Label>
                <Form.Control
                    // onChange={this.changeHandler}
                    type="text"
                    placeholder="First Name"
                    {...getFieldProps("firstname")}
                />
                {errors.firstname && touched.firstname ? errors.firstname : null}
            </Form.Group>
            <Form.Group>
                <Form.Control
                    // onChange={this.changeHandler}
                    type="text"
                    placeholder="Last Name"
                    {...getFieldProps("lastname")}
                />
                {errors.lastname && touched.lastname ? errors.lastname : null}
            </Form.Group>
            <Form.Group>
                <Form.Control
                    // onChange={this.changeHandler}
                    type="email"
                    placeholder="Email"
                    {...getFieldProps("email")}
                />
                {errors.email && touched.email ? errors.email : null}
            </Form.Group>
            <Button
                onClick={handleSubmit}
            >Next</Button>
        </div>
    )
}
