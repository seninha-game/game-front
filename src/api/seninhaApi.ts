import axios from "axios";
require('dotenv').config();

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const seninhaApi = axios.create({
        baseURL: BASE_URL,
        timeout: 5000,
});

export { seninhaApi };
