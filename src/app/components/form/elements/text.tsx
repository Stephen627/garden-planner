import * as React from 'react';
import { InputProps } from './input';

export interface TextProps extends InputProps {
}

const Text = (props: TextProps) => {
    return <input className={props.className} name={props.name} value={props.value || ''} type="text" placeholder={props.placeholder || ''} onChange={props.onChange}></input>
}

export default Text;
