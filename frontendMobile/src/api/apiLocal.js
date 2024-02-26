import axios from "axios";

const apiLocal = axios.create({
  baseURL: "http://192.168.0.51:7600", 
});

export default apiLocal;


//192.168.0.208 PC YEMURI,
//10.152.46.24 PC SENAC LUIZ,
//192.168.0.51 PC LOCAL LUIZ
