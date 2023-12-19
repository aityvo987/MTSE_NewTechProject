export const AddAccount = async (accessToken,username, email, password)=>{
  try {
      const response = await fetch(`/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${accessToken}`,
        },
        body: JSON.stringify({username, email, password})
      });
      const data =  response;
      return data
    }
    catch (error) {
      return { message: 'Fail' };
    }
}


export const GetAllAccounts = async (accessToken)=>{
  try {
      const response = await fetch(`/api/accounts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${accessToken}`,
        },
      });
      const data = await response.json();
      return data
    }
    catch (error) {
      return { message: 'Fail' };
    }
}

export const GetAllLecturers = async (accessToken)=>{
    try {
        const response = await fetch(`/api/lectures`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': `${accessToken}`,
          },
        });
        const data = await response.json();
        return data
      }
      catch (error) {
        return { message: 'Fail' };
      }
  }
export const UpdateLecturer = async (accessToken,id, name,lectureId, email, dateOfBirth, phoneNumber, faculty,isFacultyHead)=>{
    try {
        const response = await fetch(`/api/lectures/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': `${accessToken}`,
          },
          body: JSON.stringify({name,lectureId, email, dateOfBirth, phoneNumber, faculty,isFacultyHead })
        });
        const data = response;
        return data
      }
      catch (error) {
        return { message: 'Fail' };
      }
  }
export const AddLecturer = async (accessToken, name,lectureId, email, dateOfBirth, phoneNumber, faculty,isFacultyHead)=>{
    try {
        const response = await fetch(`/api/lectures/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': `${accessToken}`,
          },
          body: JSON.stringify({name,lectureId, email, dateOfBirth, phoneNumber, faculty,isFacultyHead })
        });
        const data = response;
        return data
      }
      catch (error) {
        return { message: 'Fail' };
      }
  }
  export const DeleteLecturer = async (accessToken,id )=>{
    try {
        const response = await fetch(`/api/lectures/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': `${accessToken}`,
          },
        });
        const data = response;
        return data
      }
      catch (error) {
        return { message: 'Fail' };
      }
  }

//Students

export const GetAllStudents = async (accessToken)=>{
    try {
      console.log("Admin API",accessToken);
        const response = await fetch(`/api/students`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': `${accessToken}`,
          }
        });
        const data = await response.json();
        return data
      }
      catch (error) {
        return { message: 'Fail' };
      }
  }
export const UpdateStudent = async (accessToken,id,name, studentId, email, dateOfBirth, phoneNumber, faculty, major )=>{
    try {
        const response = await fetch(`/api/students/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': `${accessToken}`,
          },
          body: JSON.stringify({name, studentId, email, dateOfBirth, phoneNumber, faculty, major  })
        });
        const data = response;
        return data
      }
      catch (error) {
        return { message: 'Fail' };
      }
  }
export const AddStudent = async (accessToken,name, studentId, email, dateOfBirth, phoneNumber, faculty, major )=>{
    try {
        const response = await fetch(`/api/students/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': `${accessToken}`,
          },
          body: JSON.stringify({name, studentId, email, dateOfBirth, phoneNumber, faculty, major  })
        });
        const data =  response;
        return data
      }
      catch (error) {
        return { message: 'Fail' };
      }
  }
  export const DeleteStudent = async (accessToken,id )=>{
    try {
        const response = await fetch(`/api/students/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': `${accessToken}`,
          },
        });
        const data = response;
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


export const AssignThesisLecturerTopic = async (topicId,instructor )=>{
    try {
        const response = await fetch(`/api/topics/${topicId}/assign`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ instructor })
        });
        const data = await response.json();
        return data
      }
      catch (error) {
        return { message: 'Fail' };
      }
  }
export const AssignStudentTopic = async (topicId,student )=>{
    try {
        const response = await fetch(`/api/topics/${topicId}/register`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ student })
        });
        const data = await response.json();
        return data
      }
      catch (error) {
        return { message: 'Fail' };
      }
  }


  //Topic period



  export const GetAllTopicPeriods = async (accessToken)=>{
    try {
        const response = await fetch(`/api/topicPeriods`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': `${accessToken}`,
          },
        });
        const data = await response.json();
        return data
      }
      catch (error) {
        return { message: 'Fail' };
      }
  }
export const UpdateTopicPeriod = async (accessToken,topicPeriodId,topicPeriodName, startDate, dueDate )=>{
    try {
        const response = await fetch(`/api/topicPeriods/${topicPeriodId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': `${accessToken}`,
          },
          body: JSON.stringify({topicPeriodName, startDate, dueDate  })
        });
        const data = response;
        return data
      }
      catch (error) {
        return { message: 'Fail' };
      }
  }
export const AddTopicPeriod = async (accessToken,topicPeriodName, startDate, dueDate )=>{
    try {
        const response = await fetch(`/api/topicPeriods/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': `${accessToken}`,
          },
          body: JSON.stringify({topicPeriodName, startDate, dueDate  })
        });
        const data = response;
        return data
      }
      catch (error) {
        return { message: 'Fail' };
      }
  }
export const DeleteTopicPeriod = async (accessToken,topicId )=>{
    try {
        const response = await fetch(`/api/topicPeriods/${topicId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': `${accessToken}`,
          },
        });
        const data = await response.json();
        return data
      }
      catch (error) {
        return { message: 'Fail' };
      }
  }
// Falcuty

export const GetAllFaculties = async (accessToken)=>{
  try {
      const response = await fetch(`/api/faculties`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${accessToken}`,
        },
      });
      const data = await response.json();
      return data
    }
    catch (error) {
      return { message: 'Fail' };
    }
}
export const UpdateFalcuty = async (facultyId,newFacultyName )=>{
  try {
      const response = await fetch(`/api/faculties/${facultyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({newFacultyName  })
      });
      const data = await response.json();
      return data
    }
    catch (error) {
      return { message: 'Fail' };
    }
}
export const AddFalcuty = async (facultyName)=>{
  try {
      const response = await fetch(`/api/faculties/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({facultyName })
      });
      const data = await response.json();
      return data
    }
    catch (error) {
      return { message: 'Fail' };
    }
}
export const DeleteFalcuty = async (facultyId )=>{
  try {
      const response = await fetch(`/api/faculties/${facultyId}`, {
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

//Major 

export const GetAllMajors = async (accessToken)=>{
  try {
      const response = await fetch(`/api/majors`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${accessToken}`,
        },
      });
      const data = await response.json();
      return data
    }
    catch (error) {
      return { message: 'Fail' };
    }
}
export const UpdateMajor = async (accessToken,majorId,majorName )=>{
  try {
      const response = await fetch(`/api/majors/${majorId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${accessToken}`,
        },
        body: JSON.stringify({majorName  })
      });
      const data =response;
      return data
    }
    catch (error) {
      return { message: 'Fail' };
    }
}
export const AddMajor = async (accessToken,majorName)=>{
  try {
      const response = await fetch(`/api/majors/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${accessToken}`,
        },
        body: JSON.stringify({majorName })
      });
      const data = response;
      return data
    }
    catch (error) {
      return { message: 'Fail' };
    }
}
export const DeletMajor = async (accessToken,majorId )=>{
  try {
      const response = await fetch(`/api/majors/${majorId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${accessToken}`,
        },
      });
      const data = await response.json();
      return data
    }
    catch (error) {
      return { message: 'Fail' };
    }
}
