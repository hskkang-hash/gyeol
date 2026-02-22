
import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  // The base URL will be the root of our backend functions
  baseURL: 'https://us-central1-your-project-id.cloudfunctions.net/api', // Replace with your actual Firebase project ID
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Later, we can add interceptors for requests and responses
// For example, to automatically add an auth token to every request
apiClient.interceptors.request.use(config => {
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
}, error => {
    return Promise.reject(error);
});

// For example, to handle global errors
apiClient.interceptors.response.use(response => {
    return response;
}, error => {
    // Handle things like 401 Unauthorized, 403 Forbidden, etc.
    console.error("API call failed:", error);
    return Promise.reject(error);
});

export default apiClient;
