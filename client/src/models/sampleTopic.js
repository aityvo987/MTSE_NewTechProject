import React, { useState,useEffect  } from 'react';
import { useNavigate , Link} from "react-router-dom"
export const Topic = (props) => {
  const navigate = useNavigate()
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = (event) => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const registerBtn=async ()=>{
    window.location.href = '#';
  };

  return (
    <div className="card-container" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="card" id="courseCard" onClick={openModal} style={{ cursor: 'pointer', flex: '1' }}>
        {/* <img src={props.thumbnail} className="card-img-top" alt="..." style={{height:250,objectFit:'cover'}} /> */}
        <div className="card-body">
          <h5 className="card-title" style={{ fontSize: 15, whiteSpace: 'nowrap', overflow: "hidden", textOverflow: 'ellipsis'}} >
            {props.data.topicName}
          </h5>
          <p className="card-text">
              <span className="label" style={{display: 'inline-block'}}>Người thực hiện:</span> {props.students}
          </p>
          <p className="card-text">
              <span className="label"style={{display: 'inline-block'}}>Đợt:</span> {props.data.topicPeriod?props.data.topicPeriod.topicPeriodName:""}
          </p>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Báo cáo chi tiết
          </button>
    
        </div>
      </div>

      

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-xl">
            <div class="modal-content" style={{height:"500px"}}>
              <div class="modal-header">
                <h5 class="modal-title text-danger" id="exampleModalLabel">PDF</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
            <iframe
            src="https://docdro.id/fMwEJZG"
            frameBorder="0"
            scrolling="auto"
            height="100%"
            width="100%"
        ></iframe>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};
