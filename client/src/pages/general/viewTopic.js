import React, { useEffect, useState } from "react";
import { DefaultNavBar } from "../../components/defaultNavBar.js";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { Topic } from "../../models/sampleTopic.js";
import { GetTopics } from "../../api/generalAPI.js";


export const ViewTopicPage = () => {
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [topics,setTopics]= useState([]);

  const [isLoading, setIsLoading] = useState(true); // Loading state

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchname = queryParams.get('search');

  const link = "./login";


  useEffect(() => {
    GetTopics()
      .then(response => {
        const updatedTopics = response.map(topic => {
          const studentsNames = topic.students.map(student => student.name);
          const joinedNames = studentsNames.join(", ");
          return { ...topic, studentsNames: joinedNames };
        });
        setIsLoading(false);
        setTopics(updatedTopics);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <div className="Homepage" style={{width:"100%"}}>
        <DefaultNavBar></DefaultNavBar>
      <div className="customize-sort" style={{
              marginLeft: "50px",
              marginTop: "150px",
              marginRight: "50px",
              backgroundColor: "#ececec",
              padding: "20px",
              borderRadius: "22px",
              display: "flex",
              flexDirection: "column",
            }}>
      </div>
        

        {isLoading ? (
  // Render loading message if still loading
  <div className="d-flex align-items-center" style={{ marginTop: "100px", marginLeft: "50px", marginRight: "100px" }}>
    <strong role="status">Loading...</strong>
    <div className="spinner-border ms-auto" aria-hidden="true"></div>
  </div>
) : (
  <div>
    <h2 style={{ textAlign: "center" }}>Tất cả đề tài</h2>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "20px",
        marginLeft: "50px",
        marginTop: "100px",
        marginRight: "50px",
      }}
    >
      {topics.map((topic, index) => (
                  <div key={index}>
                    <Topic data={topic} students={topic.studentsNames}></Topic>
                  </div>
                ))}
      
    </div>
  </div>
)}
    </div>
  );
};