import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import api from "../../../../utils/api";

export const managementThunk = createAsyncThunk(
    'management-project',
    async () => {
        const response = await api.get(
            '/api/Project/getAllProject',
        )
        return response.data
    }
)

export interface Management {
    allProject:[]
    loading: boolean,
    error: string,
}
const initialState: Management = {
    allProject: [],
    loading: false,
    error: 'Không có lỗi!'
}
export const managementSlice = createSlice({
    name: 'management',
    initialState,
    reducers: {
        addUserInfomation: (state, action: PayloadAction<{}>) => {
            
        },
        logOutUser: (state) => {
           

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(managementThunk.pending, (state, action) => {
                state.loading = true
            })
            .addCase(managementThunk.fulfilled, (state, action) => {
                console.log(action.payload);
                state.loading = false
                state.allProject = action.payload.content
                
                

            })
            .addCase(managementThunk.rejected, (state, action) => {
                state.loading = false
            })
    }
})
export const { } = managementSlice.actions
export default managementSlice.reducer 