import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import THREE from './Three';
import {STLBinaryExporter} from '../exporter/STLBinaryExporter';
const OrbitControls = require('three-orbit-controls')(THREE);

class STLViewer extends Component {
    mesh = null;
    meshBB = null;
    meshRef = null;
    meshRefBB = null;
    renderer = null;
    scene = null;
    camera = null;
    axisHelper = null;
    modelPrimitives = {};
    fullModel = [];
    fullModelData = {};
    addMouseListeners = () => {
        this.renderer.domElement.addEventListener('mousedown', (event) => {
            event.preventDefault();
            let raycaster = new THREE.Raycaster();
            let mouse = new THREE.Vector2();

             mouse.x = ( event.clientX / this.renderer.domElement.clientWidth ) * 2 - 1;
             mouse.y = - ( event.clientY / this.renderer.domElement.clientHeight ) * 2 + 1;

             raycaster.setFromCamera(mouse, this.camera);

             let intersects = raycaster.intersectObjects(this.fullModel);
             if (intersects.length > 0) {
                 intersects[0].object.onObjectClick();
                 Object.keys(this.fullModelData).forEach((key) => {
                     let localData = this.fullModelData[key];
                     localData.selected = false;
                     Object.keys(this.fullModelData).forEach((key) => {
                         this.fullModel[this.fullModelData[key].meshIndex].material.color.set(this.fullModelData[key].originalColor)
                     });
                 });
                 this.fullModelData[intersects[0].object.userData.id].selected = true;
                 intersects[0].object.material.color.set( 0xff0000 );
             }
        }, false);
        this.renderer.domElement.addEventListener('mousemove', (event) => {
            event.preventDefault();
            let raycaster = new THREE.Raycaster();
            let mouse = new THREE.Vector2();

             mouse.x = ( event.clientX / this.renderer.domElement.clientWidth ) * 2 - 1;
             mouse.y = - ( event.clientY / this.renderer.domElement.clientHeight ) * 2 + 1;

             raycaster.setFromCamera(mouse, this.camera);
             let intersects = raycaster.intersectObjects(this.fullModel);

             if (intersects.length > 0) {
                 Object.keys(this.fullModelData).forEach((key) => {
                     if (!this.fullModelData[key].selected) {
                         this.fullModel[this.fullModelData[key].meshIndex].material.color.set(this.fullModelData[key].originalColor)
                     }
                 });
                 intersects[0].object.material.color.set( 0xff00ff );
                 //hover time
                 var parentDiv = document.getElementById("hoverDiv");
                 parentDiv.style.visibility ="visible";
                 var para = document.createElement("p");
                 para.id = "hoverP"
                 var para_content = document.createTextNode(intersects[0].object.userData.id);
                 para.appendChild(para_content)
                 var itemChild = document.getElementById("hoverP");
                 parentDiv.replaceChild(para,itemChild)
                 //hover stuff done
                 this.renderer.render(this.scene, this.camera);
             } else {
                 Object.keys(this.fullModelData).forEach((key) => {
                     if (!this.fullModelData[key].selected) {
                         this.fullModel[this.fullModelData[key].meshIndex].material.color.set(this.fullModelData[key].originalColor)
                        document.getElementById("hoverDiv").style.visibility ="hidden";
                     } else {
                         this.fullModel[this.fullModelData[key].meshIndex].material.color.set(0xff0000);
                                        
                     }
                 });
                 this.renderer.render(this.scene, this.camera);
             }
        }, false);
    }

    componentDidMount = () => {
        this.init();
    }

