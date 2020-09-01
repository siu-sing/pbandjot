import React from 'react'
import { Row, Card, Col } from 'react-bootstrap';
import moment from 'moment';

export default function RecordHeader(props) {

    let workout = props.workout;

    let getPB = () => {

    }

    return (
        <Row>
            <Col>
                <Card className="record__card my-1">
                    <Card.Header>
                        <Row>
                            <Col className="text-left my-auto">
                                {workout.workout_name}{" "}
                            </Col>
                            <Col className="text-right font-italic font-weight-light">
                                <Row>
                                    <Col>
                                        {workout.pb_value}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="small">
                                        {workout.latest_record_date ? moment(workout.latest_record_date).format("DD MMM") : ""}
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
