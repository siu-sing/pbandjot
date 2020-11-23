import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import NewWorkoutForm from '../workout/NewWorkoutForm';



export default function GroupFeed(props) {

    const [modalShow, setModalShow] = useState(false);
    const handleShowModal = () => setModalShow(true);
    const handleCloseModal = () => setModalShow(false);

    let { id } = useParams();
    let group = props.groupList.find(e => e._id == id)

    let addWorkout = () => {
        console.log("add workout clicked.")
        handleShowModal();
    }


    let modalDisplay = (
        <Modal
            show={modalShow}
            onHide={handleCloseModal}
            centered
        >
            <Modal.Body>
                <NewWorkoutForm />
            </Modal.Body>
        </Modal>
    )

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
                    <Row className="">
                        <Col
                            className="text-center"

                        >
                            {/* Add Workout */}
                            <FontAwesomeIcon
                                className="yellow__text"
                                icon={faPlusCircle}
                                onClick={addWorkout}
                            />
                            {/* Go to Details */}
                            <Link to={`/groups/${id}/details`} className="yellow__text">
                                <FontAwesomeIcon icon={faInfoCircle} />
                            </Link>
                        </Col>
                    </Row>
                    {modalDisplay}
                </>
            }
        </>
    )
}
