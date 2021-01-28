import * as React from 'react';
import { InputProps } from './input';

export interface FileUploadProps extends InputProps {
}

const FileUpload = (props: FileUploadProps) => {
    return <input className={props.className} name={props.name} value={props.value || ''} type="file" placeholder={props.placeholder || ''} onChange={props.onChange}></input>
}

export default FileUpload;
