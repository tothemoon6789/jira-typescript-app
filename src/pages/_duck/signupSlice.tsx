import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import api from "../../utils/api";
import { MES_ERROR_EMAIL, MES_ERROR_NAME_VIETNAMESE, MES_ERROR_PASSWORD, MES_ERROR_PHONE, REGEX_EMAIL, REGEX_NAME_VIETNAMESE, REGEX_PASSWORD, REGEX_PHONE } from '../../utils/RegexPattern';

export const signupThunk = createAsyncThunk(
    'user/singup',
    async (content:  {data: { email: string, passWord: string, name: string, phoneNumber: string }, navigate:NavigateFunction} ) => {
        const response = await api.post(
            '/api/Users/signup',
            content.data
            )
        return response.data
    }
)

const initialState = {
    signUp: {
        email: "",
        passWord: "",
        passWordAgain: "",
        phoneNumber: "",
        name: "",
    },
    error: {
        email: "",
        passWord: "",
        passWordAgain: "",
        phoneNumber: "",
        name: "",
    },
    emailValid: false,
    passWordValid: false,
    passWordAgainValid: false,
    phoneNumberValid: false,
    nameValid: false,

    fullFilled: '',
    loading: false,
    accept:false,
}
export const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        handleOnchange: (state, action) => {
            console.log(action);
            let { name, value } = action.payload.target
            type ObjectKey = keyof typeof state.signUp;
            const myVar = name as ObjectKey;
            state.signUp[myVar] = value
        },
        handleOnError: (state, action) => {

            let { name, value } = action.payload.target
            let mess = value.trim() === '' ? "* Không được để trống!" : ''
            let { emailValid, passWordValid, passWordAgainValid, phoneNumberValid, nameValid } = state
            let { passWord, passWordAgain } = state.signUp
            console.log(name);
            switch (name) {
                case 'email':
                    emailValid = mess === '' ? true : false
                    if (value && !REGEX_EMAIL.test(value)) {
                        mess = MES_ERROR_EMAIL
                    }
                    break;
                case 'passWord':
                    passWordValid = mess === '' ? true : false
                    if (value && !REGEX_PASSWORD.test(value)) {
                        mess = MES_ERROR_PASSWORD
                    }
                    break;
                case 'passWordAgain':
                    passWordAgainValid = mess === '' ? true : false
                    if (value && passWord && passWord !== passWordAgain) {
                        mess = '* Mật khẩu không trùng!'
                    }
                    break;
                case 'phoneNumber':
                    phoneNumberValid = mess === '' ? true : false
                    if (value && !REGEX_PHONE.test(value)) {
                        mess = MES_ERROR_PHONE
                    }
                    break;
                case 'name':
                    nameValid = mess === '' ? true : false
                    if (value && !REGEX_NAME_VIETNAMESE.test(value)) {
                        mess = MES_ERROR_NAME_VIETNAMESE
                    }
                    break;
                default:

                    break;
            }
            type ObjectKey = keyof typeof state.error;
            const myVar = name as ObjectKey;
            console.log(myVar);

            state.error[myVar] = mess

            state.emailValid = emailValid
            state.passWordValid = passWordValid
            state.passWordAgainValid = passWordAgainValid
            state.phoneNumberValid = phoneNumberValid
            state.nameValid = nameValid



        },
        handelOnSubmit: (state, action) => {

            action.payload.event.preventDefault()
            state.loading = true
            let { emailValid, passWordValid, passWordAgainValid, phoneNumberValid, nameValid } = state
            console.log({ emailValid, passWordValid, passWordAgainValid, phoneNumberValid, nameValid })
            if (emailValid && passWordValid && passWordAgainValid && phoneNumberValid && nameValid) {
                state.fullFilled = ''
                state.loading = true
                const { email, passWord, name, phoneNumber } = state.signUp
                state.fullFilled = ''
                state.accept = true
            } else {
                    state.fullFilled= '* Vui lòng nhập liệu'
                    state.loading = false
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupThunk.pending, (state, action) => {
                console.log(action);
                
                
                
            })
            .addCase(signupThunk.fulfilled, (state, action) => {
                console.log(action);
                alert('Đăng ký thành công. Quay về trang đăng nhập!')
                console.log(action);
                
                action.meta.arg.navigate('/login')
                
                
            })
            .addCase(signupThunk.rejected, (state, action) => {
                console.log(action);

            })
    }
})
export const { handleOnchange, handleOnError, handelOnSubmit } = signupSlice.actions
export default signupSlice.reducer 