import React from 'react'
import { Row, Card, Col } from 'react-bootstrap';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

export default function RecordHeader(props) {

    const history = useHistory();

    let workout = props.workout;
    let cardClicked = () => {
        // console.log("SETTING CURRENT WORKOUT");
        // console.log(workout);
        props.setCurrentWorkout(workout);
        history.push("/workout")
        
    }

    return (
        <Row>
            <Col>
                <Card
                    as="a"
                    href="#"
                    className="record__card my-1"
                    onClick={cardClicked}
                >
                    <Card.Header>
                        <Row>
                            <Col className="text-left my-auto">
                                {workout.workout_name}{" "}
                            </Col>
                            <Col className="text-right font-italic">
                                <Row>
                                    <Col>
                                        {workout.pb_value}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="small font-weight-light">
                                        {workout.pb_date ? moment(workout.pb_date).format("DD MMM") : ""}
                                    </Col>
                                </Row>

                            </Col>
                        </Row>

                    </Card.Header>
                </Card>
            </Col>

        </Row>
    )
}
