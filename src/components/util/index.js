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