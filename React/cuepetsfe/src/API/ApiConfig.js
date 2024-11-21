import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1", // Use HTTP if your Spring Boot app doesn't have SSL
});

export default api;
