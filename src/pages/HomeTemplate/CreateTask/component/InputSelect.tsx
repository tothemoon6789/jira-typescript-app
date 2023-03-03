import * as React from 'react';

export interface IInputSelect {
    name:string
}

export function InputSelect(props: IInputSelect) {
    return (
        <div className="form-group">
            <label htmlFor="project">{props.name}</label>
            <select className="form-control" name="project" id="project">
                <option>1</option>
                <option>2</option>
                <option>3</option>
            </select>
        </div>

    );
}
