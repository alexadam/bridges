

const partWidth = 2135;
const getRandomId = () => 'id' + Math.floor(Math.random() * 10000000);

const generateData = (startX) => [
    {
        id: getRandomId(),
        primitiveId: 'p1',
        position: [0 + startX, -400, 0],
        rotation: [Math.PI / 2, 0, 0],
        scale: [1, 1, 5]
    },
    {
        id: getRandomId(),
        primitiveId: 'p1',
        position: [500 + startX, -400, 0],
        rotation: [Math.PI / 2, 0, 0],
        scale: [1, 1, 5]
    },
    {
        id: getRandomId(),
        primitiveId: 'p1',
        position: [1000 + startX, -400, 0],
        rotation: [Math.PI / 2, 0, 0],
        scale: [1, 1, 5]
    },
    {
        id: getRandomId(),
        primitiveId: 'p1',
        position: [1500 + startX, -400, 0],
        rotation: [Math.PI / 2, 0, 0],
        scale: [1, 1, 5]
    },
    {
        id: getRandomId(),
        primitiveId: 'p1',
        position: [2000 + startX, -400, 0],
        rotation: [Math.PI / 2, 0, 0],
        scale: [1, 1, 5]
    },



    {
        id: getRandomId(),
        primitiveId: 'p1',
        position: [0 + startX, -400, 1000],
        rotation: [Math.PI / 2, 0, 0],
        scale: [1, 1, 5]
    },
    {
        id: getRandomId(),
        primitiveId: 'p1',
        position: [500 + startX, -400, 1000],
        rotation: [Math.PI / 2, 0, 0],
        scale: [1, 1, 5]
    },
    {
        id: getRandomId(),
        primitiveId: 'p1',
        position: [1000 + startX, -400, 1000],
        rotation: [Math.PI / 2, 0, 0],
        scale: [1, 1, 5]
    },
    {
        id: getRandomId(),
        primitiveId: 'p1',
        position: [1500 + startX, -400, 1000],
        rotation: [Math.PI / 2, 0, 0],
        scale: [1, 1, 5]
    },
    {
        id: getRandomId(),
        primitiveId: 'p1',
        position: [2000 + startX, -400, 1000],
        rotation: [Math.PI / 2, 0, 0],
        scale: [1, 1, 5]
    },


    {
        id: getRandomId(),
        primitiveId: 'h2',
        position: [-120 + startX, 100, 1000],
        rotation: [-Math.PI / 2, 0, 0],
        scale: [2.9, 4.2, 1]
    },
    {
        id: getRandomId(),
        primitiveId: 'h2',
        position: [500-120+ startX, 100, 1000],
        rotation: [-Math.PI / 2, 0, 0],
        scale: [2.9, 4.2, 1]
    },
    {
        id: getRandomId(),
        primitiveId: 'h2',
        position: [1000-120+ startX, 100, 1000],
        rotation: [-Math.PI / 2, 0, 0],
        scale: [2.9, 4.2, 1]
    },
    {
        id: getRandomId(),
        primitiveId: 'h2',
        position: [1500-120+ startX, 100, 1000],
        rotation: [-Math.PI / 2, 0, 0],
        scale: [3.5, 4.2, 1]
    },



    {
        id: getRandomId(),
        primitiveId: 't1',
        position: [0 + startX, -160, -240],
        rotation: [-Math.PI / 2, 0, -Math.PI / 2],
        scale: [5.2, 2.5, 4]
    },
    {
        id: getRandomId(),
        primitiveId: 't1',
        position: [500 + startX, -160, -240],
        rotation: [-Math.PI / 2, 0, -Math.PI / 2],
        scale: [5.2, 2.5, 4]
    },
    {
        id: getRandomId(),
        primitiveId: 't1',
        position: [1000 + startX, -160, -240],
        rotation: [-Math.PI / 2, 0, -Math.PI / 2],
        scale: [5.2, 2.5, 4]
    },
    {
        id: getRandomId(),
        primitiveId: 't1',
        position: [1500 + startX, -160, -240],
        rotation: [-Math.PI / 2, 0, -Math.PI / 2],
        scale: [5.2, 2.5, 4]
    },
    {
        id: getRandomId(),
        primitiveId: 't1',
        position: [2000 + startX, -160, -240],
        rotation: [-Math.PI / 2, 0, -Math.PI / 2],
        scale: [5.2, 2.5, 4]
    },



    {
        id: getRandomId(),
        primitiveId: 't1',
        position: [0 + startX, 500, -240],
        rotation: [-Math.PI / 2, 0, -Math.PI / 2],
        scale: [5.2, 2.5, 4]
    },
    {
        id: getRandomId(),
        primitiveId: 't1',
        position: [2000 + startX, 500, -240],
        rotation: [-Math.PI / 2, 0, -Math.PI / 2],
        scale: [5.2, 2.5, 4]
    },


    {
        id: getRandomId(),
        primitiveId: 'p1',
        position: [0 + startX, 450, 0],
        rotation: [Math.PI / 2, 0, 0],
        scale: [1, 1, 3]
    },
    {
        id: getRandomId(),
        primitiveId: 'p1',
        position: [2000 + startX, 450, 0],
        rotation: [Math.PI / 2, 0, 0],
        scale: [1, 1, 3]
    },
    {
        id: getRandomId(),
        primitiveId: 'p1',
        position: [0 + startX, 450, 1000],
        rotation: [Math.PI / 2, 0, 0],
        scale: [1, 1, 3]
    },
    {
        id: getRandomId(),
        primitiveId: 'p1',
        position: [2000 + startX, 450, 1000],
        rotation: [Math.PI / 2, 0, 0],
        scale: [1, 1, 3]
    },


    // middle poles
    {
        id: getRandomId(),
        primitiveId: 'p3',
        position: [-300 + startX, 100, 590],
        rotation: [-Math.PI / 2, 0, 0],
        scale: [1, 1, 1]
    },
    {
        id: getRandomId(),
        primitiveId: 'p3',
        position: [200 + startX, 100, 590],
        rotation: [-Math.PI / 2, 0, 0],
        scale: [1, 1, 1]
    },
    {
        id: getRandomId(),
        primitiveId: 'p3',
        position: [700 + startX, 100, 590],
        rotation: [-Math.PI / 2, 0, 0],
        scale: [1, 1, 1]
    },
    {
        id: getRandomId(),
        primitiveId: 'p3',
        position: [1200 + startX, 100, 590],
        rotation: [-Math.PI / 2, 0, 0],
        scale: [1, 1, 1]
    },

    //rail road
    {
        id: getRandomId(),
        primitiveId: 'rr',
        position: [-100 + startX, 122, 250],
        rotation: [-Math.PI / 2, 0, 0],
        scale: [3.5, 3, 1],
        color: 0x0000ff
    },
    {
        id: getRandomId(),
        primitiveId: 'rr',
        position: [400 + startX, 122, 250],
        rotation: [-Math.PI / 2, 0, 0],
        scale: [3.5, 3, 1],
        color: 0x0000ff
    },
    {
        id: getRandomId(),
        primitiveId: 'rr',
        position: [900 + startX, 122, 250],
        rotation: [-Math.PI / 2, 0, 0],
        scale: [3.5, 3, 1],
        color: 0x0000ff
    },
    {
        id: getRandomId(),
        primitiveId: 'rr',
        position: [1400 + startX, 122, 250],
        rotation: [-Math.PI / 2, 0, 0],
        scale: [3.5, 3, 1],
        color: 0x0000ff
    },
    {
        id: getRandomId(),
        primitiveId: 'rr',
        position: [-100 + startX, 122, 850],
        rotation: [-Math.PI / 2, 0, 0],
        scale: [3.5, 3, 1],
        color: 0x0000ff
    },
    {
        id: getRandomId(),
        primitiveId: 'rr',
        position: [400 + startX, 122, 850],
        rotation: [-Math.PI / 2, 0, 0],
        scale: [3.5, 3, 1],
        color: 0x0000ff
    },
    {
        id: getRandomId(),
        primitiveId: 'rr',
        position: [900 + startX, 122, 850],
        rotation: [-Math.PI / 2, 0, 0],
        scale: [3.5, 3, 1],
        color: 0x0000ff
    },
    {
        id: getRandomId(),
        primitiveId: 'rr',
        position: [1400 + startX, 122, 850],
        rotation: [-Math.PI / 2, 0, 0],
        scale: [3.5, 3, 1],
        color: 0x0000ff
    },


];

const getPartData = (quant) => {
    let result = [];
    for (var i = 0; i < quant; i++) {
        result = result.concat(generateData(i * partWidth));
    }
    return result;
}

export {getPartData};
