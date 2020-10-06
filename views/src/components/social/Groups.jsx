import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import GroupHeader from './GroupHeader';
import { Button, Col, Row } from 'react-bootstrap';
const URL = process.env.REACT_APP_URL;


export default function Groups() {

    const [groupList, setGroupList] = useState([]);

    let fetchGroups = async () => {
        let token = localStorage.getItem("token");

        let getRes = await Axios.get(`${URL}/groups`,
            { headers: { "x-auth-token": token } });

        let groups = getRes.data.groups;

        console.log(groups);

        setGroupList(groups);
    }

    // fetchGroups();    
    useEffect(() => {
        fetchGroups();
    }, [])

    //Display groups
    let groupDisplay = (
        groupList.map(g => (
            <GroupHeader group={g} />
        ))
    )

    return (
        <div>
            {groupDisplay}
            <Row className="justify-content-center p-2">
                <Col
                    md={{ span: 10 }} xs={{ span: 10 }}
                >
                    <Button variant="warning" block>Create new group!</Button>

                </Col>
            </Row>
        </div>
    )
}
