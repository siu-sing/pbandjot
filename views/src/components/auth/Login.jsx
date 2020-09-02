import React, { useState } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap';

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
        // console.log(credentials)
        props.loginHandler(credentials);
    }


    return (
        <>
            <Row>
                <Col>
                    <Row className="justify-content-center yellow__text my-3">
                        <Col
                            className="text-center"
                        >
                            <h1>Login to record your gains.</h1>
                        </Col>
                    </Row>
                    <Row className="justify-content-center my-5">
                        <Col
                            className="text-center"
                            md={{ span: 4 }} xs={{ span: 10 }}

                        >
                            <Form>
                                <Form.Group>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        placeholder=""
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
                                    <Form.Text className="">
                                        {props.loginError ? props.loginError : <span>&nbsp;</span> }
                                    </Form.Text>
                                </Form.Group>

                                <Button
                                    variant="warning"
                                    onClick={loginHandler}
                                    block
                                >
                                    Login
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>



        </>
    )
}
