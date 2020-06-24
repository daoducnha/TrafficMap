import React, {PureComponent} from 'react';

const pinStyle = {
    curser: 'pointer',
    fill:'#d00',
    stroke: 'none'
}

// const pinStyle = {
//     padding: '10px',
//     color: '#fff',
//     cursor: 'pointer',
//     background: '#1978c8',
//     borderRadius: '6px'
//   };

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