    componentDidUpdate() {
        this.init();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.modelChanged;
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.modelParts.length !== this.props.modelParts.length) {
            this.buildObject(nextProps.modelParts);
        }
    }

    applyResize() {
        // this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.render(this.scene, this.camera);
    }

    init() {
        const {
            url,
            urlRef,
            width,
            height,
            modelColor,
            backgroundColor,
            orbitControls
        } = this.props;

        let controls = null;
        let component = this;
        let rotate = this.props.rotate;

        this.scene = new THREE.Scene();
        let distance = 100000;

        let directionalLight = new THREE.DirectionalLight(0xffffff, 0.25);
        directionalLight.position.x = 0;
        directionalLight.position.y = 0;
        directionalLight.position.z = 1;
        directionalLight.position.normalize();
        this.scene.add(directionalLight);

        directionalLight = new THREE.DirectionalLight(0xffffff, 0.25);
        directionalLight.position.x = 0;
        directionalLight.position.y = 0;
        directionalLight.position.z = -1;
        directionalLight.position.normalize();
        this.scene.add(directionalLight);

        let light = new THREE.HemisphereLight( this.props.modelColor, 0x555555, 0.5 );
        this.scene.add( light );

        light = new THREE.HemisphereLight( 0x555555, this.props.modelColor, 0.5 );
        this.scene.add( light );

        let loader = new THREE.STLLoader();

        this.loadPrimitives(this.props.primitiveData, loader).then((primitives) => {
            primitives.forEach((primitiveGeometry, index) => {
                let mesh = new THREE.Mesh(primitiveGeometry, new THREE.MeshLambertMaterial({overdraw: true, color: '#ffffff'}));
                this.modelPrimitives[this.props.primitiveData[index].id] = mesh;
            });

            this.buildObject();
            this.camera.position.set(0, 0, 3000);
            this.renderer.render(this.scene, this.camera);
        });

        this.camera = new THREE.PerspectiveCamera(30, width / height, 1, distance);
        this.scene.add(this.camera);

        this.renderer = new THREE.WebGLRenderer(); //new THREE.CanvasRenderer();
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(backgroundColor, 1);

        this.addMouseListeners();

        if (orbitControls) {
            controls = new OrbitControls(this.camera, ReactDOM.findDOMNode(component));
            controls.addEventListener('change', () => this.renderer.render(this.scene, this.camera));
        }

        ReactDOM.findDOMNode(component).replaceChild(this.renderer.domElement, ReactDOM.findDOMNode(component).firstChild);

        this.renderer.render(this.scene, this.camera);
    }

    buildObject = (data) => {
        data = data || this.props.modelParts;

        this.fullModel.forEach((object) => {
            this.scene.remove(object);
        });
        this.renderer.render(this.scene, this.camera);

        data.forEach((part, index)=>{
            let primitveMesh = this.modelPrimitives[part.primitiveId];
            let mesh = new THREE.Mesh(primitveMesh.geometry, new THREE.MeshLambertMaterial({overdraw: true, color: '#ffffff'}));
            // this.props.primitiveData[index].meshBB = new THREE.Box3().setFromObject(mesh);
            mesh.onObjectClick = this.props.onObjectClick.bind(null, part.id);
            mesh.userData.id = part.id;
            this.fullModel.push(mesh);
            this.fullModelData[part.id] = {
                visible: true,
                meshIndex: this.fullModel.length - 1,
                originalColor: part.color || '#ffffff',
                selected: false
            };
            mesh.position.set(...part.position);
            if (part.rotation) {
                mesh.rotation.set(...part.rotation);
            }
            if (part.scale) {
                mesh.scale.set(...part.scale);
            }
            if (part.color) {
                mesh.material.color.set(part.color);
            }
            this.scene.add(mesh);
        });
        this.renderer.render(this.scene, this.camera);
    }

    loadPrimitives = (primitiveList, loader) => new Promise((resolveParent, rejectParent) => {
        let allPromises = [];
        primitiveList.forEach((model) => {
            allPromises.push(new Promise((resolve, reject) => this.promiseLoader(model.url, loader, resolve)));
        });
        Promise.all(allPromises).then((value) => resolveParent(value));
    });

    promiseLoader = (url, loader, resolve) => {
        loader.load2(url, (geometry) => {
            resolve(geometry);
        });
    }

    // TODO
    getDimensions = (modelId) => {
        for (let i = 0; i < this.modelParts.length; i++) {
            if (this.modelParts[i].userData.id === modelId) {
                 let meshBB = new THREE.Box3().setFromObject(this.modelParts[i]);
                 let xDims = meshBB.max.x - meshBB.min.x;
                 let yDims = meshBB.max.y - meshBB.min.y;
                 let zDims = meshBB.max.z - meshBB.min.z;
                 return {x: xDims, y: yDims, z: zDims}
            }
        }
    }

    getMeshById = (meshId) => {
        let tMesh = this.fullModel[this.fullModelData[meshId].meshIndex];
        return {
            position: {x: tMesh.position.x,y: tMesh.position.y,z: tMesh.position.z},
            scale: {x: tMesh.scale.x,y: tMesh.scale.y,z: tMesh.scale.z},
            rotation: {x: tMesh.rotation.x,y: tMesh.rotation.y,z: tMesh.rotation.z},
            color: this.fullModelData[meshId].originalColor
        };
    }

    getSTL = () => {
        let stlExporter = new STLBinaryExporter();
        let data = stlExporter.parse(this.scene);
        this.download(data, "result", "stl");
    }

    // Function to download data to a file
    download = (data, filename, type) => {
        var a = document.createElement("a"),
            file = new Blob([data], {type: type});
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            var url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename+'.'+type;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);  
            }, 0); 
        }
    }

    setMeshDataById = (meshId, data, type) => {
        let tMesh = this.fullModel[this.fullModelData[meshId].meshIndex];
        if (type === 'position') {
            tMesh.position.set(data.x, data.y, data.z);
        } else if (type === 'scale') {
            tMesh.scale.set(data.x, data.y, data.z);
        } else if (type === 'rotation') {
            tMesh.rotation.set(data.x, data.y, data.z);
        } else if (type === 'color') {
            this.fullModelData[meshId].originalColor = data;
        }
        this.renderer.render(this.scene, this.camera);
    }

    render() {
        return (
            <div id="viewer3d">
                  <div style={{
                          textAlign: 'center',
                          marginTop: this.props.height / 2 - 8
                      }}>
                  </div>
            </div>
        );
    };
};

module.exports = STLViewer;
