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
        <Row>
            <Col>
                <Row className="justify-content-center yellow__text my-3">
                    <Col
                        className="text-center"
                    >
                        <h1>Barbell PB Calculator</h1>
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
                    <Col>
                        <Button className="m-1" onClick={() => setWhite(white + 10)} variant="light">10</Button>
                        <Button className="m-1" onClick={() => setBlack(black + 15)} variant="secondary">15</Button>
                        <Button className="m-1" onClick={() => setGreen(green + 25)} variant="success">25</Button>
                        <Button className="m-1" onClick={() => setYellow(yellow + 35)} variant="warning">35</Button>
                        <Button className="m-1" onClick={() => setBlue(blue + 45)} variant="primary">45</Button>
                        <Button className="m-1" onClick={() => setRed(red + 55)} variant="danger">55</Button>
                    </Col>
                </Row>
                <Row className="justify-content-center text-center">
                    <Col>
                        <p className="display-1">{display}</p>
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
