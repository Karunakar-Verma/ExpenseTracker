import axios from "axios";

const API = axios.create({
    baseURL : "http://localhost:5000/api/v1"
})


// it will attach token automatically 

API.interceptors.request.use((req)=>{
    const token = axios.getItem("token");
    if(token) req.headers.Authorization = `Bearer ${token}`
})

export default API;