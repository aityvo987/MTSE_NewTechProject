import React, { useEffect, useState } from "react";
import { DefaultNavBar } from "../../components/defaultNavBar.js";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { Topic } from "../../models/topic.js";
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
        .then(respone => {
            setIsLoading(false)
            setTopics(respone)
            console.log(respone)

            

        })
}, [])

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
            
            <div>
                <label htmlFor="sort-by">Sort By:</label>
                    <select id="sort-by" value={sortBy} onChange={handleSortByChange}>
                        <option value="createdAt">Recently Created</option>
                        <option value="updatedAt">Recently Updated</option>
                        <option value="name">By Alphabet</option>
                        <option value="level">Level</option>
                    </select>
            </div>
            <div>
                <label htmlFor="search">Search:</label>
                    <input
                        type="text"
                        id="search"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search by topic name"
                    />
            </div>

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
      {/* {coursesByCategory.map((course, index) => {
        const tutor = tutors.find((tutor) => tutor._id === course.tutorid);
        return (
          <div key={index}>
            <Topic
              topicName="Something"
              thumbnail={course.thumbnail}
              coursename={course.coursename}
              tutorid={course.tutorid}
              tutorname={tutor ? tutor.name : ""}
              category={course.category}
              level={course.level}
              description={course.description}
              studentsid={course.studentsid}
              userid={user ? user._id : ""}
            />
          </div>
        );
      })} */}
      <Topic topicName="Dùng tam đoạn luận để chứng minh thói quen của sinh viên" students="Le Van Teo" topicPeriod="2023-2024" thumbnail="https://i.imgur.com/lCDrBPZ.jpg"></Topic>
      {/* {coursesByCategory.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "50px" }}>No courses found.</p>
      )} */}
    </div>
  </div>
)}
    </div>
  );
};