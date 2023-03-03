import * as React from 'react';
import api from '../../../../utils/api';
import { Editor } from '@tinymce/tinymce-react';
import { ButtonC } from '../../../../components/Button/ButtonC';

export interface IModalProps {
    data: any
}

export function Modal(props: IModalProps) {
    const [loading, setLoading] = React.useState(false)
    const refModal = React.useRef<HTMLDivElement>(null)
    const { data } = props
    const [option, setOption] = React.useState([])
    const [project, setProject] = React.useState({
        id: 0,
        projectName: "",
        creator: 0,
        description: "",
        categoryId: "",
    })
    console.log(data);

    React.useEffect(() => {
        api.get('/api/ProjectCategory')
            .then((res) => {
                console.log(res);
                setOption(res.data.content)
            })
            .catch((error) => {
                console.log(error);

            })
        setProject({
            ...project,
            id: data.id,
            projectName: data.projectName,
            creator: data.creator.id,
            description: data.description,
            categoryId: data.categoryId,
        })

    }, [])
    const renderOption = () => {
        console.log(option);

        return option?.map((item: any, index) => {
            return <option key={index} value={item.id}>{item.projectCategoryName}</option>
        })
    }
    return (
        <div ref={refModal} className="modal fade" id={"modelId" + project.id.toString()} tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit project</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">


                        <div className="form-group">
                            <label htmlFor="projectName">Project name</label>
                            <input
                                value={project.projectName}
                                onChange={(event) => {
                                    setProject({
                                        ...project,
                                        projectName: event?.target.value
                                    })
                                }}
                                type="text" className="form-control" name="projectName" id="projectName" placeholder="Enter project name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Project description</label>
                            <textarea
                            
                                value={project.description}
                            onChange={(event) => {
                                setProject({
                                    ...project,
                                    description: event.target.value
                                })
                            }}
                            className="form-control" name="description" id="description" rows={5} defaultValue={""} />
                        </div>


                        {/* <Editor
                                initialValue={data.description}
                                onEditorChange={(newtext) => {
                                    setProject({
                                        ...project,
                                        description: newtext
                                    })

                                }}
                                init={{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount'
                                    ],
                                    toolbar: 'undo redo | formatselect | ' +
                                        'bold italic backcolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                            /> */}
                        <div className="form-group">
                            <div className="form-group">
                                <label htmlFor="categoryId">Category</label>
                                <select
                                    onChange={(event) => {
                                        setProject({ ...project, categoryId: event?.target.value })
                                    }}
                                    value={project.categoryId}
                                    className="form-control" name="categoryId" id="categoryId">
                                    <option>Chọn</option>
                                    {renderOption()}
                                </select>
                            </div>

                        </div>
                        <div className="form-group">
                            <label htmlFor="creator">Creator</label>
                            <input value={project.creator} disabled={true} type="text" className="form-control" name="creator" id="creator" placeholder="Enter creator" />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <ButtonC
                            isLoading={loading}
                            buttonClass='btn btn-primary'
                            btnName='Save'
                            handleOnclick={() => {
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
                                    setLoading(true)
                                    api.put(
                                        '/api/Project/updateProject?projectId=' + project.id,
                                        project,
                                        {
                                            headers: {
                                                Authorization: 'Bearer ' + local.accessToken
                                            }
                                        },
                                    )
                                        .then((res) => {
                                            alert('Cập nhật thành công !')
                                            setLoading(false)
                                            console.log(refModal.current);
                                            // console.log(refModal);
                                            if (refModal.current) {
                                                refModal.current.click()
                                                window.location.reload()
                                            }
                                        })
                                        .catch((error) => {
                                            alert('Cập nhật thất bại')
                                            setLoading(false)
                                        })
                                }
                            }
                            }
                        />
                    </div>
                </div>
            </div>
        </div>

    );
}


