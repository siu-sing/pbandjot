import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button } from 'react-bootstrap';

export default function DetailsForm(props) {
    const { getFieldProps, handleSubmit, values, errors, touched } = useFormik({
        initialValues: {
            gender: "Gender",
            height: null,
            weight: null,
            home_gym: "",
            date_of_birth: ""
        },

        validationSchema: Yup.object().shape({
            gender: Yup.mixed().oneOf(["M", "F"], "Please select gender."),
            height: Yup.number().nullable(),
            weight: Yup.number().nullable(),
            home_gym: Yup.string(),
            date_of_birth: Yup.date(),
        }),

        onSubmit(values) {
            console.log(values);

            let detailData = {
                gender: values.gender,
                user_details: {
                    height: values.height,
                    weight: values.weight,
                    home_gym: values.home_gym,
                    date_of_birth: values.date_of_birth
                }
            }
            props.saveData(detailData);
            props.registerUser();
        }
    })
    return (
        <div>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control
                    as="select"
                    name="gender"
                    {...getFieldProps("gender")}

                >
                    <option disabled selected>Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                </Form.Control>
                <Form.Text className="text-muted">
                    For tracking your Rx workouts.
                    </Form.Text>
                {errors.gender && touched.gender ? errors.gender : null}
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="number"
                    placeholder="Height in cm"
                    {...getFieldProps("height")}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="number"
                    placeholder="Weight in kg"
                    {...getFieldProps("weight")}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Gym name"
                    {...getFieldProps("home_gym")}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                    type="date"
                    name="date_of_birth"
                    {...getFieldProps("date_of_birth")}
                />
            </Form.Group>
            <Button onClick={handleSubmit}>Register</Button>
        </div>
    )
}
