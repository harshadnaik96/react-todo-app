import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://react-todo-app-6bc35-default-rtdb.firebaseio.com/",
});

export default axiosInstance;
