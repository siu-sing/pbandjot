import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import GroupHeader from './GroupHeader';
import { Button, Col, Row } from 'react-bootstrap';
import GroupFeed from './GroupFeed';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
} from "react-router-dom";
import GroupList from './GroupList';
import GroupDetails from './GroupDetails';
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

    return (
        <div>
            <Switch>
                <Route path="/groups/:id/details" children={<GroupDetails groupList={groupList} />} />
                <Route path="/groups/:id" children={<GroupFeed groupList={groupList} />} />
                <Route path="/groups" children={<GroupList groupList={groupList} exact/>} />
            </Switch>
        </div>
    )
}
