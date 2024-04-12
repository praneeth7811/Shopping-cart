// api.js

import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Update the URL with your backend URL

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to fetch all users
export const fetchAllUsers = async () => {
    try {
        const response = await api.get('/users');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error || 'Failed to fetch users');
    }
};

// Function to perform user login
export const loginUser = async (userData) => {
    try {
        const response = await api.post('/users/login', userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error || 'Login failed');
    }
};

export default api;
