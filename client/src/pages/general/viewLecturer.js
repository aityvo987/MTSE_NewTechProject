import React, { useEffect, useState } from "react";
import { DefaultNavBar } from "../../components/defaultNavBar.js";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { Lecturer } from "../../models/lecturer.js";
import { GetLecturers } from "../../api/generalAPI.js";


export const ViewLecturerPage = () => {
  let test = {
    key: 1,
    name: 'Trinh Van Hoang Tam',
    faculty: 'IT',
    isFacultyChair: true,
    phoneNumber: '0913722070',
    email: 'tamhoang@gmail.com',
  }

  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [lecturers, setLecturers] = useState("");

  const [isLoading, setIsLoading] = useState(true); // Loading state

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchname = queryParams.get('search');

  const link = "./login";

  useEffect(() => {
    GetLecturers()
      .then(respone => {
        setIsLoading(false)
        setLecturers(respone)
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
    <div className="Homepage" style={{ width: "100%" }}>
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
        <h2 style={{ textAlign: "center" }}>Tất cả giảng viên</h2>


      </div>


      {isLoading ? (
        <div className="d-flex align-items-center" style={{ marginTop: "100px", marginLeft: "50px", marginRight: "100px" }}>
          <strong role="status">Loading...</strong>
          <div className="spinner-border ms-auto" aria-hidden="true"></div>
        </div>
      ) : (
        <div>

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
            {lecturers.map((lect, index) => (
              <div key={lect._id}>
                <Lecturer lecture={lect}></Lecturer>
              </div>
            ))}


          </div>
        </div>
      )}
    </div>
  );
};