import React, { useState } from 'react'
import GroupHeader from './GroupHeader';
import { Link, useHistory } from 'react-router-dom'
import { Col, Row, Button, Modal } from 'react-bootstrap';
import NewGroupForm from './NewGroupForm';

export default function (props) {

    const history = useHistory();
    let groupList = props.groupList;

    let clickGroup = (g) => {
        history.push(`/groups/${g._id}`)
        console.log(g._id);
        console.log("clicked")
    }
    //Display groups
    let groupDisplay = (
        groupList.map(g => (
            <GroupHeader
                group={g}
                clickGroup={clickGroup}
            />
        ))
    )


    //Setting up Modal for record Form
    const [modalShow, setModalShow] = useState(false);
    const handleShowModal = () => setModalShow(true);
    const handleCloseModal = () => setModalShow(false);

    let modalDisplay = (
        <Modal
            show={modalShow}
            onHide={handleCloseModal}
            centered
        >
            <Modal.Body>
                <NewGroupForm />
            </Modal.Body>
        </Modal>
    )

    return (
        <div>
            <Row className="justify-content-center p-2">
                <Col
                    md={{ span: 10 }} xs={{ span: 10 }}
                    className="text-center yellow__text"
                >
                    <h4>Groups</h4>

                </Col>
            </Row>
            {groupDisplay}
            <Row className="float__bottom">
                <Col
                    className="text-center"
                >
                    <Button
                        variant="warning"
                        className=""
                        onClick={handleShowModal}
                    >
                        Create New Group
                        </Button>
                </Col>
            </Row>
            {modalDisplay}
        </div>
    )
}
