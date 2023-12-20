import React, { useState,useEffect  } from 'react';
import { useNavigate , Link} from "react-router-dom"
import {registerTopic} from "../api/studentAPI"
import { assignInstructor } from '../api/lecturerAPI';

export const NormalTopic = (props) => {
  const navigate = useNavigate()
  const [modalVisible, setModalVisible] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  
  useEffect(() => {
    if (props.page!=="management") {
      if ((props.topic.instructor!==null&&!props.lecture)) {
        setIsRegistered(true);
      } else {
        setIsRegistered(false);
      }
    }
  }, [props.student, props.topic.instructor,props.lecture]);

  
  const openModal = (event) => {
    
    if (isRegistered) {
      navigate(`/management`);
    }else
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const registerBtn=async ()=>{
    console.log("Registing Student", props)
    if(props.role[0]==="ROLE_STUDENT"){
      console.log("Registing Student", props.student)
      const response = await registerTopic (props.token,props.topic._id, props.student);
      if (response.message) {
        window.alert(response.message);
        if (response.success) {
          window.location.reload();
        }
      } else {
        window.alert('Failed to register for the course.');
      }
    }
    else if (props.role[0]==="ROLE_LECTURE"){
        const response = await assignInstructor (props.token,props.topic._id, props.lecture);
      if (response.message) {
        window.alert(response.message);
        if (response.success) {
          window.location.reload();
        }
      } else {
        window.alert('Failed to register for the course.');
      }
      
    }else{
      window.alert('Failed to register for the course.');
    }
  };

  return (
    <div className="card-container" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="card" id="courseCard" onClick={openModal} style={{ cursor: 'pointer', flex: '1' }}>
        <div className="card-body">
          <h5 className="card-title" style={{ fontSize: 30, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} >
            {props.topic.topicName}
          </h5>
          <h5 className="card-title" style={{ fontStyle: 'oblique' }}>
            {props.topic.major.majorName}
          </h5>
          <p className="card-text">{props.topic.topicPeriod?props.topic.topicPeriod.topicPeriodName:""}</p>
        </div>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div
          className="modal fade show"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Detail Topic
                </h5>
                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
              </div>
              <div className="modal-body text-left">
                <h5 className="card-title" style={{ fontSize: 30 }} >
                    {props.topic.topicName}
                </h5>
                <p className="card-text">
                    <span className="label" style={{width:"85",display: 'inline-block'}}>Chuyên ngành:</span> {props.topic.major.majorName}
                </p>
                <p className="card-text">
                    <span className="label"style={{width:"85",display: 'inline-block'}}>GVHD:</span> {props.topic.instructor?props.topic.instructor.name:""}
                </p>
                <p className="card-text">
                    <span className="label"style={{width:"85",display: 'inline-block'}}>Mô tả:</span> {props.topic.description}
                </p>
                <p className="card-text">
                    <span className="label"style={{width:"85",display: 'inline-block'}}>SVTH:</span> {props.topic.students?props.topic.students[0]?props.topic.students[0].name:"":""} 
                                        , {props.topic.students?props.topic.students[1]?props.topic.students[1].name:"":""} 
                </p>
                <p className="card-text">
                  <span className="label" style={{ width: 150, display: 'inline-block' }}>Tình trạng duyệt:</span>
                  {props.topic.isApproved ? (
                    <span>&#10004;</span>
                  ) : null}
                </p>
                
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                {isRegistered ? (
                  <button type="button" className="btn btn-success" disabled>
                    Registered
                  </button>
                ) : (
                  <button type="button" className="btn btn-primary" onClick={registerBtn}>
                    Register
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
