import React from 'react'
import { Form, Button } from 'react-bootstrap'
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
                    function(username) {
                        return new Promise((resolve, reject) => {
                            Axios.get(`${URL}/auth/usercheck/${username}`)
                            .then((res)=>{
                                // console.log(res.data.message)
                                if(res.data.message=="User exists"){
                                    resolve(false)
                                } else {
                                    resolve(true)
                                }
                            }).catch((error)=>{
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

    return (
        <div>
            <Form.Group>
                <Form.Label>Select a Username</Form.Label>
                <Form.Control
                    type="text"
                    id="username"
                    placeholder="Username"
                    {...getFieldProps("username")}
                />
                {/* {errors.username && touched.username ? errors.username : "You are unique."} */}
                {touched.username && (errors.username ? errors.username : "You are unique.")}
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    id="password"
                    placeholder=""
                    {...getFieldProps("password")}
                />
                {errors.password && touched.password ? errors.password : null}
            </Form.Group>
            <Button
                onClick={handleSubmit}
            >Next</Button>
        </div>
    )
}
