import request from '../util/request';

/**
 * 上传文件
 * @param data
 * @returns {*}
 */
export function uploadFile(data) {
    return request.post('api/parsing', data);
}