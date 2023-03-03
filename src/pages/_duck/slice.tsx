import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import api from "../../utils/api";

export const loginUser = createAsyncThunk(
    'user/login',
    async (content: { data: { email: string, passWord: string }, navigate: NavigateFunction }) => {
        const response = await api.post(
            '/api/Users/signin',
            content.data)
        return response.data
    }
)

export interface User {
    userInfo: {},
    adminInfo: {}
    loading: boolean,
    error: string,
}
const initialState: User = {
    userInfo: {},
    adminInfo: {},
    loading: false,
    error: 'Không có lỗi!'
}
export const loginSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUserInfomation: (state, action: PayloadAction<{}>) => {
            
        },
        logOutUser: (state) => {
           

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state, action) => {
            })
            .addCase(loginUser.fulfilled, (state, action) => {

            })
            .addCase(loginUser.rejected, (state, action) => {

            })
    }
})
export const { } = loginSlice.actions
export default loginSlice.reducer 