import * as React from "react";
import api from "../../../../utils/api";
import { Editor } from "@tinymce/tinymce-react";
import { ButtonC } from "../../../../components/Button/ButtonC";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import {
  handleCallApiEdit,
  handleOnChange,
  handleOnEditorChange,
  optionThunk,
} from "../../../_duck/modalSlice";
import { TokenBearer } from "../../HomeTemplate";
// 1. Viet giao dien
// 2. nap du lieu tu redux toolkit
// 3. set onchange
// 4. Gui du lieu
export function Modal() {
  const modalData: any = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch<AppDispatch>();
  const accessToken = React.useContext(TokenBearer);
  const refModal = React.useRef<HTMLDivElement>(null);
  const renderOption = () => {
    return modalData.option?.map((item: any, index: number) => {
      return (
        <option key={index} value={item.id}>
          {item.projectCategoryName}
        </option>
      );
    });
  };
  React.useEffect(() => {
    dispatch(optionThunk());
  }, []);
  return (
    <div
      ref={refModal}
      className="modal fade"
      id={"modelId"}
      tabIndex={-1}
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit project</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="projectName">Project name</label>
              <input
                value={modalData.data.projectName}
                onChange={(event) => {
                  dispatch(handleOnChange(event));
                }}
                type="text"
                className="form-control"
                name="projectName"
                id="projectName"
                placeholder="Enter project name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Project description</label>
              <Editor
                onChange={(event) => {
                  dispatch(handleOnEditorChange(event));
                }}
                initialValue={modalData.data.description}
              />
            </div>

            <div className="form-group">
              <div className="form-group">
                <label htmlFor="categoryId">Category</label>
                <select
                  onChange={(event) => {
                    dispatch(handleOnChange(event));
                  }}
                  value={modalData.data.categoryId}
                  className="form-control"
                  name="categoryId"
                  id="categoryId"
                >
                  <option>Chọn</option>
                  {renderOption()}
                </select>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <ButtonC
              buttonClass="btn btn-primary"
              btnName="Save"
              handleOnclick={() => {
                dispatch(handleCallApiEdit({accessToken,refModal,dispatch}));
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
