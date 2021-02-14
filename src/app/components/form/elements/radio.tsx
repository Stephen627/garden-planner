import * as React from 'react';

import { InputProps } from './input';

export interface Props extends InputProps {
    checked?: boolean;
    onClick?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
}

const Radio: React.FC<Props> = (props: Props) => {
    return <input
        className="text-primary-400 focus:ring-primary-500"
        type="radio"
        name={props.name}
        onClick={props.onClick}
        onChange={() => {}}
        checked={props.checked}
    />
}

export default Radio;