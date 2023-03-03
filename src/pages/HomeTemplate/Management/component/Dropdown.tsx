import * as React from 'react';
import api from '../../../../utils/api';
import { AddUser } from './AddUser';

export interface IDropdownProps {
}

export function Dropdown(props: IDropdownProps) {
    const [item,setItem] = React.useState([])
    React.useEffect(() => {
       api.get(
        ''
       ) 
    },[])
    const renderItem = () => {
        return <span className="dropdown-item" style={{cursor:'pointer'}}>asfdf</span>
    }
    return (
        <div className="dropdown">
            <button className='btn btn-default border' type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">+</button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <div className='p-2 form-group'>
                <input type="text" className='form-control' />
                </div>
                
                
            </div>
        </div>

    );
}
