import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./authThunks/loginThunk";
import { getUser } from "./authThunks/getUserThunk";

const initialState =
    {
       authUser:null,
       token:null,
       loading:false,
    }

    const AuthSlice = createSlice(
        {
             name:'Auth',
             initialState,
            
             reducers:
             {
                setAuthUser:(state, action)=>
                    {
                      state.authUser=action.payload;  
                    },
                setAuthToken:(state, action)=>
                    {
                      state.token=action.payload;  
                    },
                    logout: (state, action) => {
                      state.authUser = null;
                      state.token = null;
                      localStorage.removeItem('token');
                      window.location.reload();

                    },

             },
             
             extraReducers: (builder) => {
              builder
                  .addCase(loginUser.pending, (state) => {
                      state.loading = true;
                      state.error = null;
                  })
                  .addCase(loginUser.fulfilled, (state, action) => {
                      state.loading = false;
                      state.authUser = action.payload.user;
                      state.token = action.payload.token;
                  })
                  .addCase(loginUser.rejected, (state, action) => {
                      state.loading = false;
                      state.error = action.payload;
                  }),

            builder
                  .addCase(getUser.pending, (state)=>
                    {
                        state.loading = true;
                        state.error = null;
                    })      
                  .addCase(getUser.fulfilled, (state, action)=>
                    {
                       state.authUser=action.payload.user;
                       state.token=action.payload.token;

                    })      
                  .addCase(getUser.rejected, (state, action)=>
                    {
                        state.loading = false;
                      state.error = action.payload;
                    });    
          },

        })



    export const authReducer=AuthSlice.reducer;
    export const Actions =AuthSlice.actions


