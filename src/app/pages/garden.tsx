
import * as React from 'react';
import { useParams } from 'react-router-dom';

export const Garden = (props: any) => {
    const { id } = useParams();
    
    return <div><h1>Garden {id}</h1></div>
}

export default Garden;
