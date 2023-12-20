import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllLecturers, GetAllAccounts,GetAllFaculties ,AddLecturer,AddAccount,UpdateLecturer,DeleteLecturer} from "../../api/adminAPI";
import { GetUserSession } from "../../api/generalAPI";
export const ManageLecturers = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); 
  const [deleteLecturer, setDeleteLecturer] = useState(null); 
  const [editLecturer, setEditLecturer] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState();
  const [role, setRole] = useState();
  const [token, setToken] = useState();
  const [hasSession, setHasSession] = useState(false);
  
  const [lecturers,setLecturers]= useState([]);
  const [faculties, setFaculties] = useState([]);
  const [majors, setMajors] = useState([]);
  const [isCreate, setIsCreate]= useState(true); 
  const [selectedFaculty, setSelectedFaculty] = useState(null);


  useEffect(() => {
    GetUserSession()
      .then((response) => {
        if (response.userinfo !== null && typeof response.userinfo !== "undefined") {
          console.log("GetUserSession", response);
          setUser(response.userinfo);
          setRole(response.roles);
          setToken(response.accessToken);
          setHasSession(true);
          
          Promise.all([GetAllLecturers(response.accessToken), GetAllAccounts(response.accessToken),GetAllFaculties(response.accessToken)])
            .then(([lecturers, accounts, faculties]) => {
              const updatedLecturer = lecturers.map((lecturer) => {
                const account = accounts.find((acc) => acc.email === lecturer.email);
                if (account) {
                  return {
                    ...lecturer,
                    username: account.username,
                  };
                }
                return lecturer;
              });
              setLecturers(updatedLecturer);
              setIsLoading(false);
              setFaculties(faculties);
            })
            .catch((error) => {
              console.log(error);
              setIsLoading(false);
            });
        } else {
          console.log("error");
        }
      });
  }, []);
  
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleFormSubmit =async (e) => {
    e.preventDefault();
    
    if (isCreate){
      console.log("Create lecturer",editLecturer);
      if (!editLecturer.name || !editLecturer.lectureId || !editLecturer.dateOfBirth || !editLecturer.email||
        !editLecturer.faculty) {
       window.alert('Please fill in all required fields.');
       return;
     }
     
     Promise.all([
       AddAccount(token, editLecturer.email, editLecturer.email, "123456","Lecture"),
       AddLecturer(token, editLecturer.name, editLecturer.lectureId, editLecturer.email, editLecturer.dateOfBirth, "", editLecturer.faculty,editLecturer.isFacultyHead)
     ])
       .then(([accountData, lecturerData]) => {
        console.log("Create",lecturerData);
         if (accountData.status === 201 && lecturerData.status === 201) {
           alert("Account and lecturer created");
           window.location.reload();
         } else {
           alert("Error creating account or lecturer");
         }
       })
       .catch((error) => {
         console.error("Error:", error);
         alert("Internal error, please try again sometime later");
       });
    }
    else {
      console.log("Update lecturer",editLecturer);
      if (!editLecturer.name || !editLecturer.lectureId || !editLecturer.dateOfBirth || !editLecturer.email||
        !editLecturer.faculty) {
       window.alert('Please fill in all required fields.');
       return;
     }
     UpdateLecturer(token, editLecturer._id,editLecturer.name, editLecturer.lectureId, editLecturer.email, editLecturer.dateOfBirth, "", editLecturer.faculty,editLecturer.isFacultyHead)
      .then((response) => {
        console.log("Update",response);
        if (response.status === 200) {
          alert("Lecturer updated");
          window.location.reload();
        } else if (response.status === 404) {
          alert("Can't find lecturer");
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

  const handleEdit = (lecturer) => {
    setEditLecturer(lecturer);
    setIsCreate(false);
    setShowForm(true);
  };
  const handleDelete = (lecturer) => {
    setDeleteLecturer(lecturer);
  };

  const confirmDelete = () => {
    if (deleteLecturer) {
      console.log("Deleting", deleteLecturer._id);
      DeleteLecturer(token, deleteLecturer._id)
        .then((response) => {
          console.log("Delete", response);
          if (response.status === 201) {
            alert("Lecturer deleted");
          } else {
            alert(response.message);
          }
        })
        .finally(() => {
          setDeleteLecturer(null);
        });
    }
  };
  const cancelDelete = () => {
    setDeleteLecturer(null);
  };
  const handleFormCancel = () => {
    setShowForm(false);
    setEditLecturer(null);
    setIsCreate(true);
  };
  const handleFacultyChange = (event) => {
    const selectedFaculty = event.target.value;
    setSelectedFaculty(selectedFaculty);
    const selectedFacultyData = faculties.find(faculty => faculty.facultyName === selectedFaculty);
    setEditLecturer({ ...editLecturer, faculty: selectedFacultyData });
  };
  
  return (
      <div className="content-admin">
        <h1>Danh sách giảng viên</h1>
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
            {deleteLecturer && (
              <div className="confirmation-dialog">
                <p>Are you sure you want to delete this lecturer?</p>
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
                    placeholder="name lecturer"value={editLecturer?editLecturer.name:""}
                    onChange={(e) =>
                      setEditLecturer({ ...editLecturer, name: e.target.value })
                    } />
                    <label for="floatingPassword">Họ và tên</label>
                </div>
                <div class="form-floating mb-3">
                <input type="text" class="form-control" id="lecturerID" 
                    placeholder="name lecturer"value={editLecturer?editLecturer.lectureId:""}
                    onChange={(e) =>
                      setEditLecturer({ ...editLecturer, lectureId: e.target.value })
                    } />
                    <label for="floatingPassword">MSGV</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="date"
                    class="form-control"
                    id="dueDate"
                    placeholder="name student"
                    value={editLecturer ? editLecturer.dateOfBirth : ""}
                    onChange={(e) =>
                      setEditLecturer({ ...editLecturer, dateOfBirth: e.target.value })
                    }
                  />
                  <label for="floatingPassword">Ngày sinh</label>
                </div>
                <div class="form-floating mb-3">
                <input type="text" class="form-control" id="email" 
                    placeholder="name lecturer"value={editLecturer?editLecturer.email:""}
                    onChange={(e) =>
                      setEditLecturer({ ...editLecturer, email: e.target.value })
                    } />
                    <label for="floatingPassword">Email</label>
                </div>
                <label htmlFor="faculty">Khoa:</label>
                <select id="faculty" value={selectedFaculty} onChange={handleFacultyChange}>
                    {/* <option value="">{editLecturer ? editLecturer.faculty.facultyName : "Select a faculty"}</option> */}
                    <option value="">Select a faculty</option>
                    {faculties.map((faculty) => (
                      <option key={faculty.id} value={faculty.facultyName}>
                        {faculty.facultyName}
                      </option>
                    ))}
                </select>
                <div className="row">
                  <div className="col-auto">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        value={1}
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        checked={editLecturer?editLecturer.isFacultyHead:false}
                        onChange={(e) =>
                          setEditLecturer({
                            ...editLecturer,
                            isFacultyHead: e.target.checked,
                          })
                        }
                      />
                      <label className="form-check-label" htmlFor="flexRadioDefault1">
                        Trưởng khoa
                      </label>
                    </div>
                  </div>
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
                  <th scope="col">Tên đăng nhập</th>
                  <th scope="col">Tên</th>
                  <th scope="col">MSSV</th>
                  <th scope="col">Email</th>
                  <th scope="col">Ngày sinh</th>
                  <th scope="col">Số diện thoại</th>
                  <th scope="col">Địa chỉ</th>
                  <th scope="col">Trưởng khoa</th>
                  <th scope="col">Ngành</th>
                </tr>
              </thead>
              <tbody>
                {lecturers.map((account, index) => (
                  <tr key={account._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{account.username}</td>
                    <td>{account.name}</td>
                    <td>{account.lectureId}</td>
                    <td>{account.email}</td>
                    <td>{account.dateOfBirth}</td>
                    <td>{account.phoneNumber}</td>
                    <td>{account.address?account.address:""}</td>
                    <td>{account.isFacultyHead ? <span>&#10004;</span> : null}</td>
                    <td>{account.faculty?account.faculty.facultyName:""}</td>
                    <td>{account.major?account.major.majorName:""}</td>
                    <td>
                    <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => handleEdit(account)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-warning btn-sm"
                          onClick={() => handleDelete(account)}
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