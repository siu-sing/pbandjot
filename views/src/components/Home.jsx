import React from 'react'
import LogoDisplay from './LogoDisplay'
import { Row, Col, Button } from 'react-bootstrap'
import { Fade as Anim } from "react-awesome-reveal";


export default function Home({ user, isAuth }) {
    // let {username} = props.user;

    let display = null;
    let logoSize = isAuth ? 120 : 180;


    return (
        <>
            <Anim cascade duration={500}>
                <Row className="justify-content-center">
                    <Col xs="auto">
                        <LogoDisplay size={logoSize} />
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs="auto mt-2">
                        <h1>PB&Jot</h1>
                    </Col>
                </Row>

                {
                    isAuth ?
                        <Row className="justify-content-center">
                            <Col md={{ span: 3 }} xs={{ span: 8 }} className="text-center">
                                user records here
                        </Col>
                        </Row>
                        : <>
                            <Row className="justify-content-center">
                                <Col xs="auto">
                                    <h4>Record your personal bests.</h4>
                                </Col>
                            </Row>
                            <Row className="justify-content-center my-3">
                                <Col md={{ span: 3 }} xs={{ span: 8 }} className="">
                                    <Button
                                        variant="warning"
                                        block
                                        href="/login"
                                    >
                                        Login
                    </Button>
                                </Col>
                            </Row>
                            <Row className="justify-content-center">
                                <Col md={{ span: 3 }} xs={{ span: 8 }} className="">
                                    <Button
                                        variant="warning"
                                        block
                                        href="/register"
                                    >
                                        Register
                    </Button>
                                </Col>
                            </Row>
                        </>
                }
            </Anim>

        </>
    )
}
