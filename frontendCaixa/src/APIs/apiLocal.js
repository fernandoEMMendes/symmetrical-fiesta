import axios from "axios"

const lsToken = localStorage.getItem("@PJI2024")
const token = JSON.parse(lsToken)

const apiLocal = axios.create({
    baseURL: "http://localhost:7600",
    headers: {
        Authorization: "Bearer " + `${token}`
    }
})

export default apiLocal