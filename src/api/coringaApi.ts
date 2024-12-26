import axios from "axios";

const coringaApi = axios.create({
        baseURL: "https://api.coringagames.com/api",
        timeout: 5000,
});


const getUserBalance = async (userId: string, authToken: string): Promise<number> => {
        const urlString = `clients?filters[user][id]=${userId}&fields[0]=balance`;
        const response = await coringaApi.get(urlString, {
                headers: { Authorization: `Bearer ${authToken}` },
        });
        return response?.data?.data[0]?.attributes?.balance;
};

export { coringaApi, getUserBalance };

