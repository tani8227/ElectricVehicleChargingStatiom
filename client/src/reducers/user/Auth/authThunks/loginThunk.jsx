import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            console.log('Making API call with:', credentials);
            const response = await axios.post(`http://localhost:7000/api/v1/${credentials.userType}/signin`, credentials);

           
            // If login is successful, store token and user data
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.user._id);

            return response.data; // Return the response
        } catch (error) {
            console.error('API Error:', error.response?.data || error.message);

            // Handle wrong password scenario
            if (error.response?.status === 401 && error.response?.data.message === "Invalid email or password") {
                return rejectWithValue({ status: 401, message: "wrongpassword" });
            }
           
            // Handle user not found scenario
            if (error.response?.status === 401 && error.response?.data.message === "User not found") {
                return rejectWithValue({ status: 401, message: "invaliduser" });
            }

            // Default error handling
            return rejectWithValue({
                status: error.response?.status,
                message: error.response?.data || 'Something went wrong',
            });
        }
    }
);
