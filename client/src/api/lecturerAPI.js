export const ApproveTopic = async (topicId )=>{
    try {
        const response = await fetch(`/api/topics/${topicId}/approve`, {
          method: 'PATCH',
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


// Topic task


export const GetAllTopicTasks = async ()=>{
  try {
      const response = await fetch(`/api/topicTasks`, {
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
export const GetTopicTask = async (topicTaskId)=>{
  try {
      const response = await fetch(`/api/topicTasks/${topicTaskId}`, {
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
export const UpdateTopicTask = async (topicTaskId,taskName, description, deadline, topic )=>{
  try {
      const response = await fetch(`/api/topicTasks/${topicTaskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({taskName, description, deadline, topic})
      });
      const data = await response.json();
      return data
    }
    catch (error) {
      return { message: 'Fail' };
    }
}
export const AddTopicTask = async (taskName, description, deadline, topic)=>{
  try {
      const response = await fetch(`/api/topicTasks/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({taskName, description, deadline, topic })
      });
      const data = await response.json();
      return data
    }
    catch (error) {
      return { message: 'Fail' };
    }
}
export const DeleteTopicTask = async (topicTaskId )=>{
  try {
      const response = await fetch(`/api/topicTasks/${topicTaskId}`, {
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


export const uploadTaskFile = async (topicTaskId, file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`/api/topicTasks/${topicTaskId}/upload-file`, {
      method: 'PATCH',
      body: formData,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return { message: 'Fail' };
  }
};

export const CommentTopicTask = async (topicTaskId,comment )=>{
  try {
      const response = await fetch(`/api/topicTasks/${topicTaskId}/comment`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comment })
      });
      const data = await response.json();
      return data
    }
    catch (error) {
      return { message: 'Fail' };
    }
};

export const GetAllTopicTaskFile = async (topicTaskId )=>{
  try {
      const response = await fetch(`/api/topicTasks/${topicTaskId}/get-files`, {
        method: 'GET',
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
};
export const DownLoadTopicTaskFile = async (fileId )=>{
  try {
      const response = await fetch(`/api/topicTasks/download-file/${fileId}`, {
        method: 'GET',
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
};

export const DeleteTopicTaskFile = async (topicTaskId,fileId )=>{
  try {
      const response = await fetch(`/api/topicTasks/${topicTaskId}/delete-file/${fileId}`, {
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

export const GetLecturerDetail = async (accessToken,id)=>{
  try {
      const response = await fetch(`/api/lectures/${id}`, {
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
export const UpdateProfileLecturer = async (accessToken,id, phoneNumber, address )=>{
  try {
      const response = await fetch(`/api/lectures/profile/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${accessToken}`,
        },
        body: JSON.stringify({ phoneNumber, address   })
      });
      const data =  response;
      return data
    }
    catch (error) {
      return { message: 'Fail' };
    }
}

export const assignInstructor = async (accessToken,topicId, instructor )=>{
  try {
      const response = await fetch(`/api/topics/${topicId}/register`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${accessToken}`,
        },
        body: JSON.stringify({ instructor })
      });
      const data =  await response.json();
      return data
    }
    catch (error) {
      return { message: 'Fail' };
    }
}

export const approveTopic = async (accessToken,topicId )=>{
  try {
      const response = await fetch(`/api/topics/${topicId}/approve`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${accessToken}`,
        },
        body: JSON.stringify({  })
      });
      const data =  response;
      return data
    }
    catch (error) {
      return { message: 'Fail' };
    }
}