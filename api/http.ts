import axios, { AxiosRequestConfig } from "axios";

const preRequest = (request: AxiosRequestConfig) => {
    // const token = storage.getToken();
    // if (token) {
    //     request.headers.Authorization = `bearer ${token}`;
    // }
    return request;
};

const http = axios.create({
    baseURL: "http://localhost:4000/api",
    headers: {
        "Content-type": "application/json",
    },
});

http.interceptors.request.use(preRequest);
http.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // message.error(error.response.data.message);
        } else {
            // message.error("Server error");
        }
        console.log(error);

        return Promise.reject(error);
    }
);

export const setToken = (token: string) => {
    http.defaults.headers.common["Authorization"] = `bearer ${token}`;
};
export const removeToken = () => {
    http.defaults.headers.common["Authorization"] = "";
};

export default http;
