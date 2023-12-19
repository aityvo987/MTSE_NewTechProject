import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllMajors, AddMajor,UpdateMajor,DeletMajor} from "../../api/adminAPI";
import { GetUserSession } from "../../api/generalAPI";
export const ManageMajors = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); 
  const [deleteMajor, setDeleteMajor] = useState(null); 
  const [showForm, setShowForm] = useState(false);
  const [editMajor, setEditMajor] = useState(null);
  const [user, setUser] = useState();
  const [role, setRole] = useState();
  const [token, setToken] = useState();
  const [hasSession, setHasSession] = useState(false);
  
  const [majors,setMajors]= useState([]);
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
          
          GetAllMajors(response.accessToken)
            .then((majors) => {
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
      console.log("Create period",editMajor);
      if (!editMajor.majorName  ) {
       window.alert('Please fill in required field.');
       return;
     }
     
     AddMajor(token, editMajor.majorName)
       .then((response) => {
         if (response.status === 201) {
           alert("Major created");
           window.location.reload();
         } else {
           alert("Error creating major");
         }
       })
       .catch((error) => {
         console.error("Error:", error);
         alert("Internal error, please try again sometime later");
       });
    }
    else {
      console.log("Update major",editMajor);
      if (!editMajor.majorName ) {
        window.alert('Please fill in required field.');
        return;
      }
     UpdateMajor(token,editMajor._id, editMajor.majorName)
      .then((response) => {
        console.log("Update",response);
        if (response.status === 201) {
          alert("Major updated");
          window.location.reload();
        } else if (response.status === 404) {
          alert("Can't find major");
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

  const handleEdit = (major) => {
    setEditMajor(major);
    setIsCreate(false);
    setShowForm(true);
  };
  const handleDelete = (major) => {
    setDeleteMajor(major);
  };

  const confirmDelete = () => {
    if (deleteMajor) {
      console.log("Deleting", deleteMajor._id);
      DeletMajor(token, deleteMajor._id)
        .then((response) => {
          console.log("Delete", response);
          if (response.status === 201) {
            alert("Major deleted");
          } else {
            alert(response.message);
          }
        })
        .finally(() => {
          setDeleteMajor(null);
        });
    }
  };
  const cancelDelete = () => {
    setDeleteMajor(null);
  };
  const handleFormCancel = () => {
    setShowForm(false);
    setDeleteMajor(null);
    setIsCreate(true);
  };
  
  return (
      <div className="content-admin">
        <h1>Danh sách chuyên ngành</h1>
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
            {deleteMajor && (
              <div className="confirmation-dialog">
                <p>Are you sure you want to delete this major?</p>
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
                    placeholder="name student"value={editMajor?editMajor.majorName:""}
                    onChange={(e) =>
                      setEditMajor({ ...editMajor, majorName: e.target.value })
                    } />
                    <label for="floatingPassword">Tên chuyên ngành</label>
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
                  <th scope="col">Tên chuyên ngành</th>
                </tr>
              </thead>
              <tbody>
                {majors.map((major, index) => (
                  <tr key={major._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{major.majorName}</td>
                    <td>
                    <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => handleEdit(major)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-warning btn-sm"
                          onClick={() => handleDelete(major)}
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