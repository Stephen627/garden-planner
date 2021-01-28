import * as React from 'react';
import { useState, useEffect } from 'react';
import Loading from './loading';

export interface Props {
    imagePromise: Promise<string>;
    alt: string;
}

const PromiseImage = (props: Props) => {
    const [ imageUrl, setImageUrl ] = useState(null);

    useEffect(() => {
        props.imagePromise.then((data) => {
            setImageUrl(data);
        });
    });


    if (!imageUrl) {
        return <Loading />;
    }

    return <img src={imageUrl} alt={props.alt} />;
};

export default PromiseImage;
