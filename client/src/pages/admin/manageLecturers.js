import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ManageLecturers = () => {
  const navigate = useNavigate();
  const [accountsData, setAccountsData] = useState([]);
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isLoading, setIsLoading] = useState(false); 
  const [deleteConfirmation, setDeleteConfirmation] = useState(null); 

  const [showForm, setShowForm] = useState(false);

  

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // ...
  };
  const handleFormCancel = () => {
    setShowForm(false);
    // Reset form fields or perform any necessary cleanup
    // ...
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
                    <input type="password" class="form-control" id="floatingPassword2" placeholder="Retype Password" />
                    <label for="floatingPassword">Họ và tên</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingPassword3" placeholder="Your Name"  />
                    <label for="floatingPassword">MSSV</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingPassword3" placeholder="Your Name"  />
                    <label for="floatingPassword">Ngày sinh</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingPassword3" placeholder="Your Name"  />
                    <label for="floatingPassword">Khoa</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingPassword3" placeholder="Your Name"  />
                    <label for="floatingPassword">Chuyên ngành</label>
                </div>
                <div className="row">
                  <div className="col-auto">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        value={1}
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
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


            <table className="table">
              <thead>
              <tr>
                  <th scope="col">#</th>
                  <th scope="col">Tên đăng nhập</th>
                  <th scope="col">Mật khẩu</th>
                  <th scope="col">Tên</th>
                  <th scope="col">MSGV</th>
                  <th scope="col">Email</th>
                  <th scope="col">Ngày sinh</th>
                  <th scope="col">Số diện thoại</th>
                  <th scope="col">Trưởng ngành</th>
                  <th scope="col">Trạng thái</th>
                  <th scope="col">Ngành</th>
                  <th scope="col">Chuyên ngành</th>
                </tr>
              </thead>
              <tbody>
                {/* {sortedAccounts.map((account, index) => (
                  <tr key={account._id}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <img src={account.avatar} alt="Avatar" className="avatar-img" style={{objectFit:"cover",width:50,height:50}} />
                    </td>
                    <td>{account.username}</td>
                    <td>{account.name}</td>
                    <td>{account.role}</td>
                    <td>{account.email}</td>
                    <td>{account.createdAt}</td>
                    <td>
                      {deleteConfirmation === account._id ? (
                        <div className="d-flex align-items-center">
                          <button
                            type="button"
                           className="btn btn-danger btn-sm me-2"
                            onClick={() => confirmDelete(account._id)}
                          >
                            Confirm
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={cancelDelete}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => deleteButtonHandler(account._id)}
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          </div>
        )}
      </div>
  );
};