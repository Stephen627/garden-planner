import * as React from 'react';
import { connect } from 'react-redux';
import * as dayjs from 'dayjs';

import { Page } from '../layouts/logged-in';
import GardenModel from '../utils/database/garden';
import Plant from '../utils/database/plant';
import { getGardens, updateGardens, setGardens, updateCell, updateCells } from './actions';
import { Auth } from '../utils/user';
import Loading from '../components/loading';
import GardenGrid, { CellContent, Coords } from './grid';
import { __ } from '../utils/lang';
import Action from '../components/action';
import Settings from './settings';
import CellModal from './cell-modal';
import Form from '../components/form';
import { getMonthOptionsBetween } from '../utils/dates';
import { getPlants } from '../plants/actions';

export interface GardenProps {
    match: { params: { id: string } };
    gardens: { [key: string]: GardenModel };
    plants: { [key: string]: Plant };
    getGardens: Function;
    getPlants: Function;
    updateGardens: Function;
    setGardens: Function;
    updateCell: Function;
    updateCells: Function;
}

export interface GardenState {
    showSettings: boolean;
    editingCells: Coords[];
    month: string;
}

class Garden extends React.Component<GardenProps, GardenState> {

    private id: string;

    constructor (props: GardenProps) {
        super(props);

        this.id = this.props.match.params.id;
        this.onSettingsSubmit = this.onSettingsSubmit.bind(this);
        this.onCellSelect = this.onCellSelect.bind(this);
        this.updateCell = this.updateCell.bind(this);

        const now = dayjs().set('day', 1);
        
        this.state = {
            showSettings: false,
            editingCells: null,
            month: now.format('MMMM YYYY')
        };
    }

    componentDidMount () {
        const uid = Auth.currentUser().uid || null;
        this.props.getGardens(uid);
        this.props.getPlants(uid);
    }

    onSettingsSubmit (garden: GardenModel) {
        const uid = Auth.currentUser().uid || null;

        const gardens = this.props.gardens;
        gardens[this.id] = garden;
        this.props.updateGardens(uid, gardens);
        this.setState({
            ...this.state,
            showSettings: false
        })
    }

    onCellSelect(coords: Coords[]) {
        this.setState({
            ...this.state,
            editingCells: coords
        });
    }

    updateCell (cell: CellContent) {
        const uid = Auth.currentUser().uid;
        this.props.updateCells(uid, this.id, this.state.month, this.state.editingCells, cell);

        this.setState({
            ...this.state,
            editingCells: null
        });
    }

    render () {
        if (this.props.gardens === null || !Object.keys(this.props.gardens).length) {
            return <Loading></Loading>
        }

        const garden = this.props.gardens[this.id];

        const cell = this.state.editingCells && typeof garden.cells !== 'undefined' &&
            this.state.editingCells.length === 1 &&
            typeof garden.cells[this.state.month] !== 'undefined' &&
            typeof garden.cells[this.state.month][this.state.editingCells[0].x] !== 'undefined' &&
            typeof garden.cells[this.state.month][this.state.editingCells[0].x][this.state.editingCells[0].y] !== 'undefined'
            ? garden.cells[this.state.month][this.state.editingCells[0].x][this.state.editingCells[0].y] : null;

        return <Page title={garden.name}>
            { this.state.editingCells &&
                <CellModal
                    cell={cell}
                    plants={this.props.plants}
                    onUpdate={this.updateCell}
                    onClose={ () => this.setState({ ...this.state, editingCells: null }) }
                />
            }
            <h4 className="text-center text-lg font-bold">
                <Form.Select
                    className="focus:ring-primary-500 focus:border-primary-500"
                    options={ getMonthOptionsBetween(dayjs(), dayjs().add(24, 'months')) }
                    onChange={(evt) => this.setState({ ...this.state, month: evt.target.value })}
                />
            </h4>
            <GardenGrid
                cellContents={garden.cells && garden.cells[this.state.month] || []}
                onCellSelect={this.onCellSelect}
                width={garden.width}
                height={garden.height}
                plants={this.props.plants}
            />
            {
                this.state.showSettings
                    && <Settings
                            garden={garden}
                            onSubmit={this.onSettingsSubmit}
                            onClose={() => this.setState({ ...this.state, showSettings: false})}
                        />
            }
            <Action onClick={() => this.setState({ ...this.state, showSettings: true })}>
                <i className="fal fa-cog"></i>
            </Action>
        </Page>
    }
}

const mapStateToProps = (state: any) => {
    return {
        gardens: state.garden.list,
        plants: state.plants.list
    }
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        getGardens: (uid: string) => dispatch(getGardens(uid)),
        updateGardens: (uid: string, gardens: GardenModel[]) => dispatch(updateGardens(uid, gardens)),
        updateCell: (uid: string, gardenId: string, month: string, coords: Coords, data: CellContent) => dispatch(updateCell(uid, gardenId, month, coords, data)),
        updateCells: (uid: string, gardenId: string, month: string, coords: Coords[], data: CellContent) => dispatch(updateCells(uid, gardenId, month, coords, data)),
        setGardens: (gardens: GardenModel[]) => dispatch(setGardens(gardens)),
        getPlants: (uid: string) => dispatch(getPlants(uid)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Garden);
