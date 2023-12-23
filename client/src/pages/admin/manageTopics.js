import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllStudents,GetAllMajors,GetAllLecturers,GetAllTopics,GetAllFaculties,UpdateTopic,DeleteTopic,AddTopic, GetAllTopicPeriods} from "../../api/adminAPI";
import { GetUserSession } from "../../api/generalAPI";
export const ManageTopics = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); 
  const [deleteTopic, setDeleteTopic] = useState(null); 
  const [editTopic, setEditTopic] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState();
  const [role, setRole] = useState();
  const [token, setToken] = useState();
  const [hasSession, setHasSession] = useState(false);
  

  const [topics,setTopics]= useState([]);
  const [lecturers,setLecturers]= useState([]);
  const [students,setStudents]= useState([]);
  const [faculties, setFaculties] = useState([]);
  const [majors, setMajors] = useState([]);
  const [topicPeriods, setTopicPeriods] = useState([]);
  const [isCreate, setIsCreate]= useState(true); 
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [selectedTopicPeriod, setSelectedTopicPeriod] = useState(null);


  useEffect(() => {
    GetUserSession()
      .then((response) => {
        if (response.userinfo !== null && typeof response.userinfo !== "undefined") {
          console.log("GetUserSession", response);
          setUser(response.userinfo);
          setRole(response.roles);
          setToken(response.accessToken);
          setHasSession(true);
          if (response.roles.includes('ROLE_ADMIN')) {
          } else {
            navigate("/");
          }
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
        } else {
          console.log("error");
        }
      });
  }, []);
  
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
  
      UpdateTopic(
        token,
        editTopic._id,
        editTopic.topicName,
        editTopic.description,
        studentsToAdd,
        editTopic.faculty,
        editTopic.major,
        editTopic.topicPeriod
      )
        .then((response) => {
          console.log("Update", response);
          if (response.status === 201) {
            alert("Topic updated");
            window.location.reload();
          } else if (response.status === 404) {
            alert("Can't find topic");
          } else {
            alert("Internal error");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Internal error, please try again sometime later");
        });
    }
  };

  const handleEdit = (topic) => {
    const student1 = topic.students && topic.students[0] ? topic.students[0].studentId : '';
    const student2 = topic.students && topic.students[1] ? topic.students[1].studentId : '';
  
    setEditTopic({
      ...topic,
      studentid1: student1,
      studentid2: student2,
    });
  
    setIsCreate(false);
    setShowForm(true);
  };
  const handleDelete = (student) => {
    setDeleteTopic(student);
  };

  const confirmDelete = () => {
    if (deleteTopic) {
      console.log("Deleting", deleteTopic._id);
      DeleteTopic(token, deleteTopic._id)
        .then((response) => {
          console.log("Delete", response);
          if (response.status === 201) {
            alert("Topic deleted");
          } else {
            alert(response.message);
          }
        })
        .finally(() => {
          setDeleteTopic(null);
        });
    }
  };
  const cancelDelete = () => {
    setDeleteTopic(null);
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
      <div className="content-admin">
        <h1>Danh sách đề tài</h1>
        {isLoading ? (
          <div className="d-flex align-items-center">
            <strong role="status">Loading...</strong>
            <div className="spinner-border ms-auto" aria-hidden="true"></div>
          </div>
        ) : (
          <div className="content">
            
            <button type="button" className="btn btn-primary btn-sm" onClick={toggleForm}>
                    Thêm
            </button>
            {deleteTopic && (
              <div className="confirmation-dialog">
                <p>Are you sure you want to delete this topic?</p>
                <button className="btn btn-danger" onClick={confirmDelete}>
                  Yes
                </button>
                <button className="btn btn-secondary" onClick={cancelDelete}>
                  No
                </button>
              </div>
            )}      
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
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleFormCancel}
                >
                  Huỷ
                </button>
                <button type="submit" className="btn btn-primary">
                  Lưu
                </button>
              </form>
            </div>
          )}
            <table className="table smaller-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Tên đề tài</th>
                  <th scope="col">Miêu tả</th>
                  <th scope="col">Sinh viên 1</th>
                  <th scope="col">Sinh viên 2</th>
                  <th scope="col">GVHD</th>
                  <th scope="col">Được xét duyệt</th>
                  <th scope="col">Ngành</th>
                  <th scope="col">Chuyên ngành</th>
                  <th scope="col">Đợt đăng ký</th>
                </tr>
              </thead>
              <tbody>
                {topics.map((topic, index) => (
                  <tr key={topic._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{topic.topicName}</td>
                    <td>{topic.description}</td>
                    <td>{topic.students?topic.students[0]?topic.students[0].studentId:"":""}</td>
                    <td>{topic.students?topic.students[1]?topic.students[1].studentId:"":""}</td>
                    <td>{topic.instructor?topic.instructor.name:""}</td>
                    <td>{topic.isApproved ? <span>&#10004;</span> : null}</td>
                    <td>{topic.faculty?topic.faculty.facultyName:""}</td>
                    <td>{topic.major?topic.major.majorName:""}</td>
                    <td>{topic.topicPeriod?topic.topicPeriod.topicPeriodName:""}</td>
                    <td>
                    <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => handleEdit(topic)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-warning btn-sm"
                          onClick={() => handleDelete(topic)}
                        >
                          Delete
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
      </div>
  );
};