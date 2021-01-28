import * as React from 'react';
import { useState, useEffect } from 'react';
import Loading from './loading';

export interface Props {
    imagePromise: Promise<string>;
    alt: string;
    className?: string;
}

const PromiseImage = (props: Props) => {
    const [ imageUrl, setImageUrl ] = useState(null);

    useEffect(() => {
        props.imagePromise.then((data) => {
            setImageUrl(data);
        });
    });


    if (!imageUrl) {
        return <span className={props.className}><Loading /></span>;
    }

    return <img className={props.className} src={imageUrl} alt={props.alt} />;
};

export default PromiseImage;
