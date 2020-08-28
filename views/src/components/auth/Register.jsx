import React, { useState, useEffect } from 'react'
import { Form, Col, Button } from 'react-bootstrap'

export default function Register() {

    let userInfo_blk = {
        firstname: "", lastname: "", username: "", email: "", password: "", gender: "",
        user_details: {
            height: "", weight: "", home_gym: "", date_of_birth: ""
        }
    }

    const [userInfo, setUserInfo] = useState(userInfo_blk);



    let submitHandler = (e) => {
        e.preventDefault();
        //based on journeyIdx, update userInfo
        console.log("submit clicked")
        console.log(userInfo)

    }




    return (
        <>
            <h1>Register</h1>
            <Form>
                <Form.Row>
                    <Form.Group>
                        <Form.Label>Select a Username</Form.Label>
                        <Form.Control onChange={e => setUserInfo({ ...userInfo, username: e.target.value })} type="text" name="username" placeholder="Username" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={e => setUserInfo({ ...userInfo, password: e.target.value })} type="password" name="password" placeholder="" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Your contact details</Form.Label>
                        <Form.Control onChange={e => setUserInfo({ ...userInfo, firstname: e.target.value })} type="text" name="firstname" placeholder="First Name" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control onChange={e => setUserInfo({ ...userInfo, lastname: e.target.value })} type="text" name="lastname" placeholder="Last Name" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control onChange={e => setUserInfo({ ...userInfo, email: e.target.value })} type="email" name="email" placeholder="Email" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control onChange={e => setUserInfo({ ...userInfo, email: e.target.value })} type="email" name="email" placeholder="Email" />
                    </Form.Group>
                </Form.Row>
                <Button onClick={submitHandler}>Submit</Button>
            </Form>
        </>
    )
}
