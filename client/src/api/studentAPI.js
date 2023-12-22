

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

// Define a function to handle file upload
export const UploadTopicTaskFile = async (accessToken, topicTaskId, file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`/api/topicTasks/${topicTaskId}/upload-file`, {
      method: 'PATCH',
      headers: {
        'x-access-token': accessToken,
      },
      body: formData,
    });

    const data = await response.json(); // Assuming the response is JSON
    return data;
  } catch (error) {
    return { message: 'Fail' };
  }
};


export const GetAllTopicTaskFile = async (accessToken,topicTaskId )=>{
  try {
      const response = await fetch(`/api/topicTasks/${topicTaskId}/get-files`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': accessToken,
        }
      });
      const data = await response.json();
      return data
    }
    catch (error) {
      return { message: 'Fail' };
    }
};

export const DownLoadTopicTaskFile = async (accessToken, fileId) => {
  try {
    const response = await fetch(`/api/topicTasks/download-file/${fileId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': accessToken,
      },
      responseType: 'blob', // Set the response type to 'blob'
    });

    if (!response.ok) {
      throw new Error('Error downloading file');
    }

    // Extract the file name from the Content-Disposition header
    const contentDisposition = response.headers.get('content-disposition');
    const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
    let fileName = fileNameMatch ? fileNameMatch[1] : 'file';

    // Remove underscores at the start and end of the file name
    fileName = fileName.trim('_');

    // Create a temporary URL for the downloaded file
    const url = window.URL.createObjectURL(await response.blob());

    // Create a temporary link and simulate a click to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Release the temporary URL
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};
export const GetStudentDetail = async (accessToken,id)=>{
  try {
      const response = await fetch(`/api/students/${id}`, {
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

export const UpdateProfileStudent = async (accessToken,id, phoneNumber, address )=>{
  try {
      const response = await fetch(`/api/students/profile/${id}`, {
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

export const registerTopic = async (accessToken,topicId, student )=>{
  try {
      const response = await fetch(`/api/topics/${topicId}/register`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${accessToken}`,
        },
        body: JSON.stringify({ student })
      });
      const data =  await response.json();
      return data
    }
    catch (error) {
      return { message: 'Fail' };
    }
}