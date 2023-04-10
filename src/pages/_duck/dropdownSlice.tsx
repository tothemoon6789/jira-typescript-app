import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const dropdownThunk = createAsyncThunk(
    'dropdownThunk',
    async (token:string) => {
        const response = await api.get('/api/Users/getUser',{headers: {Authorization:'Bearer '+token}})
        return response.data
    }
)
const initialState:any = {
    data:[]
}
export const dropdownSlice = createSlice({
    name:'createSlice',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
        .addCase(dropdownThunk.fulfilled, (state,action) => {
            console.log(action.payload);
             
        })
        .addCase(dropdownThunk.rejected, (state,action) => {
            console.log(action.payload);
             
        })
    },

})
export default dropdownSlice.reducer