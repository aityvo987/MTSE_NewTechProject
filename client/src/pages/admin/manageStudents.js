import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllStudents } from "../../api/adminAPI";
import { GetUserSession } from "../../api/generalAPI";
export const ManageStudents = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); 
  const [deleteConfirmation, setDeleteConfirmation] = useState(null); 
  const [showForm, setShowForm] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [user, setUser] = useState();
  const [role, setRole] = useState();
  const [token, setToken] = useState();
  const [hasSession, setHasSession] = useState(false);
  const [students,setStudents]= useState([]);


  useEffect(() => {
    GetUserSession()
        .then(respone => {
            if (respone.userinfo !== null && typeof (respone.userinfo) !== 'undefined') {
              console.log("GetUserSession",respone)
                setUser(respone.userinfo)
                setRole(respone.roles)
                setToken(respone.accessToken)
                setHasSession(true)
                GetAllStudents(respone.accessToken)
                  .then((students) => {
                    console.log(students);
                    setStudents(students)
                    setIsLoading(false);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
            }else {
              console.log("error");
            }

        })
}, [])

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // ...
  };

  const handleEdit = (student) => {
    setEditStudent(student);
    setShowForm(true);
  };
  const handleFormCancel = () => {
    setShowForm(false);
    setEditStudent(null);
    // Reset form fields or perform any necessary cleanup
    // ...
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
            {showForm && (
            <div className="form-edit">
              <form onSubmit={handleFormSubmit}>
              <form>
                <div class="form-floating mb-3">
                    <input type='text' class="form-control" id="floatingInput0" placeholder="username" />
                    <label for="floatingInput">Username</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="floatingPassword1" placeholder="Password" />
                    <label for="floatingPassword">Password</label>
                </div>
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
                <input type="text" class="form-control" id="dateOfBirth" 
                    placeholder="name student"value={editStudent?editStudent.dateOfBirth:""}
                    onChange={(e) =>
                      setEditStudent({ ...editStudent, dateOfBirth: e.target.value })
                    } />
                    <label for="floatingPassword">Ngày sinh</label>
                </div>
                <div class="form-floating mb-3">
                <input type="text" class="form-control" id="faculty" 
                    placeholder="name student"value={editStudent?editStudent.faculty:""}
                    onChange={(e) =>
                      setEditStudent({ ...editStudent, faculty: e.target.value })
                    } />
                    <label for="floatingPassword">Khoa</label>
                </div>
                <div class="form-floating mb-3">
                <input type="text" class="form-control" id="major:" 
                    placeholder="name student"value={editStudent?editStudent.major[0]:""}
                    onChange={(e) =>
                      setEditStudent({ ...editStudent, major: e.target.value })
                    } />
                    <label for="floatingPassword">Chuyên ngành</label>
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
                  <th scope="col">Mật khẩu</th>
                  <th scope="col">Tên</th>
                  <th scope="col">MSSV</th>
                  <th scope="col">Email</th>
                  <th scope="col">Ngày sinh</th>
                  <th scope="col">Số diện thoại</th>
                  <th scope="col">Trạng thái</th>
                  <th scope="col">Ngành</th>
                  <th scope="col">Chuyên ngành</th>
                </tr>
              </thead>
              <tbody>
                {students.map((account, index) => (
                  <tr key={account._id}>
                    <th scope="row">{index + 1}</th>
                    <td></td>
                    <td></td>
                    <td>{account.name}</td>
                    <td>{account.studentId}</td>
                    <td>{account.email}</td>
                    <td>{account.dateOfBirth}</td>
                    <td>{account.phoneNumber}</td>
                    <td>{account.isActive ? <span>&#10004;</span> : null}</td>
                    <td>{account.faculty.facultyName}</td>
                    <td>{account.major[0]}</td>
                    <td>
                    <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => handleEdit(account)}
                        >
                          Edit
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