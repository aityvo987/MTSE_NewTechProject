import React, { useEffect, useState } from "react";
import { DefaultNavBar } from "../components/defaultNavBar.js";
import { NavigationBar } from "../components/NavBar";
import Badge from "react-bootstrap/Badge";
import { GetUserSession } from "../api/generalAPI";
import { useNavigate } from "react-router-dom";
import { GetAllNotifications, GetNotification } from "../api/generalAPI.js";

export default function Homepage() {
  const navigate = useNavigate();
  const [hasSession, setHasSession] = useState(false);
  const [user, setUser] = useState();
  const [roles, setRoles] = useState();
  const [isEmpty, setIsEmpty] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    GetUserSession().then((response) => {
      if (response.userinfo !== null && typeof response.userinfo !== "undefined") {
        console.log("Userinfo", response.userinfo);
        setHasSession(true);
        setUser(response.userinfo);
        setRoles(response.roles);
        if (response.userinfo === "ADMIN") {
          navigate("/admin");
        }
      } else {
        console.log("error");
      }
    });
  }, []);

  useEffect(() => {
    GetAllNotifications().then((response) => {
      console.log(response);
      setNotifications(response);
      if (response.message) {
        setIsEmpty(true);
        console.log(response.message);
      }
    });
  }, []);

  return (
    <div className="hot-topic-section">
      {!hasSession ? (
        // Render tutor-specific content
        <DefaultNavBar></DefaultNavBar>
      ) : (
        <NavigationBar user={user} role={roles}></NavigationBar>
      )}
  
      <h2>
        Welcome <Badge bg="secondary">{user ? user.name : "Guest"}</Badge>
      </h2>
      <div className="carolsel" style={{ height: "300px" }}>
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" style={{ height: "100%" }}>
            <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner" style={{ height: "100%" }}>
            <div className="carousel-item active" style={{ height: "100%" }}>
                <img src="https://i.imgur.com/fmghy5K.jpg" className="d-block w-100" alt="..." style={{ objectFit: "cover", height: "100%" }} />
                <div className="carousel-caption d-none d-md-block" style={{ textShadow: "2px 2px 4px #000000" }}>
                <h5 style={{ color: "white" }}>Online Academy</h5>
                <p style={{ color: "white" }}>Chào mừng bạn đến với Website của chúng tôi.</p>
                </div>
            </div>
            <div className="carousel-item" style={{ height: "100%" }}>
                <img src="https://i.imgur.com/xUm4LR4.jpg" className="d-block w-100" alt="..." style={{ objectFit: "cover", height: "100%" }} />
                <div className="carousel-caption d-none d-md-block" style={{ textShadow: "2px 2px 4px #000000" }}>
                <h5 style={{ color: "white" }}>Sinh viên</h5>
                <p style={{ color: "white" }}>Bạn có thể đăng ký và thực hiện đề tài theo yêu cầu GV</p>
                </div>
            </div>
            <div className="carousel-item" style={{ height: "100%" }}>
                <img src="https://i.imgur.com/cGA6A0j.jpg" className="d-block w-100" alt="..." style={{ objectFit: "cover", height: "100%" }} />
                <div className="carousel-caption d-none d-md-block" style={{ textShadow: "2px 2px 4px #000000" }}>
                <h5 style={{ color: "white" }}>Giảng viên</h5>
                <p style={{ color: "white" }}>Bạn có thể giao và đánh giá cho sinh viên.</p>
                </div>
            </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
            </button>
        </div>
        </div>
      <h3 style={{ marginTop: "10%" }}>Bạn có thể sử dụng thanh công cụ bên cạnh để chuyển hướng.</h3>
      <div
        className="category"
        style={{
          marginLeft: "50px",
          marginTop: "100px",
          marginRight: "50px",
          backgroundColor: "#ececec",
          padding: "20px",
          borderRadius: "22px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Center items horizontally
        }}
      >
        <h2 style={{ textAlign: "center" }}>Thông báo</h2>
        <div className="courses-container" style={{ display: "flex", paddingBottom: "10px", width: "50%" }}>
          <ul className="list-group" style={{ width: "100%" }}>
            {isEmpty ? (
              <li className="list-group-item">Không có thông báo nào hết</li>
            ) : (
              <>
                {notifications.map((notify, index) => (
                  <li key={index} className="list-group-item" style={{ width: "100%" }}>
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">{notify.title}</div>
                        Date: {notify.lastUpdatedAt.split("T")[0]}
                      </div>
                    </div>
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}