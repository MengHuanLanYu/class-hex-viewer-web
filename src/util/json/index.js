export function format(data) {
    return formatJSON({}, data);
}

/**
 * 格式化对象
 * @param list
 * @param data
 * @returns {*}
 */
function formatJSON(info, data) {
    for (let name in data) {
        if (name.indexOf('_') === -1 && name.indexOf('expand') === -1) {
            let n = Object.assign({}, data[name]);
            if (name === 'attributes') {
                info['attributesCount'] = n.attributesCount;
                info[name] = {
                    _size: n._size,
                    _offset: n._offset,
                    attributeInfoList: n.attributeInfoList,
                    expand: false
                };
            } else {
                info[name] = n;
            }
        }
    }
    return info;
}