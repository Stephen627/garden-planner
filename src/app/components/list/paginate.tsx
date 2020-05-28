import * as React from 'react';

export interface PaginateButtonProps {
    page: number;
    onClick: Function;
}

export interface PaginateProps {
    total: number;
    page: number;
    perPage: number;
    active: number;
    onClick: Function;
};

export const PaginateButton = (props: PaginateButtonProps) =>
    <button className="paginate__button" onClick={() => props.onClick(props.page)}>
        {props.page + 1}
    </button>

export const Paginate = (props: PaginateProps) => {
    const buttons = [];
    for (let i = 0; i < Math.ceil(props.total / props.perPage); i++) {
        buttons.push(
            <PaginateButton onClick={props.onClick} page={i} />
        );
    }
    
    return <div className="paginate">
        {buttons}
    </div>
}