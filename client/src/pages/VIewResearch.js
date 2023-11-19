import React from "react";
import { data } from '../data';
import Research from "../components/Research";
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import DocViewer from "react-doc-viewer";
export default function Homepage() {
    // Specify the ID of the research you want to display
    const specificResearchId = 2; // Change this to the desired ID

    // Find the specific research in the data array
    const specificResearch = data.find(research => research.idresearch === specificResearchId);

    if (!specificResearch) {
      return <p>Research not found.</p>;
    }

    return (
        <div className="hot-topic-section">
            <h2>
            {specificResearch.researchName }
            </h2>
            <h2>
                <Badge bg="secondary">Author: {specificResearch.authorName}</Badge>
            </h2>
            <div className="document-viewer">
            <h2>{specificResearch.content}</h2>
            </div>
        </div>
    );
}