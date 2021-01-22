import * as React from 'react';
import { Item } from './item';

export interface ListProps {
    children: any;
    paginate?: boolean;
    topPaginate?: boolean;
    bottomPaginate?: boolean;
    className?: string;
}

class List extends React.Component<ListProps> {
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
        if (!this.props.children.length) {
            return <div className="list--empty">There are no items in the list</div>
        }
        return <ul className={this.props.className}>{this.props.children}</ul>
    }
}

export {
    Item
}
export default List;
