'use client'
import axios from "axios";

const BASE_URL = process.env.NEXT_BASE_URL || "http://localhost:4000/api"
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token && config.headers['Require-Auth']) {
            config.headers.Authorization = `Bearer ${token}`
        }
        delete config.headers['Require-Auth'];
        return config
    },
    (error) =>
        Promise.reject(error)
)
const get = async (url, params = {}, auth = true) => {
    try {
        axiosInstance.get(url, {
            params,
            headers: { 'Require-Auth': auth }
        })
    } catch (error) {
        return error
    }
}

const post = async (url, data, auth = true) => {

    return await axiosInstance.post(url, data, {
        headers: { 'Require-Auth': auth }
    })
}

const put = async (url, data, auth = true) => {
    return await axiosInstance.put(url, data, {
        headers: { 'Require-Auth': auth }
    })
}

const del = async (url, auth = true) => {
    return await axiosInstance.delete(url, data, {
        headers: { 'Require-Auth': auth }
    })
}
export const apiCore = {
    get,
    post,
    put,
    delete: del
}