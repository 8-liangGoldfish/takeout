import isArrayable from './isArrayable'
export default function getRandomElement(array){
    if(!isArrayable(array)){
        throw new TypeError('input must be arrayable')
    }
    var len = array.length
    return array[Math.round(Math.random()*len-0.5)]
}