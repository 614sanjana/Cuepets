import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8080', // Use HTTP if your Spring Boot app doesn't have SSL

});