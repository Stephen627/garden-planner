import * as React from 'react';
import * as dayjs from 'dayjs';

import Form from '../components/form';
import { loopDates } from '../utils/dates';
import { __ } from '../utils/lang';
import Plant from '../utils/database/plant';

export interface Props {
    onChange: (name: keyof Plant, values: any[]) => void;
    sow: boolean[];
    plantOut: boolean[];
    harvest: boolean[];
}

export interface State {

}

export enum MonthSelector {
    'sow', 'plantOut', 'harvest'
}

class MonthSelectors extends React.Component<Props> {

    private months: JSX.Element[] = [];

    constructor (props: Props) {
        super(props);

        this.onChange = this.onChange.bind(this);

        loopDates(dayjs().startOf('year'), dayjs().endOf('year'), (date) => {
            this.months.push(<span className="col-span-1" key={date.format('MMM')}>{date.format('MMM')}</span>);
        });
    }

    onChange (name: keyof Plant, index: number) {
        switch (name) {
            case 'sow':
            case 'plantOut':
            case 'harvest':
                const values = this.props[name];
                values[index] = !values[index];
                this.props.onChange(name, [ ...values.map(value => typeof value === 'undefined' ? false : value) ]);
                break;
            default:
                break;
        }
    }

    makeButtons (name: keyof Plant): JSX.Element[] {
        const options: JSX.Element[] = [];

        switch (name) {
            case 'sow':
            case 'plantOut':
            case 'harvest':
                for (let i = 0; i < 12; i++) {
                    options.push(
                        <span className="col-span-1" key={i}>
                            <Form.Radio
                                onClick={() => this.onChange(name, i)}
                                name={`${name}[${i}]`}
                                checked={this.props[name][i]}
                                value={this.props[name][i]}
                            />
                        </span>
                    )
                }
                break;
        }

        return options;
    }

    render () {
        return <div className="overflow-x-auto text-center">
            <div className="grid grid-cols-14 gab-6 min-w-max">
                <span className="col-span-2"></span>
                {this.months}

                <span className="col-span-2">{ __('Sow') }</span>
                {this.makeButtons('sow')}

                <span className="col-span-2">{ __('Plant Out') }</span>
                {this.makeButtons('plantOut')}

                <span className="col-span-2">{ __('Harvest') }</span>
                {this.makeButtons('harvest')}
            </div>
        </div>
    }
}

export default MonthSelectors;
