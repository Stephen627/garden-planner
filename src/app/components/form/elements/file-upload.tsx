import * as React from 'react';
import { InputProps } from './input';

export interface FileUploadProps extends InputProps {
}

const FileUpload = (props: FileUploadProps) => {
    return <input
        className={props.className}
        name={props.name}
        type="file"
        onChange={props.onChange}
    />;
}

export default FileUpload;
