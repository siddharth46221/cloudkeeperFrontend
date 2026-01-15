import axios from "axios";

const app = axios.create({
  baseURL: 'http://localhost:8080'
});

app.interceptors.request.use(
  (config) =>{
    const token = localStorage.getItem("token");
    if(token){
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  

  (error) =>{ Promise.reject(error)}
)

app.interceptors.response.use(
  (response) => response,
  (error) => {  
    if(error.response.status === 401){
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    
    }
    return Promise.reject(error);
  }
)

export default app;