import * as React from 'react';

export interface SubmitProps {
    value?: string;
    className?: string;
    testId?: any;
}

const Submit = (props: SubmitProps) => {
    return <input data-testid={props.testId} type="submit" value={props.value || 'Submit'} className={props.className}></input>
}

export default Submit;
