import * as React from "react";
import { useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../store";
import api from "../../../../utils/api";
import { Dropdown } from "./Dropdown";
import { Member } from "./Member";
import { fetchData } from "../../../_duck/modalSlice";
import { Modal } from "./Modal";

export interface IRowProps {
  data: any;
}

export function Row(props: IRowProps) {
  const { data } = props;
  const dispatch = useDispatch<AppDispatch>()
  const localStorage = window.localStorage.getItem("jira");
  interface Jira {
    accessToken: string;
    avatar: string;
    email: string;
    id: number;
    name: string;
    phoneNumber: string;
  }
  if (localStorage) {
    const local: Jira = JSON.parse(localStorage);
    return (
      <>
        <tr>
          <td>{data.id}</td>
          <td>{data.projectName}</td>
          <td>{data.categoryName}</td>
          <td>{data.creator.name}</td>
          <td>{<Member data={data.members} />}</td>
          <td>
            <Dropdown />
          </td>
          <td>
            <button
              className="btn btn-warning"
              data-toggle="modal"
              data-target={"#modelId"}
              onClick={() => {
                console.log(data.id);
                dispatch(fetchData(data))
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                api
                  .delete(
                    "/api/Project/deleteProject" + "?projectId=" + data.id,
                    {
                      headers: {
                        Authorization: "Bearer " + local.accessToken,
                      },
                    }
                  )
                  .then((res) => {
                    console.log(res);
                    alert("Xoá thành công id " + data.id);
                    window.location.reload();
                  })
                  .catch((error) => {
                    console.log(error);
                    alert(
                      "Xoá thất bại ! Bạn không thể xoá project không phải là của mình."
                    );
                  });
              }}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      </>
    );
  }
  return (
    <>
    </>
  )
}
