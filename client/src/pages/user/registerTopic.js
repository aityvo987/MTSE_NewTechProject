import React, { useEffect, useState } from "react";
import { NavigationBar } from "../../components/NavBar.js";
import { DefaultNavBar } from "../../components/defaultNavBar";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { GetUserSession } from "../../api/generalAPI.js";
import { NormalTopic } from "../../models/normalTopic.js";
import { GetTopics } from "../../api/generalAPI.js";
import { GetAllStudents,GetAllMajors,GetAllLecturers,GetAllTopics,GetAllFaculties,GetAllTopicPeriods} from "../../api/adminAPI";
import { AddTopic} from "../../api/lecturerAPI.js";
export const RegisterTopicPage = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [topics,setTopics]= useState([]);
  const [editTopic, setEditTopic] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [lecturers,setLecturers]= useState([]);
  const [students,setStudents]= useState([]);
  const [faculties, setFaculties] = useState([]);
  const [majors, setMajors] = useState([]);
  const [topicPeriods, setTopicPeriods] = useState([]);
  const [isCreate, setIsCreate]= useState(true); 
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [selectedTopicPeriod, setSelectedTopicPeriod] = useState(null);

  const [student, setStudent] = useState([]);
  const [lecturer, setLecturer] = useState([]);
  const [user, setUser] = useState();
  const [profile, setProfile] = useState([]);
  const [role, setRole] = useState();
  const [token, setToken] = useState();
  const [hasSession, setHasSession] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const [isRegistered, setIsRegistered] = useState(false); 

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
          if (response.roles[0] === 'ROLE_STUDENT') {
            setStudent(response.userinfo);
          } else if (response.roles[0] === 'ROLE_LECTURE') {
            setLecturer(response.userinfo);
            Promise.all([GetAllStudents(response.accessToken), GetAllLecturers(response.accessToken),GetAllFaculties(response.accessToken)
              ,GetAllMajors(response.accessToken),GetAllTopics(response.accessToken),GetAllTopicPeriods(response.accessToken)])
              .then(([students, lecturers, faculties,majors,topics,topicperiods]) => {
                
                setStudents(students);
                console.log("Find student",students);
                setLecturers(lecturers);
                setTopics(topics);
                console.log("Topics:",topics);
                setFaculties(faculties);
                setMajors(majors);
                setTopicPeriods(topicperiods);
                setIsLoading(false);
              })
              .catch((error) => {
                console.log(error);
              });
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
        if (role[0]==="ROLE_STUDENT"){
            const registeredTopics = response.filter((topic) => {
                return topic.students.some((studentObj) => studentObj._id === student._id);
              });
              setIsRegistered(registeredTopics.length > 0);
              filteredTopics = response.filter(
                  (topic) => topic.students.length !== 2 
                )
        }else if (role[0]==="ROLE_LECTURE"){
            filteredTopics = response.filter(
                (topic) => topic.instructor===null
              )
        }
        
        setTopics(filteredTopics);
        
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Failed to fetch topics:", error);
        setIsLoading(false);
      });
  }, [role,student]);
const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    if (isCreate) {
      console.log("Create topic", editTopic);
      if (
        !editTopic.topicName ||
        !editTopic.description ||
        !editTopic.faculty ||
        !editTopic.major ||
        !editTopic.topicPeriod
      ) {
        window.alert("Please fill in all required fields.");
        return;
      }
  
      const studentsToAdd = [];
      if (editTopic.studentid1) {
        const student1 = students.find(
          (student) => student.studentId === editTopic.studentid1
        );
        if (student1) {
          studentsToAdd.push(student1);
        }else{
          window.alert("Không thể tìm thấy sinh viên 2");
          return;
        }
      }
      if (editTopic.studentid2) {
        const student2 = students.find(
          (student) => student.studentId === editTopic.studentid2
        );
        if (student2) {
          studentsToAdd.push(student2);
        }else{
          window.alert("Không thể tìm thấy sinh viên 2");
          return;
        }
      }
  
      AddTopic(
        token,
        editTopic.topicName,
        editTopic.description,
        studentsToAdd,
        editTopic.faculty,
        editTopic.major,
        editTopic.topicPeriod
      )
        .then((topicData) => {
          console.log("Create Topic",topicData);
          if (topicData.status === 201) {
            alert("Topic created");
            window.location.reload();
          } else {
            alert("Error creating topic");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Internal error, please try again sometime later");
        });
    } else {
      console.log("Update topic", editTopic);
      if (
        !editTopic.topicName ||
        !editTopic.description ||
        !editTopic.faculty ||
        !editTopic.major ||
        !editTopic.students ||
        !editTopic.topicPeriod
      ) {
        window.alert("Please fill in all required fields.");
        return;
      }
  
      const studentsToAdd = [];
      if (editTopic.studentid1) {
        const student1 = students.find(
          (student) => student.studentId === editTopic.studentid1
        );
        if (student1) {
          studentsToAdd.push(student1);
        }else{
          window.alert("Không thể tìm thấy sinh viên 2");
          return;
        }
      }
      if (editTopic.studentid2) {
        const student2 = students.find(
          (student) => student.studentId === editTopic.studentid2
        );
        if (student2) {
          studentsToAdd.push(student2);
        }else{
          window.alert("Không thể tìm thấy sinh viên 2");
          return;
        }
      }
    }
  };
  const handleFormCancel = () => {
    setShowForm(false);
    setEditTopic(null);
    setIsCreate(true);
  };
  const handleFacultyChange = (event) => {
    const selectedFaculty = event.target.value;
    setSelectedFaculty(selectedFaculty);
    const selectedFacultyData = faculties.find(faculty => faculty.facultyName === selectedFaculty);
    setEditTopic({ ...editTopic, faculty: selectedFacultyData });
  };
  const handleMajorChange = (event) => {
    const selectedMajor = event.target.value;
    setSelectedMajor(selectedMajor);
    const selectedMajorData = majors.find(major => major.majorName === selectedMajor);
    setEditTopic({ ...editTopic, major: selectedMajorData });
  };
  const handleTopicPeriodChange = (event) => {
    const selectedTopicPeriod = event.target.value;
    setSelectedTopicPeriod(selectedTopicPeriod);
    const selectedTopicPeriodData = topicPeriods.find(topic => topic.topicPeriodName === selectedTopicPeriod);
    setEditTopic({ ...editTopic, topicPeriod: selectedTopicPeriodData });
  };
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
            <h2 style={{ textAlign: "center" }}>Bạn đã đăng ký đề tài rồi</h2>
          ) : (
            <div className="content">
              <button type="button" className="btn btn-primary w-50 py-2 btn-3d"
                              
                              style={{
                                border: "none",
                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                                transform: "translateY(0)",
                                transition: "transform 0.2s ease-in-out",
                                marginBottom:"20px",
                              }} onClick={toggleForm}>
                      Đăng ký đề tài mới
              </button>
              {showForm && (
                <div className="form-edit">
                  <form onSubmit={handleFormSubmit}>
                  <form className="content-form" style={{marginBottom:"50px"}}>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="name" 
                        placeholder="name topic"value={editTopic?editTopic.topicName:""}
                        onChange={(e) =>
                          setEditTopic({ ...editTopic, topicName: e.target.value })
                        } />
                        <label for="floatingPassword">Tên đề tài</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="name" 
                        placeholder="des topic"value={editTopic?editTopic.description:""}
                        onChange={(e) =>
                          setEditTopic({ ...editTopic, description: e.target.value })
                        } />
                        <label for="floatingPassword">Miêu tả</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="name" 
                        placeholder="name student"value={editTopic?editTopic.studentid1:""}
                        onChange={(e) =>
                          setEditTopic({ ...editTopic, studentid1: e.target.value })
                        } />
                        <label for="floatingPassword">MSSV Sinh viên 1</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="name" 
                        placeholder="name student"value={editTopic?editTopic.studentid2:""}
                        onChange={(e) =>
                          setEditTopic({ ...editTopic, studentid2: e.target.value })
                        } />
                        <label for="floatingPassword">MSSV Sinh viên 2</label>
                    </div>
                    
                    <label htmlFor="faculty">Khoa:</label>
                    <select id="faculty" value={selectedFaculty} onChange={handleFacultyChange}>
                        {/* <option value="">{editStudent ? editStudent.faculty.facultyName : "Select a faculty"}</option> */}
                        <option value="">Select a faculty</option>
                        {faculties.map((faculty) => (
                          <option key={faculty.id} value={faculty.facultyName}>
                            {faculty.facultyName}
                          </option>
                        ))}
                    </select>
                    <label htmlFor="major" style={{marginLeft:"20px"}}>Chuyên ngành:</label>
                    <select id="major" value={selectedMajor} onChange={handleMajorChange}>
                      <option value="">Select a major</option>
                      {majors.map((major) => (
                        <option key={major.id} value={major.majorName}>
                          {major.majorName}
                        </option>
                      ))}
                    </select>
                    <div>
                    <label htmlFor="period" style={{marginLeft:"20px"}}>Đợt đăng ký:</label>
                    <select id="period" value={selectedTopicPeriod} onChange={handleTopicPeriodChange}>
                      <option value="">Select a topic period</option>
                      {topicPeriods.map((topic) => (
                        <option key={topic.id} value={topic.topicPeriodName}>
                          {topic.topicPeriodName}
                        </option>
                      ))}
                    </select>
                    </div>
                    </form>
                    <button
                      className="btn btn-light w-50 py-2 btn-3d"
                      type="submit"
                      style={{
                        border: "none",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                        transform: "translateY(0)",
                        transition: "transform 0.2s ease-in-out",
                        marginBottom:"20px",
                      }}
                      onClick={handleFormCancel}
                    >
                      Huỷ
                    </button>
                    <button className="btn btn-dark w-50 py-2 btn-3d"
                              type="submit"
                              style={{
                                border: "none",
                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                                transform: "translateY(0)",
                                transition: "transform 0.2s ease-in-out",
                                marginBottom:"20px",
                              }}>
                      Lưu
                    </button>
                  </form>
                </div>
              )}
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
                    <NormalTopic
                      topic={topic}
                      token={token}
                      student={student}
                      lecture={lecturer}
                      role={role}
                    ></NormalTopic>
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