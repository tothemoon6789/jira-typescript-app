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
            state.userInfo = action.payload
        },
        logOutUser: (state) => {
            localStorage.removeItem('jira')
            state.userInfo = {}
            window.alert('Đăng xuất thành công.')

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state, action) => {
                state.loading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const userInfoString = JSON.stringify(action.payload.content)
                state.userInfo = action.payload
                localStorage.setItem('jira', userInfoString)
                action.meta.arg.navigate('/')
                alert('Đăng nhập thành công! Chuyển hướng về trang chủ.')
                state.loading = false

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = 'Không tồn tại tải khoản này!'
                alert('Tài khoản không tồn tại !')
            })
    }
})
export const { addUserInfomation, logOutUser } = loginSlice.actions
export default loginSlice.reducer 