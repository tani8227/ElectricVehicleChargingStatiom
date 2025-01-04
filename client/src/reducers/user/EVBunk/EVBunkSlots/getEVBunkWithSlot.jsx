// Redux Thunk (Redux Toolkit)
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getEVBunkWithSlot = createAsyncThunk(
  'evbunk/getEVBunkWithSlot', // Action type
  async (bunkId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        return rejectWithValue({ status: 401, message: "Token not found. Please log in again." });
      }

      const response = await axios.get(`http://localhost:7000/api/v1/admin/getEVBunkWithSlot/${bunkId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response data:", response.data);
      return response.data; // This will be returned and available as `action.payload`
    } catch (error) {
      console.error('API Error:', error);

      if (!error.response) {
        return rejectWithValue({
          status: 500,
          message: "Network error or server is unreachable. Please try again later.",
        });
      }

      return rejectWithValue({
        status: error.response?.status,
        message: error.response?.data.message || "Something went wrong.",
      });
    }
  }
);
