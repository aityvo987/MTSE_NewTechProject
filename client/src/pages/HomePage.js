import React from "react";
import Research from "../components/Research";
import Badge from 'react-bootstrap/Badge';
export default function Homepage() {
    return (
        <div className="hot-topic-section">
            <h2>
                Hot Topic <Badge bg="secondary">New</Badge>
                </h2>
            <Research/>
        </div>
               
    )
}