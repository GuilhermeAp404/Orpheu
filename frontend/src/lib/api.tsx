import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_EXTERNAL_API,
})

export default api