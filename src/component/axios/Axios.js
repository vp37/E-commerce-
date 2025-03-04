import axios from "axios";

const Axios = axios.create({
  baseURL: "https://fakestoreapi.com",  // Base API URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default Axios;
