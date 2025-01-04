import { createSlice } from "@reduxjs/toolkit";
import { createEVBunk } from "./EVBunkThunks/createEVBunkThunk";
import { getEVBunkList } from './EVBunkThunks/getEVBunkListThunk'
import { deleteEVBunk } from "./EVBunkThunks/deleteEVBunkThunk";
import { getEVBunk } from "./EVBunkThunks/getOneEVBunkThunk"
import { createEVBunkSlot } from "./EVBunkThunks/createEVBunkSlotThunk"
import { getNearByEVBunkList } from "./EVBunkThunks/getNearByEVBunkListThunk"
import { getEVBunkSlot } from "./EVBunkSlots/getEVBunkSlot";
import { bookEVBunkSlot } from "./EVBunkSlots/bookEVBunkSlotThunk";
import { getEVBunkWithSlot } from "./EVBunkSlots/getEVBunkWithSlot";


const initialState =
{
        EVS: null,
        EVOneBunk: null,
        EVSlot: null,
        NearByEVBunkList: null,
        bookedEVSlot:null,
        EVBunkWithSlot:null,

}

const EVBunkSlice = createSlice(
        {
                name: 'EVS',
                initialState,

                extraReducers: (builder) => {
                        builder
                                .addCase(createEVBunk.pending, (state) => {
                                        state.loading = true;
                                        state.error = null;
                                })
                                .addCase(createEVBunk.fulfilled, (action, state) => {
                                        state.loading = false;
                                        state.EVBunk = action.payload;
                                })
                                .addCase(createEVBunk.rejected, (action, state) => {
                                        state.loading = false;
                                        state.error = action.payload;
                                }),

                                builder
                                        .addCase(getEVBunkList.pending, (state) => {
                                                state.loading = true,
                                                        state.error = null
                                        })

                                        .addCase(getEVBunkList.fulfilled, (state, action) => {
                                                state.loading = false,
                                                        state.EVS = action.payload.data
                                        })

                                        .addCase(getEVBunkList.rejected, (state, action) => {
                                                state.loading = false,
                                                        state.EVS = action.payload
                                        }),

                                builder
                                        .addCase(deleteEVBunk.pending, (state) => {
                                                state.loading = true,
                                                        state.error = null
                                        })

                                        .addCase(deleteEVBunk.fulfilled, (state, action) => {
                                                state.loading = false,
                                                        state.EVS = action.payload.data
                                        })

                                        .addCase(deleteEVBunk.rejected, (state, action) => {
                                                state.loading = false,
                                                        state.EVS = action.payload
                                        }),

                                builder
                                        .addCase(getEVBunk.pending, (state) => {
                                                state.loading = true,
                                                        state.error = null
                                        })

                                        .addCase(getEVBunk.fulfilled, (state, action) => {
                                                state.loading = false,
                                                        state.EVOneBunk = action.payload.data
                                        })

                                        .addCase(getEVBunk.rejected, (state, action) => {
                                                state.loading = false,
                                                        state.EVOneBunk = action.payload
                                        }),

                                builder
                                        .addCase(createEVBunkSlot.pending, (state) => {
                                                state.loading = true,
                                                state.error = null
                                        })

                                        .addCase(createEVBunkSlot.fulfilled, (state, action) => {
                                                state.loading = false,
                                                state.EVSlot = action.payload.data
                                        })

                                        .addCase(createEVBunkSlot.rejected, (state, action) => {
                                                state.loading = false,
                                                state.EVSlot = action.payload
                                        }),

                                builder
                                        .addCase(getNearByEVBunkList.pending, (state) => {
                                                state.loading = true,
                                                state.error = null
                                        })
                                        .addCase(getNearByEVBunkList.fulfilled, (state, action) => {
                                                state.loading = false,
                                                state.NearByEVBunkList = action.payload.data
                                        })
                                        .addCase(getNearByEVBunkList.rejected, (state, action) => {
                                                state.loading = false,
                                                state.NearByEVBunkList = action.payload
                                        }),

                                builder
                                        .addCase(getEVBunkSlot.pending, (state) => {
                                                state.loading = true,
                                                state.error = null
                                        })
                                        .addCase(getEVBunkSlot.fulfilled, (state, action) => {
                                                state.loading = false,
                                                state.EVSlot = action.payload.data
                                        })
                                        .addCase(getEVBunkSlot.rejected, (state, action) => {
                                                state.loading = false,
                                                state.EVSlot = action.payload
                                        });

                                builder
                                        .addCase(bookEVBunkSlot.pending, (state) => {
                                                state.loading = true,
                                                state.error = null
                                        })
                                        .addCase(bookEVBunkSlot.fulfilled, (state,action) => {
                                                state.loading = false,
                                                state.bookedEVSlot = action.payload
                                        })
                                        .addCase(bookEVBunkSlot.rejected, (state, action) => {
                                                state.loading = false,
                                                state.EVSlot = action.payload
                                        })
                                builder
                                        .addCase(getEVBunkWithSlot.pending, (state) => {
                                                state.loading = true,
                                                state.error = null
                                        })
                                        .addCase(getEVBunkWithSlot.fulfilled, (state,action) => {
                                                state.loading = false,
                                                state.EVBunkWithSlot = action.payload.data
                                        })
                                        .addCase(getEVBunkWithSlot.rejected, (state, action) => {
                                                state.loading = false,
                                                state.EVBunkWithSlot = action.payload
                                        })

                }
        })


export const EVBunkReducer = EVBunkSlice.reducer;
export const Actions = EVBunkSlice.actions;