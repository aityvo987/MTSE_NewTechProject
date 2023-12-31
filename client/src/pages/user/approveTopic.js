import React, { useEffect, useState } from "react";
import { NavigationBar } from "../../components/NavBar.js";
import { DefaultNavBar } from "../../components/defaultNavBar.js";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { GetUserSession } from "../../api/generalAPI.js";
import { PendingTopic } from "../../models/pendingTopic.js";
import { GetTopics } from "../../api/generalAPI.js";

export const ApproveTopicPage = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [lecturer, setLecturer] = useState([]);
  const [user, setUser] = useState();
  const [role, setRole] = useState();
  const [token, setToken] = useState();
  const [hasSession, setHasSession] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isRegistered, setIsRegistered] = useState(false); // Registration state

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchname = queryParams.get('search');

  const link = "./login";

  useEffect(() => {
    GetUserSession()
      .then((response) => {
        if (response.userinfo !== null && typeof response.userinfo !== "undefined") {
          console.log("GetUserSession", response);
          setUser(response.userinfo);
          setRole(response.roles);
          setToken(response.accessToken);
          setHasSession(true);
          if (response.roles.includes('ROLE_FACULTY HEAD')) {
            setLecturer(response.userinfo);
          } else {
            navigate("/");
          }
        } else {
          navigate("/");
        }
      });
  }, []);
  if (role==="ROLE_STUDENT"){
    
  }
  useEffect(() => {
    GetTopics()
      .then((response) => {
        let filteredTopics=[];
        filteredTopics = response.filter(
            (topic) =>  !topic.isApproved
            )
        setTopics(filteredTopics);
        
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Failed to fetch topics:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="Homepage" style={{ width: "100%" }}>
      {!hasSession ? (
        // Render tutor-specific content
        <DefaultNavBar></DefaultNavBar>
      ) : (
        <NavigationBar user={user} role={role}> </NavigationBar>
      )}
      <div
        className="customize-sort"
        style={{
          marginLeft: "50px",
          marginTop: "150px",
          marginRight: "50px",
          backgroundColor: "#ececec",
          padding: "20px",
          borderRadius: "22px",
          display: "flex",
          flexDirection: "column",
        }}
      ></div>

      {isLoading ? (
        // Render loading message if still loading
        <div
          className="d-flex align-items-center"
          style={{ marginTop: "100px", marginLeft: "50px", marginRight: "100px" }}
        >
          <strong role="status">Loading...</strong>
          <div className="spinner-border ms-auto" aria-hidden="true"></div>
        </div>
      ) : (
        <div>
          {isRegistered ? (
            <h2 style={{ textAlign: "center" }}>You have already registered</h2>
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
                    <PendingTopic
                      topic={topic}
                      token={token}
                      role={role}
                    ></PendingTopic>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};