import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';

export default function Login(props) {

    let cred_blk = {
        username: null,
        password: null
    }

    const [credentials, setCredentials] = useState(cred_blk);

    let changeHandler = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    };

    let loginHandler = (e) => {
        e.preventDefault()
        //AXIOS post to login
        console.log("login clicked")
        console.log(credentials)
        props.loginHandler(credentials);
    }


    return (
        <div>
            <h1>Welcome back</h1>
            <Form>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        placeholder="username"
                        onChange={changeHandler}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder=""
                        onChange={changeHandler}
                    />
                </Form.Group>
                <Button
                    onClick={loginHandler}
                >
                    Login
                </Button>
            </Form>
        </div>
    )
}
