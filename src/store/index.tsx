import { configureStore } from "@reduxjs/toolkit"
import {managementSlice} from "../pages/HomeTemplate/Management/duck/managementSlice"
import { dropdownSlice } from "../pages/_duck/dropdownSlice"
import { loginSlice } from "../pages/_duck/loginSlice"
import { modalSlice } from "../pages/_duck/modalSlice"
import {signupSlice} from "../pages/_duck/signupSlice"
export const store = configureStore({
    reducer: {
        login:loginSlice.reducer,
        signup: signupSlice.reducer,
        management: managementSlice.reducer,
        modal: modalSlice.reducer,
        dropdown: dropdownSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
}
)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch