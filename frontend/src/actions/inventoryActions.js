
export const actionTypes = {
    ADD_INVENTORY_SECTION: 'ADD_INVENTORY_SECTION',
    REMOVE_INVENTORY_SECTION: 'REMOVE_INVENTORY_SECTION',
    EDIT_INVENTORY_SECTION: 'EDIT_INVENTORY_SECTION',
    ADD_INVENTORY_ITEM: 'ADD_INVENTORY_ITEM',
    REMOVE_INVENTORY_ITEM: 'REMOVE_INVENTORY_ITEM',
    EDIT_INVENTORY_ITEM: 'EDIT_INVENTORY_ITEM'
};


export const addInventorySection = () => {
    return dispatch => {
        dispatch({
            type: actionTypes.ADD_INVENTORY_SECTION,
            value: "Section"
        });
    };
}

export const removeInventorySection = (sectionIndex) => {
    return dispatch => {
        dispatch({
            type: actionTypes.REMOVE_INVENTORY_SECTION,
            index: sectionIndex
        });
    };
}

export const editInventorySection = (sectionIndex, value) => {
    return dispatch => {
        dispatch({
            type: actionTypes.EDIT_INVENTORY_SECTION,
            index: sectionIndex,
            value
        });
    };
}

export const addInventoryItem = (sectionIndex) => {
    return dispatch => {
        dispatch({
            type: actionTypes.ADD_INVENTORY_ITEM,
            sectionIndex,
            value: {
                quantity: 1,
                name: "Item",
                description:"Such a good item",
                starred: false,
                tags: []
            }
        });
    };
}

export const removeInventoryItem = (sectionIndex, itemIndex) => {
    return dispatch => {
        dispatch({
            type: actionTypes.REMOVE_INVENTORY_ITEM,
            sectionIndex,
            itemIndex
        });
    };
}

export const editInventoryItem = (sectionIndex, itemIndex, value) => {
    return dispatch => {
        dispatch({
            type: actionTypes.EDIT_INVENTORY_ITEM,
            sectionIndex,
            itemIndex,
            value
        });
    };
}
