import * as React from 'react';

export interface SettingsProps {
    onChange: Function;
    width: number;
    height: number;
}

export class Settings extends React.Component<SettingsProps> {

    constructor (props: SettingsProps) {
        super(props);

        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange (evt: React.ChangeEvent<HTMLInputElement>) {
        this.props.onChange(
            evt.target.name,
            evt.target.value
        );
    }

    render () {
        const { width, height } = this.props;

        return <div className="settings">
            <div className="settings__group">
                <label>
                    Width
                    <input type="number" name="width" value={width} onChange={this.onInputChange} />
                </label>
            </div>
            <div className="settings__group">
                <label>
                    Height
                    <input type="number" name="height" value={height} onChange={this.onInputChange} />
                </label>
            </div>
        </div>
    }
}