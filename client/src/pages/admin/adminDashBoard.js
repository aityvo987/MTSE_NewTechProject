import React, { useEffect, useState } from "react";
// import { GetUserSession, SignOut } from "../api/generalAPI.js";
import { useNavigate } from "react-router-dom";

import { AdminHeadBar } from "../../components/admin/adminHeadBar.js";
import { AdminSideBar } from "../../components/admin/adminSideBar.js";
import { ManageStudents } from "./manageStudents.js";
import { ManageLecturers } from "./manageLecturers.js";
import { ManageYears } from "./manageYears.js";
import { ManageTopics } from "./manageTopics.js";
import { ManageMajors } from "./manageMajors.js";
import { ManagePeriods } from "./managePeriods.js";

export const AdminPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [activeTab, setActiveTab] = useState("student");

  // useEffect(() => {
  //   GetUserSession().then((response) => {
  //     if (response.role !== "admin") {
  //       navigate("/");
  //     } else {
  //       setUser(response.userinfo.role);
  //     }
  //   });
  // }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="admin-dashboard">
      <AdminSideBar onTabClick={handleTabClick} activeTab={activeTab} />
      <AdminHeadBar />
      {activeTab === "student" && <ManageStudents />}
      {activeTab === "lecturer" && <ManageLecturers />}
      {activeTab === "year" && <ManageYears />}
      {activeTab === "topic" && <ManageTopics />}
      {activeTab === "major" && <ManageMajors />}
      {activeTab === "period" && <ManagePeriods />}
    </div>
  );
};