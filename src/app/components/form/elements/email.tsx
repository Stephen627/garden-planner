import * as React from 'react';
import { InputProps } from './input';

export interface EmailProps extends InputProps {
    testId?: any
}

const Email = (props: EmailProps) => {
    return <input className={props.className} data-testid={props.testId} name={props.name} value={props.value || ''} type="email" placeholder={props.placeholder || ''} onChange={props.onChange}></input>
}

export default Email;
