import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteEVBunk = createAsyncThunk(
    "auth/deleteEVBunk",
    async (credentials, { rejectWithValue }) => {
        try {
            // Retrieve the token from localStorage
            console.log(credentials);
            const token = localStorage.getItem('token');

                 if (!token) {
                console.log("No token:",token);
                return rejectWithValue("No token found, user not authenticated");
            }
          
            // Make the API call with the Authorization header
            const response = await axios.delete(`http://localhost:7000/api/v1/admin/deleteEVBunk/${credentials}`, {
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
