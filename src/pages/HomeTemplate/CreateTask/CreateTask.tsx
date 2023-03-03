import { Editor } from '@tinymce/tinymce-react';
import { Select } from 'antd';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/api';
import { EditorTiny } from './component/EditorTiny';
import { InputSelect } from './component/InputSelect';
import { InputText } from './component/InputText';

export interface ICreateTaskProps {

}

export function CreateTask(props: ICreateTaskProps) {
  const [allProject, setAllProject] = React.useState([])
  const [status, setStatus] = React.useState([])
  const [priority, setPriority] = React.useState([])
  const [taskType, setTaskType] = React.useState([])
  const [user, setUser] = React.useState([])

  

  React.useEffect(() => {
    api.get('/api/Project/getAllProject').then((response) => { setAllProject(response.data.content) })
    api.get('/api/Status/getAll').then((response) => { setStatus(response.data.content) })
    api.get('/api/Priority/getAll').then((response) => { setPriority(response.data.content) })
    api.get('/api/TaskType/getAll').then((response) => { setTaskType(response.data.content) })
    const localStorage = window.localStorage.getItem('jira')
    interface Jira {
      accessToken: string,
      avatar: string,
      email: string,
      id: number,
      name: string,
      phoneNumber: string,
    }
    if (localStorage) {
      const local: Jira = JSON.parse(localStorage)
      api.get('/api/Users/getUser', { headers: { Authorization: 'Bearer ' + local.accessToken } }).then((response) => { setUser(response.data.content) })
    }
  }, [])
  const navigate = useNavigate()

  console.log(allProject);
  console.log(status);
  console.log(priority);
  console.log(taskType);
  console.log(user);
  const renderProject = () => {
    return allProject?.map((item: any, index) => {
      return <option key={index}>{item.projectName}</option>
    })
  }
  const renderStatus = () => {
    return status?.map((item: any, index: number) => {
      return <option key={index}>{item.statusName}</option>
    })
  }
  const renderPriority = () => {
    return priority?.map((item: any, index: number) => {
      return <option key={index}>{item.description}</option>
    })
  }
  const renderTaskType = () => {
    return taskType?.map((item: any, index: number) => {
      return <option key={index}>{item.taskType}</option>
    })
  }
  const renderUser = () => {
    return user?.map((item: any, index: number) => {
      return <option key={index}>{item.name}</option>
    })
  }
  return (
    <div className='p-5 bg-light rounded'>
      <h2>New Task</h2>
      <div className="form-group">
        <label htmlFor="project">Project</label>
        <select className="form-control" name="project" id="project">
          {renderProject()}
        </select>
      </div>


      <div className="form-group">
        <label htmlFor="taskName">Task name</label>
        <input type="text" className="form-control" name="taskName" id="taskName" aria-describedby="helpId" placeholder="Enter task name" />
      </div>

      <div className="form-group">
        <label htmlFor="project">Status</label>
        <select className="form-control" name="project" id="project">
          {renderStatus()}
        </select>
      </div>
      <div className='d-flex justify-content-between'>
        <div style={{ width: '40%' }}>
          <div className="form-group">
            <label htmlFor="project">Priority</label>
            <select className="form-control" name="project" id="project">
              {renderPriority()}
            </select>
          </div>
        </div>
        <div style={{ width: '40%' }}>
          <div className="form-group">
            <label htmlFor="project">Task Type</label>
            <select className="form-control" name="project" id="project">
              {renderTaskType()}
            </select>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="project">Assigners</label>
        <select className="form-control" name="project" id="project">
          {renderUser()}
        </select>
      </div>
      <div className='d-flex justify-content-between'>
        <div style={{ width: '40%' }}>
          <div className="form-group">
            <label htmlFor="project">Total Estimated Hours</label>
            <input className='form-control' type="number" />
          </div>
        </div>
        <div style={{ width: '40%' }}>
        <label htmlFor="project">Total Estimated Hours</label>
          <input className='form-control' type="number" />
        </div>
      </div>
      <EditorTiny />
      <button
      onClick={() => {
        alert('Khởi tạo thành công! Quay về trang quản lý.')
        navigate('/management')

      }}
      className='btn btn-primary btn-block mt-5'>Create</button>
    </div>
  );
}
