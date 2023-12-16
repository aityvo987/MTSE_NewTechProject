
export const Lecturer = (props) => {
  return (
    <div class="card" style={{width:"80%"}} key={props.lecture.key}>
    <div class="card-body">
      <h5 class="card-title">{props.lecture.name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">Chuyên ngành: {props.lecture.faculty} </h6>
     
      {props.lecture.isFacultyChair?(
        <p class="card-text">Chức vụ: Trưởng bộ môn </p>
      ):(
        <>
            <p class="card-text">Chức vụ: Giảng viên </p>
        </>
      )}
      <p class="card-text">Số điện thoại: {props.lecture.phoneNumber}</p>
      <p class="card-text">Email: {props.lecture.email}</p>
    </div>
  </div>
  );
};
