import React, {PropTypes, Component} from 'react';
import STLViewer from './STLViewer';

export default class Field3D extends Component {

    state = {
        modelChanged: false,
        windowWidth: window.innerWidth,
        selectedMeshId: null,
        meshDataPosition: {x: 0, y: 0, z: 0},
        meshDataScale: {x: 0, y: 0, z: 0},
        meshDataRotation: {x: 0, y: 0, z: 0}
    }

    handleResize = (e) => {
        this.setState({
            modelChanged: false,
            windowWidth: window.innerWidth
        });
        this.refs.STLViewer.applyResize();
    }

    onObjectClick = (data) => {
        let tmpData = this.refs['STLViewer'].getMeshById(data);
        this.setState({
            selectedMeshId: data,
            meshDataPosition: tmpData.position,
            meshDataScale: tmpData.scale,
            meshDataRotation: tmpData.rotation
        });

    }

    componentDidMount = () => window.addEventListener('resize', this.handleResize);

    getDimensions = (modelId) => this.refs['STLViewer'].getDimensions(modelId);

    changeData = (axis, type, e) => {
        // console.log(e, axis, type, newValue);
        let newValue = parseFloat(e.target.value);

        if (type === 'position') {
            let newState = this.state.meshDataPosition;
            newState[axis] = newValue;
            this.setState({
                meshDataPosition: newState
            });
            this.refs['STLViewer'].setMeshDataById(this.state.selectedMeshId, newState, 'position');
        } else if (type === 'scale') {
            let newState = this.state.meshDataScale;
            newState[axis] = newValue;
            this.setState({
                meshDataScale: newState
            });
            this.refs['STLViewer'].setMeshDataById(this.state.selectedMeshId, newState, 'scale');
        } else if (type === 'rotation') {
            
            let newState = this.state.meshDataRotation;
            newState[axis] = newValue*(Math.PI/180);
            this.setState({
                meshDataRotation: newState
            });
            this.refs['STLViewer'].setMeshDataById(this.state.selectedMeshId, newState, 'rotation');
        }
    }

    changeNrOfModelParts = (e) => this.props.changeNrOfModelParts(parseInt(e.target.value))

    render = () => (
            <div>
                <div>
                    <STLViewer
                        primitiveData={this.props.primitiveData}
                        modelParts={this.props.modelParts}
                        width={window.innerWidth * 0.8}
                        height={window.innerHeight}
                        modelColor={this.props.modelColor}
                        backgroundColor='#364049'
                        rotate={true}
                        orbitControls={true}
                        modelChanged={this.state.modelChanged}
                        onObjectClick={this.onObjectClick}
                        ref="STLViewer"/>
                </div>
                <div style={{position: 'fixed', right: '50px', top: 0, backgroundColor: 'white'}}>
                    <div>
                        <h3>Bridge Parts:</h3>
                        <input type="number" value={this.props.nrOfModelParts} onChange={this.changeNrOfModelParts}/>
                    </div>
                    <h3>Selected Part: {this.state.selectedMeshId}</h3>
                    <div>
                        <h3>Position</h3>
                        <div>
                            <label>x:</label><input type="number" value={this.state.meshDataPosition.x} onChange={this.changeData.bind(this, 'x', 'position')}/>
                        </div>
                        <div>
                            <label>y:</label><input type="number" value={this.state.meshDataPosition.y} onChange={this.changeData.bind(this, 'y', 'position')}/>
                        </div>
                        <div>
                            <label>z:</label><input type="number" value={this.state.meshDataPosition.z} onChange={this.changeData.bind(this, 'z', 'position')}/>
                        </div>
                    </div>
                    <div>
                        <h3>Scale</h3>
                        <div>
                            <label>x:</label><input type="number" value={this.state.meshDataScale.x.toFixed(2)} step="0.01" onChange={this.changeData.bind(this, 'x', 'scale')}/>
                        </div>
                        <div>
                            <label>y:</label><input type="number" value={this.state.meshDataScale.y.toFixed(2)} step="0.01" onChange={this.changeData.bind(this, 'y', 'scale')}/>
                        </div>
                        <div>
                            <label>z:</label><input type="number" value={this.state.meshDataScale.z.toFixed(2)} step="0.01" onChange={this.changeData.bind(this, 'z', 'scale')}/>
                        </div>
                    </div>
                    <div>
                        <h3>Rotation</h3>
                        <div>
                            <label>x:</label><input type="number" value={this.state.meshDataRotation.x.toFixed(2)*(180/Math.PI)} step="0.01" onChange={this.changeData.bind(this, 'x', 'rotation')}/>
                        </div>
                        <div>
                            <label>y:</label><input type="number" value={this.state.meshDataRotation.y.toFixed(2)*(180/Math.PI)} step="0.01" onChange={this.changeData.bind(this, 'y', 'rotation')}/>
                        </div>
                        <div>
                            <label>z:</label><input type="number" value={this.state.meshDataRotation.z.toFixed(2)*(180/Math.PI)} step="0.01" onChange={this.changeData.bind(this, 'z', 'rotation')}/>
                        </div>
                    </div>
                </div>
            </div>
        );
}
