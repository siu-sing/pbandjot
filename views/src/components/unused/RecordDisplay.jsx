import React, { useState } from 'react'
import { Col, Row, Button, Modal } from 'react-bootstrap'
import moment from 'moment';
import Axios from 'axios';
const URL = process.env.REACT_APP_URL;

export default function RecordDisplay(props) {

    let { pb_date, pb_time_min, pb_time_sec, pb_weight, prescribed, liked_by } = props.record;
    let { _id, description, prescribed_female, prescribed_male, workout_name, workout_type } = props.workout;

    //SET PB VALUE
    let pb_value = "";
    switch (workout_type) {
        case "weightlifting":
            pb_value = `${pb_weight}lb`;
            break;
        case "benchmark":
            pb_value = `${pb_time_min}:${pb_time_sec.toString().padStart(2, '0')}`
            break;
        default:
            break;
    }
    let pb_date_display = moment().diff(pb_date, "days") > 5 ? moment(pb_date).format("D MMM YYYY") : moment(pb_date).fromNow();

    //HANDLE RECORD DELETION
    let deleteHandler = async (record_id) => {
        let token = localStorage.getItem("token");
        try {
            let delRes = await Axios.delete(`${URL}/records/${record_id}`,
                {
                    headers: {
                        "x-auth-token": token
                    }
                })
            await props.fetchRecords();
            handleClose();
        } catch (error) {
            console.log(error)
        }
    };

    const [showDel, setShowDel] = useState(false);
    const handleClose = () => setShowDel(false);
    const handleShow = () => setShowDel(true)

    let recordDisplay = (
        <>
            <Row className="my-2">
                <Col xs={5}>
                    <Row className="">
                        <Col
                            // xs={9}
                            className="text-right p-0">
                            {pb_value}
                        </Col>
                        <Col
                            // xs={3}
                            className="p-0 pl-1 text-center">
                            {prescribed_male && prescribed && "Rx"}
                        </Col>
                    </Row>
                </Col>
                <Col xs={5} className="text-muted font-italic text-center">{pb_date_display}</Col>
                <Col xs={2}>
                    <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={handleShow}
                    >
                        -
                    </Button>
                </Col>
            </Row>
            <Modal show={showDel} onHide={handleClose}>
                <Modal.Header closeButton>
                    Delete record?
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="danger" onClick={() => deleteHandler(props.record._id)}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

    return (
        <div>
            {recordDisplay}
        </div>
    )
}
