import * as React from 'react';

export interface Option {
    name: string;
    value: string;
}

export interface Props {
    options: Option[];
    className?: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<Props> = (props: Props) => {
    const options = props.options.map((option: Option) => {
        return <option key={option.value} value={option.value}>{option.name}</option>;
    });

    return <select className={props.className} onChange={props.onChange}>
        {options}
    </select>;
}

export default Select;
