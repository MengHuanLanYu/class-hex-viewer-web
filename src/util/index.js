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
            uint8Array.forEach(item => {
                hexArray.push(item.toString(16).padStart(2, '0').toUpperCase());
                byteArray.push(String.fromCharCode(item));
            });
            resolve({hexArray, byteArray});
        };
        readerHex.readAsArrayBuffer(file);
    });
}