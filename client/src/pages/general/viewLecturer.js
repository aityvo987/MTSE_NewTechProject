import React, { useEffect, useState } from "react";
import { DefaultNavBar } from "../../components/defaultNavBar.js";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { Lecturer } from "../../models/lecturer.js";
import { GetLecturers } from "../../api/generalAPI.js";


export const ViewLecturerPage = () => {
    let test={key:1,
        name:'Trinh Van Hoang Tam',
        faculty: 'IT',
        isFacultyChair: true,
        phoneNumber:'0913722070',
        email:'tamhoang@gmail.com',}

  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [lectures,setLectures]= useState("");

  const [isLoading, setIsLoading] = useState(true); // Loading state

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchname = queryParams.get('search');

  const link = "./login";

  useEffect(() => {
    GetLecturers()
        .then(respone => {
            setIsLoading(false)
            setLectures(respone)
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
                        placeholder="Search by lecturer name"
                    />
            </div>

      </div>
        

        {isLoading ? (
  <div className="d-flex align-items-center" style={{ marginTop: "100px", marginLeft: "50px", marginRight: "100px" }}>
    <strong role="status">Loading...</strong>
    <div className="spinner-border ms-auto" aria-hidden="true"></div>
  </div>
) : (
  <div>
    <h2 style={{ textAlign: "center" }}>Tất cả giảng viên</h2>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(500px, 1fr))",
        gap: "20px",
        marginLeft: "50px",
        marginTop: "100px",
        marginRight: "50px",
      }}
    >
      <Lecturer lecture={test}></Lecturer>
      
    </div>
  </div>
)}
    </div>
  );
};