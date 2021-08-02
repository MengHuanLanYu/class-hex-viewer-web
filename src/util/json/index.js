/**
 * 忽略属性
 * @type {string[]}
 */
export const IGNORE_ATTRIBUTES = ['_offset', '_size', 'tag', 'expand','titleIndex'];

export function format(data) {
    return formatJSON({}, data);
}

/**
 * 得到常量池
 * @param data
 * @returns {[]}
 */
export function getConstantPool(data) {
    let listInfoList = [];
    // 先把
    data.constantPool.constantInfoList.forEach(item => {
        let valueInfo = {value: '', isReplace: false};
        if (item.tag && item.tag.description === 'constant_utf8_info') {
            valueInfo.value = item.description;
            valueInfo.isReplace = true;
        } else {
            if (item.description && item.description.indexOf('cp_info') === -1) {
                valueInfo.value = item.description;
                valueInfo.isReplace = true;
            } else {
                if (item.description) {
                    valueInfo.value = item.description.replace('cp_info ', '');
                } else {
                    let values = [];
                    Object.keys(item)
                        .filter(key => IGNORE_ATTRIBUTES.indexOf(key) === -1)
                        .forEach(key => {
                            let info = item[key];
                            if (info.description) {
                                valueInfo[key] = info.description.replace('cp_info ', '');
                                values.push(info.description.replace('cp_info ', ''));
                            }
                        });
                    valueInfo.value = values.join(':');
                }
            }

        }
        listInfoList.push(valueInfo);
    });
    listInfoList.filter(item => !item.isReplace).forEach(item => {
        item.value = fillValue(item, listInfoList);
        item.isReplace = true;
    });
    // console.log(JSON.stringify(listInfoList));
    return listInfoList;
}

/**
 * 填充值
 * @param obj
 * @param listInfoList
 * @returns {string|*}
 */
function fillValue(obj, listInfoList) {
    // console.log(obj);
    if (obj.isReplace) {
        return obj.value;
    }
    let keys = Object.keys(obj);
    if (keys.length === 2) {
        return listInfoList[parseInt(obj.value.replace('#', '')) - 1].value;
    }
    let values = [];
    keys.filter(item => item !== 'value' && item !== 'isReplace' && item !== 'bootstrapMethodAttrIndex').forEach(item => {
        let info = listInfoList[parseInt(obj[item].replace('#', '')) - 1];
        info.value = fillValue(info, listInfoList);
        obj[item] = info.value;
        info.isReplace = true;
        values.push(info.value);
    });
    return values.join(':');
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
