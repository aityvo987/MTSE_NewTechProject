import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllTopicPeriods, AddTopicPeriod,UpdateTopicPeriod,DeleteTopicPeriod} from "../../api/adminAPI";
import { GetUserSession } from "../../api/generalAPI";
export const ManagePeriods = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); 
  const [deletePeriod, setDeletePeriod] = useState(null); 
  const [showForm, setShowForm] = useState(false);
  const [editPeriod, setEditPeriod] = useState(null);
  const [user, setUser] = useState();
  const [role, setRole] = useState();
  const [token, setToken] = useState();
  const [hasSession, setHasSession] = useState(false);
  
  const [periods,setPeriods]= useState([]);
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
          GetAllTopicPeriods(response.accessToken)
            .then((periods) => {
              setPeriods(periods);
              setIsLoading(false);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          navigate("/");
        }
      });
  }, []);
  
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleFormSubmit =async (e) => {
    e.preventDefault();
    
    if (isCreate){
      console.log("Create period",editPeriod);
      if (!editPeriod.topicPeriodName || !editPeriod.startDate || !editPeriod.dueDate ) {
       window.alert('Please fill in all required fields.');
       return;
     }
     
     AddTopicPeriod(token, editPeriod.topicPeriodName, editPeriod.startDate,editPeriod.dueDate )
       .then((response) => {
         if (response.status === 201) {
           alert("Period created");
           window.location.reload();
         } else {
           alert("Error creating period");
         }
       })
       .catch((error) => {
         console.error("Error:", error);
         alert("Internal error, please try again sometime later");
       });
    }
    else {
      console.log("Update period",editPeriod);
      if (!editPeriod.topicPeriodName || !editPeriod.startDate || !editPeriod.dueDate ) {
        window.alert('Please fill in all required fields.');
        return;
      }
     UpdateTopicPeriod(token,editPeriod._id, editPeriod.topicPeriodName, editPeriod.startDate,editPeriod.dueDate )
      .then((response) => {
        console.log("Update",response);
        if (response.status === 201) {
          alert("Period updated");
          window.location.reload();
        } else if (response.status === 404) {
          alert("Can't find period");
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
    setEditPeriod(student);
    setIsCreate(false);
    setShowForm(true);
  };
  const handleDelete = (student) => {
    setDeletePeriod(student);
  };

  const confirmDelete = () => {
    if (deletePeriod) {
      console.log("Deleting", deletePeriod._id);
      DeleteTopicPeriod(token, deletePeriod._id)
        .then((response) => {
          console.log("Delete", response);
          if (response.status === 201) {
            alert("Period deleted");
          } else {
            alert(response.message);
          }
        })
        .finally(() => {
          setDeletePeriod(null);
        });
    }
  };
  const cancelDelete = () => {
    setDeletePeriod(null);
  };
  const handleFormCancel = () => {
    setShowForm(false);
    setEditPeriod(null);
    setIsCreate(true);
  };
  
  return (
      <div className="content-admin">
        <h1>Danh sách đợt đăng ký đề tài</h1>
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
            {deletePeriod && (
              <div className="confirmation-dialog">
                <p>Are you sure you want to delete this period?</p>
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
                    placeholder="name student"value={editPeriod?editPeriod.topicPeriodName:""}
                    onChange={(e) =>
                      setEditPeriod({ ...editPeriod, topicPeriodName: e.target.value })
                    } />
                    <label for="floatingPassword">Tên đợt</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="date"
                    class="form-control"
                    id="startDate"
                    placeholder="name student"
                    value={editPeriod ? editPeriod.startDate : ""}
                    onChange={(e) =>
                      setEditPeriod({ ...editPeriod, startDate: e.target.value })
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
                    value={editPeriod ? editPeriod.dueDate : ""}
                    onChange={(e) =>
                      setEditPeriod({ ...editPeriod, dueDate: e.target.value })
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
                  <th scope="col">Tên đợt</th>
                  <th scope="col">Ngày bắt đầu</th>
                  <th scope="col">Ngày kết thúc</th>
                </tr>
              </thead>
              <tbody>
                {periods.map((period, index) => (
                  <tr key={period._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{period.topicPeriodName}</td>
                    <td>{period.startDate}</td>
                    <td>{period.dueDate}</td>
                    <td>
                    <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => handleEdit(period)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-warning btn-sm"
                          onClick={() => handleDelete(period)}
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