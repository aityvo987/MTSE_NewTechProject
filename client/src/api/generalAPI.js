export const GetAllNotifications = async ()=>{
    try {
        const response = await fetch('/api/notifications', {
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

export const GetNotification = async (notificationId)=>{
    try {
        const response = await fetch(`/api/notifications/${notificationId}`, {
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

export const GetTopics = async ()=>{
    try {
        const response = await fetch(`/api/topics/`, {
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

export const GetLecturers = async ()=>{
    try {
        const response = await fetch(`/api/lectures/`, {
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

export const SignIn = async (username,password)=>{
    try {
        const response = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({username,password})
        });
        const data = await response.json()
        return data
      }
      catch (error) {
        return "Fail"
      }
  }



