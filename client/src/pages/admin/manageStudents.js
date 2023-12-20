import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllStudents, GetAllAccounts,GetAllFaculties ,AddStudent, GetAllMajors,AddAccount,UpdateStudent,DeleteStudent} from "../../api/adminAPI";
import { GetUserSession } from "../../api/generalAPI";
export const ManageStudents = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); 
  const [deleteStudent, setDeleteStudent] = useState(null); 
  const [showForm, setShowForm] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [user, setUser] = useState();
  const [role, setRole] = useState();
  const [token, setToken] = useState();
  const [hasSession, setHasSession] = useState(false);
  
  const [students,setStudents]= useState([]);
  const [faculties, setFaculties] = useState([]);
  const [majors, setMajors] = useState([]);
  const [isCreate, setIsCreate]= useState(true); 
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedMajor, setSelectedMajor] = useState(null);


  useEffect(() => {
    GetUserSession()
      .then((response) => {
        if (response.userinfo !== null && typeof response.userinfo !== "undefined") {
          console.log("GetUserSession", response);
          setUser(response.userinfo);
          setRole(response.roles);
          setToken(response.accessToken);
          setHasSession(true);
          
          Promise.all([GetAllStudents(response.accessToken), GetAllAccounts(response.accessToken),GetAllFaculties(response.accessToken)
            ,GetAllMajors(response.accessToken)])
            .then(([students, accounts, faculties,majors]) => {
              console.log(faculties);
              const updatedStudents = students.map((student) => {
                const account = accounts.find((acc) => acc.email === student.email);
                if (account) {
                  return {
                    ...student,
                    username: account.username,
                  };
                }
                return student;
              });
              setStudents(updatedStudents);
              setFaculties(faculties);
              setMajors(majors);
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

  const handleFormSubmit =async (e) => {
    e.preventDefault();
    
    if (isCreate){
      console.log("Create student",editStudent);
      if (!editStudent.name || !editStudent.studentId || !editStudent.dateOfBirth || !editStudent.email||
        !editStudent.faculty|| !editStudent.major) {
       window.alert('Please fill in all required fields.');
       return;
     }
     
     Promise.all([
       AddAccount(token, editStudent.email, editStudent.email, "123456","Student"),
       AddStudent(token, editStudent.name, editStudent.studentId, editStudent.email, editStudent.dateOfBirth, "", editStudent.faculty, editStudent.major)
     ])
       .then(([accountData, studentData]) => {
         if (accountData.status === 201 && studentData.status === 201) {
           alert("Account and student created");
           window.location.reload();
         } else {
           alert("Error creating account or student");
         }
       })
       .catch((error) => {
         console.error("Error:", error);
         alert("Internal error, please try again sometime later");
       });
    }
    else {
      console.log("Update student",editStudent);
      if (!editStudent.name || !editStudent.studentId || !editStudent.dateOfBirth || !editStudent.email||
        !editStudent.faculty|| !editStudent.major) {
       window.alert('Please fill in all required fields.');
       return;
     }
     UpdateStudent(token, editStudent._id, editStudent.name, editStudent.studentId, editStudent.email, editStudent.dateOfBirth, editStudent.phoneNumber, editStudent.faculty, editStudent.major)
      .then((response) => {
        console.log("Update",response);
        if (response.status === 201) {
          alert("Student updated");
          window.location.reload();
        } else if (response.status === 404) {
          alert("Can't find student");
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

  const handleEdit = (student) => {
    setEditStudent(student);
    setIsCreate(false);
    setShowForm(true);
  };
  const handleDelete = (student) => {
    setDeleteStudent(student);
  };

  const confirmDelete = () => {
    if (deleteStudent) {
      console.log("Deleting", deleteStudent._id);
      DeleteStudent(token, deleteStudent._id)
        .then((response) => {
          console.log("Delete", response);
          if (response.status === 201) {
            alert("Student deleted");
          } else {
            alert(response.message);
          }
        })
        .finally(() => {
          setDeleteStudent(null);
        });
    }
  };
  const cancelDelete = () => {
    setDeleteStudent(null);
  };
  const handleFormCancel = () => {
    setShowForm(false);
    setEditStudent(null);
    setIsCreate(true);
  };
  const handleFacultyChange = (event) => {
    const selectedFaculty = event.target.value;
    setSelectedFaculty(selectedFaculty);
    const selectedFacultyData = faculties.find(faculty => faculty.facultyName === selectedFaculty);
    setEditStudent({ ...editStudent, faculty: selectedFacultyData });
  };
  const handleMajorChange = (event) => {
    const selectedMajor = event.target.value;
    setSelectedMajor(selectedMajor);
    const selectedMajorData = majors.find(major => major.majorName === selectedMajor);
    setEditStudent({ ...editStudent, major: selectedMajorData });
  };
  return (
      <div className="content-admin">
        <h1>Danh sách sinh viên</h1>
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
            {deleteStudent && (
              <div className="confirmation-dialog">
                <p>Are you sure you want to delete this student?</p>
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
                    placeholder="name student"value={editStudent?editStudent.name:""}
                    onChange={(e) =>
                      setEditStudent({ ...editStudent, name: e.target.value })
                    } />
                    <label for="floatingPassword">Họ và tên</label>
                </div>
                <div class="form-floating mb-3">
                <input type="text" class="form-control" id="studentId" 
                    placeholder="name student"value={editStudent?editStudent.studentId:""}
                    onChange={(e) =>
                      setEditStudent({ ...editStudent, studentId: e.target.value })
                    } />
                    <label for="floatingPassword">MSSV</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="date"
                    class="form-control"
                    id="dueDate"
                    placeholder="name student"
                    value={editStudent ? editStudent.dateOfBirth : ""}
                    onChange={(e) =>
                      setEditStudent({ ...editStudent, dateOfBirth: e.target.value })
                    }
                  />
                  <label for="floatingPassword">Ngày sinh</label>
                </div>
                <div class="form-floating mb-3">
                <input type="text" class="form-control" id="email" 
                    placeholder="name student"value={editStudent?editStudent.email:""}
                    onChange={(e) =>
                      setEditStudent({ ...editStudent, email: e.target.value })
                    } />
                    <label for="floatingPassword">Email</label>
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
                  <th scope="col">Trạng thái</th>
                  <th scope="col">Ngành</th>
                  <th scope="col">Chuyên ngành</th>
                </tr>
              </thead>
              <tbody>
                {students.map((account, index) => (
                  <tr key={account._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{account.username}</td>
                    <td>{account.name}</td>
                    <td>{account.studentId}</td>
                    <td>{account.email}</td>
                    <td>{account.dateOfBirth}</td>
                    <td>{account.phoneNumber}</td>
                    <td>{account.address?account.address:""}</td>
                    <td>{account.isActive ? <span>&#10004;</span> : null}</td>
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