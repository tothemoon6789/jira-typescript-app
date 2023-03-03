import { configureStore } from "@reduxjs/toolkit"
import {managementSlice} from "../pages/HomeTemplate/Management/duck/managementSlice"
import { loginSlice } from "../pages/_duck/loginSlice"
import {signupSlice} from "../pages/_duck/signupSlice"
export const store = configureStore({
    reducer: {
        login:loginSlice.reducer,
        signup: signupSlice.reducer,
        management: managementSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
}
)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch