import axios from "axios";

const apiLocal = axios.create({
  // baseURL: "http://10.152.46.24:7600" // PC SENAC LUIZ,
  baseURL: "http://192.168.0.208:7600", // PC YEMURI,
});

export default apiLocal;
