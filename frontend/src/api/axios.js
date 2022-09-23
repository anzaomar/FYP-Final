import axios from "axios";

export default axios.create({
    // baseURL: 'http://192.168.10.100:5000/'
    baseURL: 'http://localhost:5000/'
});