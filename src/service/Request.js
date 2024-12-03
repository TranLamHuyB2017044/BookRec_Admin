import axios from 'axios';

const BaseURL = "http://localhost:5000/api/";
const headers = {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Credentials": true
};

const userHeader = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true
}
export const PublicRequest = axios.create({
    baseURL: BaseURL,
    headers: headers,
})

export const UserRequest = axios.create({
    baseURL: BaseURL,
    headers: userHeader,
})