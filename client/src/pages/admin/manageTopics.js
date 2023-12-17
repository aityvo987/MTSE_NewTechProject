import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ManageTopics = () => {
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
            {showForm && (
            <div className="form-edit">
              <form onSubmit={handleFormSubmit}>
              <form>
                <div class="form-floating mb-3">
                    <input type='text' class="form-control" id="floatingInput0" placeholder="username" />
                    <label for="floatingInput">Tên đề tài</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="floatingPassword1" placeholder="Password" />
                    <label for="floatingPassword">Chuyên ngành</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="floatingPassword2" placeholder="Retype Password" />
                    <label for="floatingPassword">Sinh viên 1</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingPassword3" placeholder="Your Name"  />
                    <label for="floatingPassword">Sinh viên 2</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingPassword3" placeholder="Your Name"  />
                    <label for="floatingPassword">Người hướng dẫn</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingPassword3" placeholder="Your Name"  />
                    <label for="floatingPassword">Loại đề tài</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingPassword3" placeholder="Your Name"  />
                    <label for="floatingPassword">Điểm</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingPassword3" placeholder="Your Name"  />
                    <label for="floatingPassword">Trạng thái</label>
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
                  <th scope="col">Tên đề tài</th>
                  <th scope="col">Chuyên ngành</th>
                  <th scope="col">Sinh viên 1</th>
                  <th scope="col">Sinh viên 2</th>
                  <th scope="col">Người hướng dẫn</th>
                  <th scope="col">Loại đề tài</th>
                  <th scope="col">Điểm</th>
                  <th scope="col">Trạng thái</th>
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