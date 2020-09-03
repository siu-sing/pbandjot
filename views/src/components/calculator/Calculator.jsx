import React, { useState, useEffect } from 'react'
import { Button, Row, Col } from 'react-bootstrap';

export default function Calculator() {

    const [white, setWhite] = useState(0);
    const [black, setBlack] = useState(0);
    const [green, setGreen] = useState(0);
    const [yellow, setYellow] = useState(0);
    const [blue, setBlue] = useState(0);
    const [red, setRed] = useState(0);
    const [bbWeight, setBBWeight] = useState(0);

    let display = (white + black + green + yellow + blue + red) * 2 + bbWeight;
    let clearStates = () => {
        setWhite(0);
        setBlack(0);
        setGreen(0);
        setYellow(0);
        setBlue(0);
        setRed(0);
        setBBWeight(0);
    };

    return (
        <Row className="justify-content-center">
            <Col>
                <Row className="justify-content-center yellow__text my-3">
                    <Col
                        className="text-center"
                    >
                        <h4>Barbell PB Calculator</h4>
                    </Col>
                </Row>
                <Row className="justify-content-center text-center mt-3">
                    <Col>
                        Barbell Weight
                    </Col>
                </Row>
                <Row className="justify-content-center text-center mt-2">
                    <Col
                    // md={{ span: 2 }} xs={{ span: 4 }}
                    >
                        <Button size="lg" className="m-1" onClick={() => setBBWeight(35)} variant="outline-light">35</Button>
                        <Button size="lg" className="m-1" onClick={() => setBBWeight(45)} variant="outline-light">45</Button>
                    </Col>
                </Row>
                <Row className="justify-content-center text-center mt-3">
                    <Col>
                        Bumper Plates
                    </Col>
                </Row>
                <Row className="justify-content-center text-center mt-2">
                    <Col md={{ span: 7 }} xs={{ span: 6 }}>
                        <Row>
                            <Col className="text-center px-1 mt-1">
                                <Button block className="" onClick={() => setWhite(white + 10)} variant="light">10</Button>
                                {white > 0 ? white / 10 : (<span>&nbsp;</span>)}
                            </Col>
                            <Col className="text-center px-1 mt-1">
                                <Button block className="" onClick={() => setBlack(black + 15)} variant="secondary">15</Button>
                                {black > 0 ? black / 15 : (<span>&nbsp;</span>)}
                            </Col>
                            <Col className="text-center px-1 mt-1">
                                <Button block className="" onClick={() => setGreen(green + 25)} variant="success">25</Button>
                                {green > 0 && green / 25}
                            </Col>
                            <Col className="text-center px-1 mt-1">
                                <Button block className="" onClick={() => setYellow(yellow + 35)} variant="warning">35</Button>
                                {yellow > 0 && yellow / 35}
                            </Col>
                            <Col className="text-center px-1 mt-1">
                                <Button block className="" onClick={() => setBlue(blue + 45)} variant="primary">45</Button>
                                {blue > 0 && blue / 45}
                            </Col>
                            <Col className="text-center px-1 mt-1">
                                <Button block className="" onClick={() => setRed(red + 55)} variant="danger">55</Button>
                                {red > 0 && red / 55}
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="justify-content-center text-center">
                    <Col>
                        <p className="display-1 text-nowrap">{display} lb</p>
                    </Col>
                </Row>
                <Row className="justify-content-center text-center">
                    <Col>
                        <Button size="lg" className="m-2" onClick={clearStates} variant="outline-light">Clear</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
