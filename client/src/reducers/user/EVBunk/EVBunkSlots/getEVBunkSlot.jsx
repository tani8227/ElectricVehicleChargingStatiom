import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getEVBunkSlot = createAsyncThunk(
    'auth/getEVBunkSlot',
    async (bunkId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');

            if (!token)
            {

                return rejectWithValue({ status: 401, message: "Token not found. Please log in again." });
            }

            const response = await axios.get(`http://localhost:7000/api/v1/user/getEVBunkSlot/${bunkId}`, {
                
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Response data:", response.data);
            return response.data;
        } catch (error) {
            console.error('API Error:', error);

            if (!error.response) {
                // Network error or other non-HTTP error
                return rejectWithValue({
                    status: 500,
                    message: "Network error or server is unreachable. Please try again later.",
                });
            }

            // Handle specific error statuses
            if (error.response?.status === 401 && error.response?.data.message === "User not found") {
                return rejectWithValue({ status: 401, message: "Invalid user. Please check your credentials." });
            }

            // Default error handling
            return rejectWithValue({
                status: error.response?.status,
                message: error.response?.data.message || "Something went wrong.",
            });
        }
    }
);
