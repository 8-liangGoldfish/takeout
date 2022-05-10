/**
 * 判断是否是数组或类数组
 */
export default function isArrayable(e){
    if(!e) return false
    return typeof e[Symbol.iterator] === 'function'
}