import * as React from 'react';
import List, { Item } from './list';

interface entityListChange<T> {
    (entityList: T[]): void;
}

interface entityChange<T> {
    (evt: React.ChangeEvent<HTMLInputElement>, id: number, change: keyof T): void;
}

interface getName<T> {
    (entity: T): string;
}

export interface EntityCrudProps<T> {
    editModal: any;
    viewComponent: any;
    onEntityListChange: entityListChange<T>;
    onEntityChange: entityChange<T>;
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
            return <Item key={id}>
                <span className="list__item-title">{this.props.getName(entity)}</span>
                <div className="list__item-actions">
                    <div className="btn-group">
                        <a className="btn btn--primary" onClick={() => this.onEntityViewClick(id)}>View</a>
                        <a className="btn btn--danger" onClick={() => this.onDeleteClick(id)}>Delete</a>
                    </div>
                </div>
            </Item>
        });
        return <div className="entity-crud">
            <h1 className="heading-primary">{this.props.entityNamePlural}</h1>
            <a onClick={this.onCreateClick} className="btn btn--float btn--create btn--primary">
                <i className="fal fa-plus"></i>
            </a>
            <List>
                {items}
            </List>
            {this.state.selectedEntity !== null &&
                this.props.viewComponent(this.state.selectedEntity, this.props.entities[this.state.selectedEntity])
            }
        </div>;
    }
}

export default EntityCrud;
