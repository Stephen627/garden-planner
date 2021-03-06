import * as React from 'react';
import Password from './elements/password';
import Text from './elements/text';
import Submit from './elements/submit';
import Group from './elements/group';
import Email from './elements/email';
import FileUpload from './elements/file-upload';
import Select from './elements/select';
import Radio from './elements/radio';

export enum FormMethod {
    PATCH = 'patch',
    POST = 'post',
    GET = 'get',
    PUT = 'put',
    DELETE = 'delete'
}

export interface FormProps {
    action?: string,
    method?: FormMethod,
    onSubmit?: Function,
    className?: string,
    children?: any,
    testId?: any
}

const Form = (props: FormProps) => {
    return <form data-testid={props.testId} className={props.className || 'form'} action={props.action} method={props.method} onSubmit={(evt) => { evt.preventDefault(); props.onSubmit(evt) }}>
        {props.children}
    </form>;
}

Form.Password = Password;
Form.Text = Text;
Form.Submit = Submit;
Form.Group = Group;
Form.Email = Email;
Form.FileUpload = FileUpload;
Form.Select = Select;
Form.Radio = Radio;

export default Form;