import * as React from 'react';
import { InputProps } from './input';

export interface PasswordProps extends InputProps {
    testId?: any
}

const Password = (props: PasswordProps) => {
    return <input data-testid={props.testId} name={props.name} value={props.value || ''} type="password" placeholder={props.placeholder || ''} onChange={props.onChange}></input>;
}

export default Password;
