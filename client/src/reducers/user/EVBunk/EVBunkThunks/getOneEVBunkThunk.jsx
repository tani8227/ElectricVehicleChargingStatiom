import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getEVBunk = createAsyncThunk(
    "auth/getBunk",
    async (credentials, { rejectWithValue }) => {
        try {
            // Retrieve the token from localStorage
            const token = localStorage.getItem('token');

            
            if (!token) {
                console.log("API Error:",token);
                return rejectWithValue("No token found, user not authenticated");
            }

            // Make the API call with the Authorization header
            const response = await axios.get(`http://localhost:7000/api/v1/admin/getEVBunk/${credentials}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            
            return response.data; // Return the user data
        } catch (error) {
            console.error("API Error:", error.response?.data || error.message);

            return rejectWithValue(
                error.response?.data || "Failed to fetch user data"
            );
        }
    }
);
