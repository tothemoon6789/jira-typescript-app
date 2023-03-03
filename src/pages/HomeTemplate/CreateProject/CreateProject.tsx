import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonC } from '../../../components/Button/ButtonC';
import api from '../../../utils/api';

export interface ICreateProjectProps {
}

export function CreateProject(props: ICreateProjectProps) {
  const navigate = useNavigate()
  const [option, setOption] = React.useState([])
  const [loading,setLoading] = React.useState(false)
  const [project, setProject] = React.useState({
    projectName: "",
    description: "",
    categoryId: 0,
    alias: "my alias"
  })
  React.useEffect(() => {
    api.get(
      '/api/ProjectCategory'
    ).then((res) => {
      console.log(res);
      setOption(res.data.content)

    }).catch((error) => {
      console.log(error);

    })
  }, [])
  React.useEffect(() => {
    console.log(project);

  }, [project])

  const renderSelect = () => {
    return option.length > 0 && option.map((item: any, index) => {
      return <option key={index} value={item.id}>{item.projectCategoryName}</option>
    })
  }
  const handleOnchangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProject({
      ...project,
      projectName: event.target.value,
    })
  }
  const handleOnchangeDes = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProject({
      ...project,
      description: event.target.value,
    })
  }
  const handleOnchangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setProject({
      ...project,
      categoryId: parseInt(event.target.value),
    })
  }
  return (
    <>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input disabled={loading} onChange={handleOnchangeTitle} type="text" className="form-control" name="title" id="title" aria-describedby="helpId" placeholder="Enter title" />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
        disabled={loading}
          onChange={handleOnchangeDes}
          className="form-control" style={{ height: '400px' }} name="description" id="description" aria-describedby="helpId" placeholder="Enter description" />
      </div>
      <div className="form-group">
        <select disabled={loading} onChange={handleOnchangeSelect} className="form-control" name="selectUser" id="selectUser">
          <option>Chọn</option>
          {renderSelect()}
        </select>
      </div>
      <ButtonC
      isLoading={loading}
        handleOnclick={() => {
          if (project.categoryId !== 0 && project.projectName !== '' && project.description !== '') {
            setLoading(true)
            const localStorage = window.localStorage.getItem('jira')
            interface Jira {
              accessToken: string,
              avatar: string,
              email: string,
              id: number,
              name: string,
              phoneNumber: string,
            }
            if (!localStorage) return
            const local: Jira = JSON.parse(localStorage)
            api.post(
              '/api/Project/createProjectAuthorize',
              project,
              {
                headers: {
                  Authorization: 'Bearer ' + local.accessToken
                }
              }
            ).then((res) => {
              setLoading(false)
              alert('Khởi tạo thành công, quay về trang quản lý project!')
              navigate('/management')
              
            }).catch((error) => {
              setLoading(false)
               
            })
          } else {
            alert('Vui lòng nhập liệu!')
          }
        }}
        buttonClass='btn btn-primary' btnName='Create Project' />

    </>

  );
}
