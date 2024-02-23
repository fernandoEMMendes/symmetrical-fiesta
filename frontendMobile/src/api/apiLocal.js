import axios from "axios";

const apiLocal = axios.create({
  baseURL: "http://10.152.46.24:7600",
});

export default apiLocal;
