import * as React from 'react';

export interface IInputTextProps {
    name:string
}

export function InputText(props: IInputTextProps) {
    return (
        <div className="form-group">
            <label htmlFor="taskName">{props.name}</label>
            <input type="text" className="form-control" name="taskName" id="taskName" aria-describedby="helpId" placeholder="Enter task name" />
        </div>

    );
}
