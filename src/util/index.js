/**
 * 数字加前缀0
 * @param prefixZero
 * @param len
 * @param num
 * @returns {*}
 */
export function prefixInt(prefixZero, len, num) {
    return (prefixZero + num).slice(-len);
}

/**
 * 读取字节
 * @param file
 * @returns {Promise<unknown>}
 */
export function readFileByte(file) {
    return new Promise(resolve => {
        let readerHex = new FileReader();
        readerHex.onload = evt => {
            let hexArrayBuffer = evt.target.result;
            let uint8Array = new Uint8Array(hexArrayBuffer);
            let hexArray = [], byteArray = [];
            uint8Array.forEach((item, index) => {
                let page = Math.floor(index / 16);
                if (!hexArray[page]) {
                    hexArray[page] = [];
                    byteArray[page] = [];
                }
                hexArray[page].push({isChecked: false, value: item.toString(16).padStart(2, '0').toUpperCase()});
                byteArray[page].push({isChecked: false, value: String.fromCharCode(item)});
            });
            resolve({hexArray, byteArray});
        };
        readerHex.readAsArrayBuffer(file);
    });
}

/**
 * 下划线转换驼峰
 * @param name
 * @returns {*}
 */
export function toHump(name) {
    return name.replace(/_(\w)/g, (all, letter) => {
        return letter.toUpperCase();
    });
}