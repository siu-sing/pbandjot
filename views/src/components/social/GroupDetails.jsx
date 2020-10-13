import React from 'react'
import { useParams } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';

export default function GroupDetails(props) {
    let { id } = useParams();
    let group = props.groupList.find(e => e._id == id)

    return (
        <>
            {group &&
                <>
                    <Row className="justify-content-center">
                        <Col
                            md={{ span: 10 }} xs={{ span: 10 }}
                            className="text-center yellow__text"
                        >
                            <h4>{group.group_name}</h4>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col
                            md={{ span: 10 }} xs={{ span: 10 }}
                            className="text-center font-italic"
                        >
                            <p>{group.group_description}</p>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col
                            md={{ span: 10 }} xs={{ span: 10 }}
                            className="text-center"
                        >
                            {
                                group.group_members.map(m => (
                                    <> {m.username},</>
                                ))
                            }
                        </Col>
                    </Row>
                </>
            }
        </>
    )
}
