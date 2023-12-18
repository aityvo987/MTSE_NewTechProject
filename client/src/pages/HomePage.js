import React from "react";
import { DefaultNavBar } from "../components/defaultNavBar.js";
import Badge from 'react-bootstrap/Badge';
export default function Homepage() {
    return (

        <div className="hot-topic-section">
            <DefaultNavBar></DefaultNavBar>
            <h2>
                Welcome <Badge bg="secondary">User</Badge>
            </h2>
            <h3 style={{marginTop:"20%"}}>You can use sidebar for locating</h3>
        </div>
               
    )
}