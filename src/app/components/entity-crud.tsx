import * as React from 'react';
import List, { Item } from './list';
import Action from './action';

interface entityListChange<T> {
    (entityList: T[]): void;
}

interface getName<T> {
    (entity: T): string;
}

export interface EntityCrudProps<T> {
    viewComponent?: any;
    onEntityListChange: entityListChange<T>;
    viewString?: JSX.Element;
    deleteString?: JSX.Element;
    entities: T[];
    entityDefaults: T;
    entityNameSingular: string;
    entityNamePlural: string;
    getName: getName<T>;
}

export interface EntityCrudState {
    selectedEntity: number;
}

class EntityCrud<T> extends React.Component<EntityCrudProps<T>, EntityCrudState> {

    constructor (props: EntityCrudProps<T>) {
        super(props);

        this.onCreateClick = this.onCreateClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onEntityViewClick = this.onEntityViewClick.bind(this);

        this.state = {
            selectedEntity: null,
        };
    }

    onEntityViewClick (id: number) {
        this.setState({
            ...this.state,
            selectedEntity: id
        });
    }

    onDeleteClick (id: number) {
        const entities = [ ...this.props.entities ];
        entities.splice(id, 1);

        this.props.onEntityListChange(entities.filter((entity) => entity));
    }

    onCreateClick () {
        const entities = [ ...this.props.entities ];
        entities.push({
            ...this.props.entityDefaults
        });

        this.props.onEntityListChange(entities);
    }

    render () {
        const items = this.props.entities.map((entity: T, id: number) => {
            return <Item key={id} className="p-4 w-full md:w-4/12 lg:w-3/12">
                <div className="shadow-md border-2 border-gray-200 rounded-lg">
                    <h4 className="px-6 py-4 text-lg font-semibold">{this.props.getName(entity)}</h4>
                    <div className="flex justify-between border-t-2 border-gray-200 w-full">
                        <div className="w-6/12 text-center p-2 border-r-2 border-gray-200">
                            <a href="#" onClick={() => this.onEntityViewClick(id)}>
                                { this.props.viewString || <span><i className="fa fa-eye"></i> View</span> }
                            </a>
                        </div>
                        <div className="w-6/12 text-center p-2">
                            <a href="#" onClick={() => this.onDeleteClick(id)}>
                                { this.props.deleteString || <span><i className="fa fa-trash"></i> Delete</span>}
                            </a>
                        </div>
                    </div>
                </div>
            </Item>
        });
        return <div className="w-10/12 md:w-11/12 mt-7 mx-auto h-full">
            <Action onClick={this.onCreateClick}>
                <i className="fal fa-plus"></i>
            </Action>
            <List className="flex justify-start flex-wrap">
                {items}
            </List>
            {this.state.selectedEntity !== null &&
                this.props.viewComponent(this.state.selectedEntity, this.props.entities[this.state.selectedEntity], () => this.setState({...this.state, selectedEntity: null}))
            }
        </div>;
    }
}

export default EntityCrud;
