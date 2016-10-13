import React, {PropTypes, Component} from 'react';
import Model from './components/viewer/Model';
import {getPartData} from './SimplePart';
import {primitivesData} from './Primitives';

export default class Main extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        bridgeParts: 10,
        bridgeData: getPartData(10)
    }

    changeBridgeParts = (nr) => this.setState({
        bridgeParts: nr,
        bridgeData: getPartData(nr)
    });

    render = () => <Model
            primitiveData={primitivesData}
            modelParts={this.state.bridgeData}
            nrOfModelParts={this.state.bridgeParts}
            changeNrOfModelParts={this.changeBridgeParts}
            modelColor='#ffffff'
        />
}
