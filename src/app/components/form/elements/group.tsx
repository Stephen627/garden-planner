import * as React from 'react';

export interface GroupProps {
    children?: any,
    className?: string
}

const Group = (props: GroupProps) => {
    return <div className={props.className || ''}>
        {props.children}
    </div>
}

export default Group;
