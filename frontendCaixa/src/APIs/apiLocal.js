import axios from "axios"

const apiLocal = axios.create({
    baseURL: "http://localhost:7600"
})

export default apiLocal