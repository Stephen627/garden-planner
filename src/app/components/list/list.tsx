import * as React from 'react';
import { Item } from './item';

export interface ListProps {
    items: Array<React.ReactNode>;
    paginate?: boolean;
    topPaginate?: boolean;
    bottomPaginate?: boolean;
};

export class List extends React.Component<ListProps> {
    constructor (props: ListProps) {
        super(props);

        this.state = {
            page: 0,
        };
        this.onPaginateButtonClick = this.onPaginateButtonClick.bind(this);
    }

    onPaginateButtonClick (page: number) {
        this.setState({
            page
        });
    }

    render () {
        return <ul>{this.props.items}</ul>
    }
}