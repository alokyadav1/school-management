import axios from 'axios'
import { API_URL } from '../../config';
const instance = axios.create({
    baseURL: API_URL,
})
export default instance;    