import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Spiner from '../../../components/Loading/Spiner/Spiner';
import { AppDispatch, RootState } from '../../../store';
import { dropdownThunk } from '../../_duck/dropdownSlice';
import { TokenBearer } from '../HomeTemplate';
import { Modal } from './component/Modal';
import { Row } from './component/Row';
import { managementThunk } from './duck/managementSlice';

export interface IManagementProps {
}

export function Management(props: IManagementProps) {
    const dispatch = useDispatch<AppDispatch>()
    const allProject = useSelector((state: RootState) => state.management.allProject)
    const loading = useSelector((state: RootState) => state.management.loading)
    const accessToken = React.useContext(TokenBearer)
    React.useEffect(() => {
        dispatch(managementThunk())
        dispatch(dropdownThunk(accessToken))
    },[])

    const renderRow = () => {
        return allProject?.map((row, index) => {
            return <Row key={index} data={row}/>
        })
    }
    return (
        <div>

        <table className="table table-responsive-md">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Project Name</th>
                    <th>Category</th>
                    <th>Creator</th>
                    <th>Member</th>
                    <th>Add</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {renderRow()}
            </tbody>
        </table>
            {loading && <Spiner/>}
        </div>
    );
}
