import axios from 'axios'

export const axiosConfig = axios.create({
  baseURL: `http://localhost:8000/api`,
  withCredentials: true,
})

export default axiosConfig
