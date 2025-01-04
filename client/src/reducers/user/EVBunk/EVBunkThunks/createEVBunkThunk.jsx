import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const createEVBunk=createAsyncThunk(
    "admin/createEVBunk",
    async(credentials, {rejectWithValue})=>
        {
             try {
                
                const token = localStorage.getItem('token');

                console.log(credentials);
                const response = await axios.post(`http://localhost:7000/api/v1/admin/createEVBunk`,credentials, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data);


                return response.data;
                
             } catch (error) {
                console.error('API Error:', error.response);  
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
    )



