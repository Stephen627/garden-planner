import * as React from 'react';

export interface Option {
    name: string;
    value: string;
}

export interface Props {
    options: Option[];
    className?: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value?: string;
    provideDefault?: boolean;
}

const Select: React.FC<Props> = (props: Props) => {
    const options = props.options.map((option: Option) => {
        const optionProps: { [key: string]: string } = {
            key: option.value,
            value: option.value
        };

        return <option {...optionProps}>
            {option.name}
        </option>;
    });

    return <select className={props.className} onChange={props.onChange} value={props.value}>
        { props.provideDefault ? <option value="">-- None --</option> : ''}
        {options}
    </select>;
}

export default Select;
