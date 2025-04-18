import axios, { AxiosInstance } from "axios";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL: string = process.env.NEXT_PUBLIC_API_URL || '/api';
const ainst: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default ainst;
