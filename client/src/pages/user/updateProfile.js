import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetStudentDetail,UpdateProfileStudent} from "../../api/studentAPI";
import { GetLecturerDetail,UpdateProfileLecturer} from "../../api/lecturerAPI";
import { GetUserSession } from "../../api/generalAPI";
import { NavigationBar } from "../../components/NavBar";
import { DefaultNavBar } from "../../components/defaultNavBar";
export const UpdateProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); 
  const [editProfile, setEditProfile] = useState(null);
  const [user, setUser] = useState();
  const [profile, setProfile] = useState([]);
  const [role, setRole] = useState();
  const [token, setToken] = useState();
  const [hasSession, setHasSession] = useState(false);
  


  useEffect(() => {
    GetUserSession()
      .then((response) => {
        if (response.userinfo !== null && typeof response.userinfo !== "undefined") {
          console.log("GetUserSession", response);
          setUser(response.userinfo);
          setRole(response.roles);
          setToken(response.accessToken);
          setHasSession(true);
          if(response.roles[0]==='ROLE_STUDENT'){
            GetStudentDetail(response.accessToken,response.userinfo._id)
            .then((profile) => {
                console.log("Profile",profile);
                setProfile(profile);
                setEditProfile(profile);
                setIsLoading(false);
            })
            .catch((error) => {
              console.log(error);
            });
          }else{
            console.log("Find tutor");
            GetLecturerDetail(response.accessToken,response.userinfo._id)
            .then((profile) => {
                console.log("Profile",profile);
                setProfile(profile);
                setEditProfile(profile);
                setIsLoading(false);
            })
            .catch((error) => {
              console.log(error);
            });
          }
          
          
        } else {
          navigate("/");
        }
      });
  }, []);
  
  
  const handleSave =async (e) => {
    e.preventDefault();
    
      console.log("Update profile",editProfile);
      if (!editProfile.address||!editProfile.phoneNumber  ) {
       window.alert('Please fill in required field.');
       return;
     }
     if (role[0]==="ROLE_STUDENT"){
      console.log("role");
        UpdateProfileStudent(token,editProfile._id,editProfile.phoneNumber,editProfile.address)
        .then((response) => {
          if (response.status === 201) {
            alert("Profile updated");
            window.location.reload();
          } else {
            alert("Error update profile");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Internal error, please try again sometime later");
        });
     }else{
        UpdateProfileLecturer(token,editProfile._id,editProfile.phoneNumber,editProfile.address)
       .then((response) => {
         if (response.status === 201) {
           alert("Profile updated");
           window.location.reload();
         } else {
           alert("Error update profile");
         }
       })
       .catch((error) => {
         console.error("Error:", error);
         alert("Internal error, please try again sometime later");
       });
     }
     
    
    
  };

  const handleCancel = (profile) => {
    setEditProfile(profile);
  };
  
  return (
      <div className="content-profile">
        {!hasSession ? (
        // Render tutor-specific content
        <DefaultNavBar></DefaultNavBar>
      ) : (
        <NavigationBar user={user} role={role} > </NavigationBar>
      )}
        <h1>Thông tin cá nhân</h1>
        {isLoading ? (
          <div className="d-flex align-items-center">
            <strong role="status">Loading...</strong>
            <div className="spinner-border ms-auto" aria-hidden="true"></div>
          </div>
        ) : (
            <div className="content">
              <div className="container">
                <div className="main-body">
                  <div className="row">
                    <div className="col-lg-2"></div>
                    <div className="col-lg-8">
                      <div className="card">
                        <div className="card-body">
                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Họ tên</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <h6 className="mb-0">{profile.name}</h6>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Email</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <input
                                type="text"
                                className="form-control"
                                defaultValue={profile.email}
                                readOnly
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Ngày sinh</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <input
                                type="text"
                                className="form-control"
                                defaultValue={profile.dateOfBirth}
                                readOnly
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">{profile.studentId?"MSSV":"MSGV"}</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <input
                                type="text"
                                className="form-control"
                                defaultValue={profile.studentId?profile.studentId:profile.lectureId}
                                readOnly
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Khoa</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <input
                                type="text"
                                className="form-control"
                                defaultValue={profile.faculty.facultyName}
                                readOnly
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Chuyên ngành</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <input
                                type="text"
                                className="form-control"
                                defaultValue={profile.major?profile.major.majorName:""}
                                readOnly
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Số điện thoại</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={profile.phoneNumber}
                                onChange={(e) =>
                                setEditProfile({
                                    ...editProfile,
                                    phoneNumber: e.target.value,
                                })
                                }
                            />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-3">
                            <h6 className="mb-0">Địa chỉ</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={profile.address}
                                onChange={(e) =>
                                setEditProfile({
                                    ...editProfile,
                                    address: e.target.value,
                                })
                                }
                            />
                            </div>
                        </div>
                          <div className="row">
                            <div className="col-sm-3" />
                            <div className="col-sm-9 text-secondary">
                              <input
                                type="button"
                                className="btn btn-primary px-4"
                                defaultValue="Save Changes"
                                onClick={handleSave}
                                disabled={!editProfile}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        
      </div>
  );
};