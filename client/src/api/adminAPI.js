export const GetAllLecturers = async ()=>{
    try {
        const response = await fetch(`/api/lectures`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ })
        });
        const data = await response.json();
        return data
      }
      catch (error) {
        return { message: 'Fail' };
      }
  }
export const UpdateLecturer = async (id,lectureId, name, email, dateOfBirth, phoneNumber, faculty)=>{
    try {
        const response = await fetch(`/api/lectures/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({lectureId, name, email, dateOfBirth, phoneNumber, faculty })
        });
        const data = await response.json();
        return data
      }
      catch (error) {
        return { message: 'Fail' };
      }
  }
export const AddLecturer = async (lectureId, name, email, dateOfBirth, phoneNumber, faculty)=>{
    try {
        const response = await fetch(`/api/lectures/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({lectureId, name, email, dateOfBirth, phoneNumber, faculty })
        });
        const data = await response.json();
        return data
      }
      catch (error) {
        return { message: 'Fail' };
      }
  }


//Students

export const GetAllStudents = async ()=>{
    try {
        const response = await fetch(`/api/students`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ })
        });
        const data = await response.json();
        return data
      }
      catch (error) {
        return { message: 'Fail' };
      }
  }
export const UpdateStudent = async (id,name, studentId, email, dateOfBirth, phoneNumber, faculty, major )=>{
    try {
        const response = await fetch(`/api/students/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({name, studentId, email, dateOfBirth, phoneNumber, faculty, major  })
        });
        const data = await response.json();
        return data
      }
      catch (error) {
        return { message: 'Fail' };
      }
  }
export const AddStudent = async (name, studentId, email, dateOfBirth, phoneNumber, faculty, major )=>{
    try {
        const response = await fetch(`/api/students/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({name, studentId, email, dateOfBirth, phoneNumber, faculty, major  })
        });
        const data = await response.json();
        return data
      }
      catch (error) {
        return { message: 'Fail' };
      }
  }

// Topics


export const GetAllTopics = async ()=>{
    try {
        const response = await fetch(`/api/topics`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ })
        });
        const data = await response.json();
        return data
      }
      catch (error) {
        return { message: 'Fail' };
      }
  }
export const UpdateTopic = async (topicId,topicName,description,students,faculty,major,topicPeriod )=>{
    try {
        const response = await fetch(`/api/topics/${topicId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({topicName,description,students,faculty,major,topicPeriod  })
        });
        const data = await response.json();
        return data
      }
      catch (error) {
        return { message: 'Fail' };
      }
  }
export const AddTopic = async (topicName,description,students,faculty,major,topicPeriod, )=>{
    try {
        const response = await fetch(`/api/topics/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({topicName,description,students,faculty,major,topicPeriod,  })
        });
        const data = await response.json();
        return data
      }
      catch (error) {
        return { message: 'Fail' };
      }
  }
export const DeleteTopic = async (topicId )=>{
    try {
        const response = await fetch(`/api/topics/${topicId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({  })
        });
        const data = await response.json();
        return data
      }
      catch (error) {
        return { message: 'Fail' };
      }
  }
