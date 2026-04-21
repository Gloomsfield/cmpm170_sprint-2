export function deserializeObjectLayer(tiledmap, objectLayerName) {
    const objectLookup = deserializeTiledObjects(tiledmap);

    return tiledmap.getObjectLayer(objectLayerName).objects.map( object => ({
        name: object.name,
        x: object.x,
        y: object.y,
        properties: deserializeCustomProperties(objectLookup, object)
    }));
}

function deserializeCustomProperties(objectLookup, object) {
    const deserializedProperties = {};

    for (const customProperty of object.properties ?? []) {
        deserializedProperties[customProperty.name] = deserializeCustomProperty(objectLookup, customProperty);
    }

    return deserializedProperties;
}

function deserializeCustomProperty(objectLookup, customProperty) {
    switch(customProperty.type) {
        case 'file':
            throw new Error('File type not supported in map import');
        case 'object':
            return objectLookup[customProperty.value];
        default:
            return customProperty.value;
    }
}

export function deserializeTiledObjects(tiledmap) {
    const objRet = {};

    for (const tiledObj of tiledmap.getObjectLayerNames().flatMap( name => tiledmap.getObjectLayer(name).objects)) {
        objRet[tiledObj.id] = tiledObj;
    }

    return objRet;
}
