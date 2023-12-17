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
