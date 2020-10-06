import React from 'react'
import { Card, Row, Col } from 'react-bootstrap';

export default function GroupHeader(props) {

    let group = props.group;

    return (
        <Row>
            <Col>
                <Card className="record__card my-1">
                    <Row>
                        <Col>
                            <Card.Header className="text-center">
                                {group.group_name}
                            </Card.Header>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>

    )
}
