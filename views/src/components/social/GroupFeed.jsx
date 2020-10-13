import React from 'react'
import { useParams } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';

export default function GroupFeed(props) {
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
                </>
            }
        </>
    )
}
