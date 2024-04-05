import axios from "axios";

const apiLocal = axios.create({
  baseURL: "http://10.10.10.13:7600",
});

export default apiLocal;

//192.168.0.208 PC YEMURI,
//10.152.46.24 PC SENAC LUIZ,
//192.168.0.115 PC LOCAL LUIZ
//10.152.46.35 PC SENAC FERNANDO
//10.10.10.13 PC FERNANDO