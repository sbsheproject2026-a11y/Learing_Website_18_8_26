 import axios from "axios";


const api = axios.create({
   // baseURL: "https://api.employeesbshe.tech/api",
    baseURL: "http://192.168.1.21:8000/api",
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;
