import * as React from 'react';

export interface SubmitProps {
    value?: string,
    className?: string
}

const Submit = (props: SubmitProps) => {
    return <input type="submit" value={props.value || 'Submit'} className={props.className}></input>
}

export default Submit;
