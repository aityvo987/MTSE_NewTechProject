import React, { useState,useEffect  } from 'react';
import { useNavigate , Link} from "react-router-dom"
import { approveTopic } from '../api/lecturerAPI';

export const PendingTopic = (props) => {
  const navigate = useNavigate()
  const [modalVisible, setModalVisible] = useState(false);
  
  const openModal = (event) => {
    
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const approveBtn=async ()=>{
    console.log("Approve topic", props)
    
        const response = await approveTopic (props.token,props.topic._id);
      if (response.status===201) {
        window.alert("Approve topic successfully");
        window.location.reload();
      } else {
        window.alert('Failed to approve topic.');
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
              <div className="modal-body">
                <h5 className="card-title" style={{ fontSize: 30 }} >
                    {props.topic.topicName}
                </h5>
                <p className="card-text">
                    <span className="label" style={{width:85,display: 'inline-block'}}>Chuyên ngành:</span> {props.topic.major.majorName}
                </p>
                <p className="card-text">
                    <span className="label"style={{width:85,display: 'inline-block'}}>GVHD:</span> {props.topic.instructor?props.topic.instructor.name:""}
                </p>
                <p className="card-text">
                    <span className="label"style={{width:85,display: 'inline-block'}}>Mô tả:</span> {props.topic.description}
                </p>
                <p className="card-text">
                    <span className="label"style={{width:85,display: 'inline-block'}}>SVTH:</span> {props.topic.students?props.topic.students[0]?props.topic.students[0].name:"":""} 
                                        , {props.topic.students?props.topic.students[1]?props.topic.students[1].name:"":""} 
                </p>
                
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={approveBtn}>
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
