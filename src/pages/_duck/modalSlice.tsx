import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { stat } from "fs/promises";
import { type } from "os";
import api from "../../utils/api";
import { managementThunk } from "../HomeTemplate/Management/duck/managementSlice";

export const optionThunk = createAsyncThunk("optionthunk", async () => {
  const response = await api.get("/api/ProjectCategory");
  return response.data;
});
const initialState: any = {
  data: {},
  option: [],
};
export const modalSlice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    fetchData: (state, action) => {
      state.data = action.payload;
    },
    handleOnChange: (state, action) => {
      state.data[action.payload.target.name] = action.payload.target.value;
    },
    handleOnEditorChange: (state, action) => {
      state.data.description = action.payload.target.getContent();
    },
    handleCallApiEdit: (state, action) => {
        console.log(action);
        
      type Project = {
        id: number;
        projectName: string;
        creator: number;
        description: string;
        categoryId: string;
      };
      const project: Project = {
        id: state.data.id,
        projectName: state.data.projectName,
        creator: 0,
        description: state.data.description,
        categoryId: state.data.categoryId,
      };
      const token = action.payload.accessToken;
      const refModal = action.payload.refModal;
      const dispatch = action.payload.dispatch;
      api
        .put("/api/Project/updateProject?projectId=" + state.data.id, project, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          alert("Cập nhật thành công !");
          refModal.current.click()
          dispatch(managementThunk())
        })
        .catch((error) => {
          alert("Không thể cập nhập Project không phải là của chính mình!");
        });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(optionThunk.fulfilled, (state, action) => {
      state.option = action.payload.content;
    });
  },
});
export const {
  fetchData,
  handleOnChange,
  handleOnEditorChange,
  handleCallApiEdit,
} = modalSlice.actions;
export default modalSlice.reducer;
