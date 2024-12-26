import axios from "axios";

const seninhaApi = axios.create({
        baseURL: "http://localhost:8080",
        timeout: 5000,
});

export { seninhaApi };
