import React from 'react'
import adverImg from '../imgs/小龙虾广告.webp'

const imgStyle = {width:'100%',height:'100%'}
export default function Advertising() {
    console.log(adverImg)
    return (
        <img src={adverImg} alt="广告虚位以待" style={imgStyle}/>
    )
}