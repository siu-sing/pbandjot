import React, { useState } from 'react'
import { Row, Col, Button, Modal } from 'react-bootstrap'
import WorkoutIconDisplay from './WorkoutIconDisplay'
import WorkoutRecord from './WorkoutRecord'
import { useHistory } from "react-router-dom";
import back_icon from '../../back_icon.svg'
import NewRecordForm from './NewRecordForm';

export default function WorkoutDisplay(props) {

    const history = useHistory();
    let workout = props.currentWorkout;

    //Sort function
    let compareRecords = (a, b) => {
        if (a.pb_date > b.pb_date) {
            return -1;
        } else if (a.pb_date < b.pb_date) {
            return 1;
        } else {
            return 0;
        }
    }

    if (Object.keys(workout).length < 1) {
        history.push("/home")
    }

    let workoutRecordDisplay = null;
    if (Object.keys(workout).length > 0) {
        let records = workout.records;
        //Sort records, with latest date desc
        records.sort(compareRecords);
        workoutRecordDisplay = (
            records.map((r, idx) => (
                <WorkoutRecord
                    record={r}
                    workout={workout}
                    key={r._id}
                    rank={idx}
                />
            ))
        )
    }

    let homeArrow = (
        <a href="/home">
            <img src={back_icon} alt="back" width="30px" className="top__left__padded" />
        </a>
    )

    const [modalShow, setModalShow] = useState(false);
    const handleShowModal = () => setModalShow(true);
    const handleCloseModal = () => setModalShow(false);

    let display =
        (
            <>
                <Row className="justify-content-center yellow__background p-2">
                    {homeArrow}
                    <Col>
                        <Row>
                            <Col className="text-center mt-2">
                                <h1>
                                    {workout.workout_name}
                                </h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <WorkoutIconDisplay />
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col
                                className="text-center small m-2"
                                md={{ span: 6 }} xs={{ span: 12 }}
                            >
                                {workout.description}
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center m-3 font-weight-bold yellow__text">
                        Your Personal Bests
        </Col>
                </Row>
                <Row className="justify-content-center p-2">
                    <Col
                        // className="border border-sucess"
                        md={{ span: 6 }} xs={{ span: 12 }}
                    >
                        {workoutRecordDisplay}
                    </Col>
                </Row>
                <Row className="justify-content-center p-2">
                    <Col
                        md={{ span: 6 }} xs={{ span: 4 }}
                    >
                        <Button variant="warning" onClick={handleShowModal} block>Add New PB</Button>
                    </Col>
                </Row>
            </>
        )

    let mainDisplay = "";
    if (workout) {
        mainDisplay = display;
    }

    let modalDisplay = (
        <Modal
            show={modalShow}
            onHide={handleCloseModal}
            centered
        >
            <Modal.Body
            >
                <NewRecordForm workout_type = {workout.workout_type}/>
            </Modal.Body>


        </Modal>
    )

    return (
        <>
            {mainDisplay}
            {modalDisplay}
        </>
    )
}
