import * as React from 'react';

export interface IAddUserProps {
}

export function AddUser(props: IAddUserProps) {
    return (
        <div className="form-group">
            <select className="form-control" >
                <option value={'falskdj'}/>
                <option value={'fdlksajfd'}/>
                <option value={'fdalskjfd'}/>
            </select>
        </div>

    );
}
