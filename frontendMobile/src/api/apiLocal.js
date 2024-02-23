import axios from "axios";

const apiLocal = axios.create({
  baseURL: "http://192.168.0.51:3333",
});

export default apiLocal;
