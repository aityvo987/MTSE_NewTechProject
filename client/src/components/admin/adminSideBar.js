import { useState } from "react";
import { SignOut } from "../../api/generalAPI";
import { useNavigate } from "react-router-dom";

export const AdminSideBar = (props) => {
  const { onTabClick, activeTab } = props;
  const navigate = useNavigate();

  const handleSignOut = () => {
    SignOut();
    navigate("/");
  };

  return (
    <div className="sidebar-admin">
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-5 d-none d-sm-inline">Online Academy</span>
              </a>
              <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start justify-content-center" id="menu" style={{ width: "150px" }}>
                <li>
                  <a
                    href="#"
                    className={`nav-link px-0 align-middle ${activeTab === "student" ? "active" : ""}`}
                    onClick={() => onTabClick("student")}
                  >
                    <i className="fs-4 bi-table" /> <span className="ms-1 d-none d-sm-inline">Sinh viên</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`nav-link px-0 align-middle ${activeTab === "lecturer" ? "active" : ""}`}
                    onClick={() => onTabClick("lecturer")}
                  >
                    <i className="fs-4 bi-people" /> <span className="ms-1 d-none d-sm-inline">Giảng viên</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`nav-link px-0 align-middle ${activeTab === "period" ? "active" : ""}`}
                    onClick={() => onTabClick("period")}
                  >
                    <i className="fs-4 bi-people" /> <span className="ms-1 d-none d-sm-inline">Đợt đăng ký</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`nav-link px-0 align-middle ${activeTab === "topic" ? "active" : ""}`}
                    onClick={() => onTabClick("topic")}
                  >
                    <i className="fs-4 bi-people" /> <span className="ms-1 d-none d-sm-inline">Đề tài</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`nav-link px-0 align-middle ${activeTab === "year" ? "active" : ""}`}
                    onClick={() => onTabClick("year")}
                  >
                    <i className="fs-4 bi-people" /> <span className="ms-1 d-none d-sm-inline">Niên khoá</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`nav-link px-0 align-middle ${activeTab === "major" ? "active" : ""}`}
                    onClick={() => onTabClick("major")}
                  >
                    <i className="fs-4 bi-people" /> <span className="ms-1 d-none d-sm-inline">Chuyên ngành</span>
                  </a>
                </li>
              </ul>
              <hr />
              <div className="dropdown pb-4">
                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="https://i.imgur.com/LVUeWmJ.jpg" alt="hugenerd" width={30} height={30} className="rounded-circle" />
                  <span className="d-none d-sm-inline mx-1">Admin</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                  <li><a className="dropdown-item" onClick={handleSignOut}>Sign out</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};