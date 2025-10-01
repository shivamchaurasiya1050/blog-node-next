'use client'

import { createContext, useContext, useReducer } from "react";
import { loginUser, registerUser } from "../api/users"
import toast from 'react-hot-toast';
export const UserContext = createContext()
const storedUser = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) : null
const storedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null
const initialState = {
    users: [],
    courrentUser: storedUser ? storedUser : null,
    token: storedToken || null,
    loading: false,
    isAuthenticated: !!storedToken,
    error: null
}

// reducer

const userReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, loading: action.payload, error: null }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                currentUser: action.payload.currentUser,
                token: action.payload.token,
                error: null,
            };
        case 'LOGIN_FAIL':
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                error: action.payload,
            };
        case "SET_USER":
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                currentUser: action?.payload?.currentUser,
                token: action?.payload?.token,
                error: null,
            }
    }
}


export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState)
    const login = async (data) => {
        dispatch({ type: 'SET_LOADING', payload: true })
        try {
            const response = await loginUser(data)
            const userData = {
                currentUser: response.data.data,
                token: response.data.token
            }
            dispatch({ type: "LOGIN_SUCCESS", payload: userData })
            localStorage.setItem("token", response?.data?.token)
            localStorage.setItem('user', JSON.stringify(userData))
            toast.success(response?.data.message || "Logged in successfully!");
        } catch (error) {
            console.log(error)
            dispatch({ type: "LOGIN_FAIL", payload: error.response?.data?.message || "Login failed" })
            toast.error(error.response?.data?.message || "Login failed");
        }
    }

    const registers = async (data) => {
        dispatch({ type: "SET_LOADING", payload: true })
        try {
            const response = await registerUser(data)
            const userData = {
                currentUser: response.data.data,
                token: response.data.token
            }
            dispatch({ type: "SET_USER", payload: userData })
            toast.success(response?.data?.message || "Register successfully!")
            return response
        } catch (error) {
            console.log(error)
            dispatch({ type: "LOGIN_FAIL", payload: error.response?.data?.message || "Registeration failed" })
            toast.error(error.response?.data?.message || "Registeration failed");
        }
    }

    const logout = async () => {
        dispatch({ type: "SET_LOADING", payload: true })
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            dispatch({
                type: "SET_USER",
                payload: null
            });
            toast.success("Logged out successfully!");
            return response
        } catch (error) {
            console.log(error)
            // dispatch({ type: "LOGIN_FAIL", payload: error.response?.data?.message || "Something went to worng!" })
            // toast.error(error.response?.data?.message || "Something went to worng!");
        }
    }
    const value = {
        ...state,
        login,
        registers,
        logout
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}


export const useUser = () => {
    const context = useContext(UserContext)

    if (!context) {
        throw new Error("useUser must be used within UserProvider")
    }
    return context
}

