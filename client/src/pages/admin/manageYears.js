import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllSchoolYears, AddSchoolYear,UpdateSchoolYear,DeleteSchoolYear} from "../../api/adminAPI";
import { GetUserSession } from "../../api/generalAPI";
export const ManageYears = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); 
  const [deleteYear, setDeleteYear] = useState(null); 
  const [showForm, setShowForm] = useState(false);
  const [editYear, setEditYear] = useState(null);
  const [user, setUser] = useState();
  const [role, setRole] = useState();
  const [token, setToken] = useState();
  const [hasSession, setHasSession] = useState(false);
  
  const [years,setYears]= useState([]);
  const [isCreate, setIsCreate]= useState(true); 


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
          GetAllSchoolYears(response.accessToken)
            .then((years) => {
              setYears(years);
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
      console.log("Create year",editYear);
      if (!editYear.name ||!editYear.startDate || !editYear.dueDate  ) {
       window.alert('Please fill in required field.');
       return;
     }
     
     AddSchoolYear(token, editYear.name,editYear.startDate,editYear.dueDate)
       .then((response) => {
         if (response.status === 201) {
           alert("Year created");
           window.location.reload();
         } else {
           alert("Error creating year");
         }
       })
       .catch((error) => {
         console.error("Error:", error);
         alert("Internal error, please try again sometime later");
       });
    }
    else {
      console.log("Update year",editYear);
      if (!editYear.name ) {
        window.alert('Please fill in required field.');
        return;
      }
     UpdateSchoolYear(token,editYear._id, editYear.majorName,editYear.startDate,editYear.dueDate)
      .then((response) => {
        console.log("Update",response);
        if (response.status === 201) {
          alert("Year updated");
          window.location.reload();
        } else if (response.status === 404) {
          alert("Can't find year");
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

  const handleEdit = (year) => {
    setEditYear(year);
    setIsCreate(false);
    setShowForm(true);
  };
  const handleDelete = (year) => {
    setDeleteYear(year);
  };

  const confirmDelete = () => {
    if (deleteYear) {
      console.log("Deleting", deleteYear._id);
      DeleteSchoolYear(token, deleteYear._id)
        .then((response) => {
          console.log("Delete", response);
          if (response.status === 201) {
            alert("Year deleted");
          } else {
            alert(response.message);
          }
        })
        .finally(() => {
          setDeleteYear(null);
        });
    }
  };
  const cancelDelete = () => {
    setDeleteYear(null);
  };
  const handleFormCancel = () => {
    setShowForm(false);
    setEditYear(null);
    setIsCreate(true);
  };
  
  return (
      <div className="content-admin">
        <h1>Danh sách niên khoá</h1>
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
            {deleteYear && (
              <div className="confirmation-dialog">
                <p>Bạn có chắc là muốn xoá niên khoá này không</p>
                <button className="btn btn-danger" onClick={confirmDelete}>
                  Có
                </button>
                <button className="btn btn-secondary" onClick={cancelDelete}>
                  Không
                </button>
              </div>
            )}      
            {showForm && (
            <div className="form-edit">
              <form onSubmit={handleFormSubmit}>
              <form className="content-form" style={{marginBottom:"50px"}}>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="name" 
                    placeholder="name student"value={editYear?editYear.name:""}
                    onChange={(e) =>
                      setEditYear({ ...editYear, name: e.target.value })
                    } />
                    <label for="floatingPassword">Tên niên khoá</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="date"
                    class="form-control"
                    id="startDate"
                    placeholder="name student"
                    value={editYear ? editYear.startDate : ""}
                    onChange={(e) =>
                      setEditYear({ ...editYear, startDate: e.target.value })
                    }
                  />
                  <label for="floatingPassword">Ngày bắt đầu</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="date"
                    class="form-control"
                    id="dueDate"
                    placeholder="name student"
                    value={editYear ? editYear.dueDate : ""}
                    onChange={(e) =>
                      setEditYear({ ...editYear, dueDate: e.target.value })
                    }
                  />
                  <label for="floatingPassword">Ngày kết thúc</label>
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
                  <th scope="col">Tên niên khoá</th>
                  <th scope="col">Ngày bắt đầu</th>
                  <th scope="col">Ngày kết thúc</th>
                </tr>
              </thead>
              <tbody>
                {years.map((year, index) => (
                  <tr key={year._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{year.name}</td>
                    <td>{year.startDate}</td>
                    <td>{year.dueDate}</td>
                    <td>
                    <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => handleEdit(year)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-warning btn-sm"
                          onClick={() => handleDelete(year)}
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