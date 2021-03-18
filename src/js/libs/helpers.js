const getMaxHeight = (columns) => {
    let maxHeight = 0;

    columns.forEach((item) => {
        let currentHeight = item.clientHeight;
        if ( currentHeight > maxHeight) maxHeight = currentHeight;
    });

    return maxHeight;
};

const _getMaxHeight = getMaxHeight;
export { _getMaxHeight as getMaxHeight };