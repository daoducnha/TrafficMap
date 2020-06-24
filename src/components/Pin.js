import React, {PureComponent} from 'react';

const pinStyle = {
    curser: 'pointer',
    fill:'#d00',
    stroke: 'none'
}

export default class CityPin extends PureComponent {
    render() {
        const {size=20, onClick} = this.props;
        return (            
            <div style={pinStyle}>
               👇
            </div>
        );
    }
}
