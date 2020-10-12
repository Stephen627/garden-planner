import * as React from 'react';
import Form from './form';
import List, { Item } from './list';
import Modal from './modal';

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
    editEntity: number;
    selectedEntity: number;
}

class EntityCrud<T> extends React.Component<EntityCrudProps<T>, EntityCrudState> {

    constructor (props: EntityCrudProps<T>) {
        super(props);

        this.onCreateClick = this.onCreateClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onEntityViewClick = this.onEntityViewClick.bind(this);
        this.onModalCloseClick = this.onModalCloseClick.bind(this);
        this.onEntityClick = this.onEntityClick.bind(this);
        this.onEntityEditClick = this.onEntityEditClick.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);

        this.state = {
            selectedEntity: null,
            editEntity: null
        };
    }

    onEntityClick (id: number) {
        this.setState({
            ...this.state,
            editEntity: id
        });
    }

    onEntityEditClick (id: number) {
        this.setState({
            ...this.state,
            editEntity: id
        });
    }

    onModalCloseClick () {
        this.setState({
            ...this.state,
            editEntity: null
        });
    }

    onEntityViewClick (id: number) {
        this.setState({
            ...this.state,
            selectedEntity: id
        });
    }

    onDeleteClick (id: number) {
        const entities = [ ...this.props.entities ];
        delete entities[id];

        this.props.onEntityListChange(entities);
    }

    onCreateClick () {
        const entities = [ ...this.props.entities ];
        entities.push({
            ...this.props.entityDefaults
        });

        this.props.onEntityListChange(entities);
    }

    onEditSubmit () {
        this.onModalCloseClick();
        this.props.onEntityListChange(this.props.entities);
    }

    render () {
        const items = this.props.entities.map((entity: T, id: number) => {
            return <Item key={id}>
                {this.props.getName(entity)}
                <a className="btn btn--primary" onClick={() => this.onEntityClick(id)}>Settings</a>
                <a className="btn btn--primary" onClick={() => this.onEntityViewClick(id)}>View</a>
                <a className="btn btn--danger" onClick={() => this.onDeleteClick(id)}>Delete</a>
            </Item>
        });
        return <div>
            <h1>{this.props.entityNamePlural}</h1>
            <a onClick={this.onCreateClick} className="btn btn--create btn--primary"></a>
            <List>
                {items}
            </List>
            {this.state.editEntity !== null &&
                <Modal onClose={this.onModalCloseClick} title={'Edit ' + this.props.entityNameSingular}>
                    <Form onSubmit={this.onEditSubmit} className="form">
                        {this.props.editModal(this.state.editEntity, this.props.entities[this.state.editEntity])}
                    </Form>
                </Modal>
            }
            {this.state.selectedEntity !== null &&
                React.createElement(this.props.viewComponent, {entity: this.props.entities[this.state.selectedEntity]})
            }
        </div>;
    }
}

export default EntityCrud;
