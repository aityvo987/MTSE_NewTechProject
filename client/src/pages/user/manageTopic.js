import React, { useEffect, useState } from "react";
import { NavigationBar } from "../../components/NavBar.js";
import { DefaultNavBar } from "../../components/defaultNavBar";
import { useNavigate } from "react-router-dom";
import { GetUserSession, GetTopics } from "../../api/generalAPI.js";
import {AddTopicTask, GetTopicTasksTopic,CommentTopicTask} from"../../api/lecturerAPI.js";
import {UploadTopicTaskFile,GetAllTopicTaskFile,DownLoadTopicTaskFile} from"../../api/studentAPI.js";
import "../../style/ManageTopic.css";

export const ManageTopic = () => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [user, setUser] = useState();
  const [role, setRole] = useState();
  const [token, setToken] = useState();
  const [hasSession, setHasSession] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [topics, setTopics] = useState([]);
  const [student, setStudent] = useState([]);
  const [lecturer, setLecturer] = useState([]);
  const [topicTasks, setTopicTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [commentForm, setCommentForm] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [newComment, setNewComment] = useState("");
  const [selectedFile, setSelecTedFile] = useState("");

  useEffect(() => {
    GetUserSession().then((response) => {
      if (response.userinfo !== null && typeof response.userinfo !== "undefined") {
        console.log("GetUserSession", response);
        setUser(response.userinfo);
        setRole(response.roles);
        setToken(response.accessToken);
        setHasSession(true);
        if (response.roles[0] === "ROLE_STUDENT") {
          setStudent(response.userinfo);
        } else if (response.roles[0] === "ROLE_LECTURE") {
          setLecturer(response.userinfo);
        }
      } else {
        navigate("/");
      }
    });
  }, []);

  useEffect(() => {
    GetTopics()
      .then((response) => {
        let filteredTopics = [];

        if (role[0] === "ROLE_STUDENT") {
          filteredTopics = response.filter((topic) =>
            topic.students.some((studentObj) => studentObj._id === student._id)
          );
        } else if (role[0] === "ROLE_LECTURE") {
          filteredTopics = response.filter(
            (topic) => topic.instructor && topic.instructor._id === lecturer._id
          );
        }

        setTopics(filteredTopics);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Failed to fetch topics:", error);
        setIsLoading(false);
      });
  }, [role, student, lecturer]);

  const handleTopicChange = async (event) => {
    const topicId = event.target.value;
    const selectedTopic = topics.find((topic) => topic._id === topicId.toString());
    setSelectedTopic(selectedTopic);
  
    if (selectedTopic) {
      try {
        const tasks = await GetTopicTasksTopic(token, topicId);
        console.log("Check Topic Task", tasks);
  
        for (const task of tasks) {
          const fileData = await GetAllTopicTaskFile(token,task._id);
          task.fileData = fileData;
        }
        console.log("Check file",tasks);
        setTopicTasks(tasks);
      } catch (error) {
        console.log("Failed to fetch topic tasks:", error);
      }
    }
  };
  const toggleForm = (taskId) => {
    setShowForm(true);
    setNewTask( {...newTask, topic: taskId })
  };
  const handleFormCancel = () => {
    setShowForm(false);
    setNewTask(null);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("New Task:", newTask);
    AddTopicTask(token,newTask.taskName,newTask.description,newTask.deadline,newTask.topic)
    .then((response) => {
      if (response.status === 201) {
        alert("Finish comment");
        window.location.reload();
      } else {
        alert(response.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Internal error, please try again sometime later");
    });

    setNewTask(null);
    setShowForm(false);
  };
  const toggleFormComment = (taskId) => {
    setNewComment({...newComment, topicTaskId: taskId })
    setCommentForm(true);
  };
  const handleFormCommentCancel = () => {
    setCommentForm(false);
  };

  const handleFormCommentSubmit = (event) => {
    event.preventDefault();
    console.log("New Comment:", newComment);
    CommentTopicTask(token,newComment.topicTaskId,newComment.comment)
    .then((response) => {
      if (response.status === 201) {
        alert("Add new comment topic task");
        window.location.reload();
      } else {
        alert(response.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Internal error, please try again sometime later");
    });

    setNewTask(null);
    setShowForm(false);
  };

const DownLoadHandler =(fileId) =>{
  DownLoadTopicTaskFile(token,fileId);
}
  //FOr student
  const handleFileInputChange = async (event, taskId) => {
    const newFile = event.target.files[0];
    setSelecTedFile((prevSelectedFile) => ({
      ...prevSelectedFile,
      [taskId]: newFile,
    }));
  };
  
  const handleFileUploadCancel = (taskId) => {
    setSelecTedFile((prevSelectedFile) => ({
      ...prevSelectedFile,
      [taskId]: null,
    }));
  };
  const handleFileUploadConfirmation = (taskId) => {
    console.log("Upload file", selectedFile[taskId]);
    UploadTopicTaskFile(token, taskId, selectedFile[taskId]);
    setSelecTedFile((prevSelectedFile) => ({
      ...prevSelectedFile,
      [taskId]: null,
    }));
    window.location.reload();
  };

  return (
    <div className="Homepage" style={{ width: "100%" }}>
      {!hasSession ? (
        <DefaultNavBar />
      ) : (
        <NavigationBar user={user} role={role} />
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
        <div
          className="d-flex align-items-center"
          style={{ marginTop: "100px", marginLeft: "50px", marginRight: "100px" }}
        >
          <strong role="status">Loading...</strong>
          <div className="spinner-border ms-auto" aria-hidden="true"></div>
        </div>
      ) : (
        <div>
          {!topics.length ? (
            <h2 style={{ textAlign: "center" }}>
              Bạn chưa đăng ký bất cứ đề tài nào
            </h2>
          ) : (
            <div className="container">
              <div className="content">
                <label htmlFor="topicSelect" className="label">
                  Chọn một đề tài:
                </label>
                <select id="topicSelect" className="dropdown" onChange={handleTopicChange}>
                  <option value="">Chọn</option>
                  {topics.map((topic) => (
                    <option key={topic._id} value={topic._id}>
                      {topic.topicName}
                    </option>
                  ))}
                </select>

                {selectedTopic && (
                  <div className="topic-details">
                    <h2 className="section-title">Chi tiết đề tài</h2>
                    <p>
                      <strong>Tên đề tài:</strong> {selectedTopic.topicName}
                    </p>
                    <p>
                      <strong>Miêu tả đề tài:</strong> {selectedTopic.description}
                    </p>
                    {role[0] === "ROLE_LECTURE" && showForm ? (
                      <div className="form-edit">
                        <form onSubmit={handleFormSubmit}>
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              placeholder="name student"
                              value={newTask.taskName}
                              onChange={(e) =>
                                setNewTask({ ...newTask, taskName: e.target.value })
                              }
                            />
                            <label htmlFor="name">Tên task</label>
                          </div>
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="studentId"
                              placeholder="name student"
                              value={newTask.description}
                              onChange={(e) =>
                                setNewTask({ ...newTask, description: e.target.value })
                              }
                            />
                            <label htmlFor="studentId">Miêu tả</label>
                          </div>
                          <div className="form-floating mb-3">
                            <input
                              type="date"
                              className="form-control"
                              id="dueDate"
                              placeholder="name student"
                              value={newTask.deadline}
                              onChange={(e) =>
                                setNewTask({ ...newTask, deadline: e.target.value })
                              }
                            />
                            <label htmlFor="dueDate">Deadline</label>
                          </div>
                          <div
                            className="btn-group w-100"
                            role="group"
                            aria-label="Button Group"
                            style={{marginTop:"30px",marginBottom:"30px"}}
                          >
                            <button
                              onClick={handleFormCancel}
                              className="btn btn-light w-50 py-2 btn-3d"
                              style={{
                                border: "none",
                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                                transform: "translateY(0)",
                                transition: "transform 0.2s ease-in-out",
                              }}
                            >
                              Huỷ
                            </button>
                            <button
                              className="btn btn-info w-50 py-2 btn-3d"
                              type="submit"
                              style={{
                                border: "none",
                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                                transform: "translateY(0)",
                                transition: "transform 0.2s ease-in-out",
                              }}
                            >
                              Lưu
                            </button>
                          </div>
                          
                        </form>
                      </div>
                    ) : (
                      role[0] === "ROLE_LECTURE" && (
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => toggleForm(selectedTopic._id)}
                        >
                          Thêm
                        </button>
                      )
                    )}
                    <h2 className="section-title">Topic Tasks</h2>
                    {topicTasks.map((task, index) => (
                      <div key={task._id} className="task">
                        <h3 className="task-title">
                          Task #{index + 1} {task.taskName}
                        </h3>
                        <p className="task-description">
                          <strong>Miêu tả:</strong> {task.description}
                        </p>
                        <p className="task-deadline">
                          <strong>Deadline:</strong> {task.deadline}
                        </p>
                        <div className="task-files">
                          <strong>Files SV:</strong>{" "}
                          {task.fileData
                            .filter((file) => file && file.fileName)
                            .map((file, fileIndex, filesArray) => (
                              <span key={fileIndex}>
                                <a
                                  href="#"
                                  onClick={() => DownLoadHandler(file._id)}
                                  style={{ textDecoration: "underline", cursor: "pointer" }}
                                >
                                  {file.fileName}
                                </a>
                                {fileIndex !== filesArray.length - 1 && ", "}
                              </span>
                            ))}
                        </div>
                        <p className="task-comment">
                          <strong>Đánh giá của GVHD:</strong> {task.comment ? task.comment : ""}
                        </p>
                        {role[0] === "ROLE_LECTURE" && (
                          <div>
                            {commentForm ? (
                              <div className="form-edit">
                                <form onSubmit={handleFormCommentSubmit}>
                                  <div className="form-floating mb-3">
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="name"
                                      placeholder="name student"
                                      value={newComment.comment}
                                      onChange={(e) =>
                                        setNewComment({ ...newComment, comment: e.target.value })
                                      }
                                    />
                                    <label htmlFor="name">Bình luận</label>
                                  </div>
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleFormCommentCancel}
                                  >
                                    Huỷ
                                  </button>
                                  <button type="submit" className="btn btn-primary">
                                    Lưu
                                  </button>
                                </form>
                              </div>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-primary btn-sm"
                                onClick={()=>toggleFormComment(task._id)}
                              >
                                Bình luận
                              </button>
                            )}
                          </div>
                        )}
                        {role[0] === "ROLE_STUDENT" && (
                          <div style={{ backgroundColor: '#f5f5f5', padding: '10px' }}>
                            <input
                              type="file"
                              id={`file-input-${task._id}`}
                              accept=".pdf,.doc,.docx,.txt"
                              onChange={(event) => handleFileInputChange(event, task._id)}
                              style={{ display: 'none' }}
                            />
                            <label htmlFor={`file-input-${task._id}`} className="btn btn-primary btn-sm">
                              Chọn File
                            </label>
                            {selectedFile && selectedFile[task._id] && (
                              <div>
                                <p>File đã lựa chọn: {selectedFile[task._id].name}</p>
                                <p>Xác nhận? Bạn không thể sửa khi đã nộp</p>
                                <div className="btn-group w-100" role="group" aria-label="Button Group" style={{ marginTop: "30px", marginBottom: "30px" }}>
                                  <button
                                    onClick={() => handleFileUploadCancel(task._id)}
                                    className="btn btn-light w-50 py-2 btn-3d"
                                    style={{
                                      border: "none",
                                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                                      transform: "translateY(0)",
                                      transition: "transform 0.2s ease-in-out",
                                    }}
                                  >
                                    Huỷ
                                  </button>
                                  <button
                                    className="btn btn-dark w-50 py-2 btn-3d"
                                    onClick={() => handleFileUploadConfirmation(task._id)}
                                    style={{
                                      border: "none",
                                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                                      transform: "translateY(0)",
                                      transition: "transform 0.2s ease-in-out",
                                    }}
                                  >
                                    Xác nhận
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          
        </div>
      )}
    </div>
  );
};