import { useState, useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UserContext } from '../App'
import './index.css'

//模拟请求获得的数据
function getGeoPosition(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('武汉大学信息学部八舍')
        },200)
    })
}

// function getAddressFromSession(sessionID){
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             resolve(['武汉大学信息学部八舍','中山大学北校区北苑宾馆'])
//         },500)
//     })
// }

export default function Header(props) {
    const [addr,setAddr] = useState('未获取定位')
    const {sessionID} = useContext(UserContext)

    useEffect(()=>{
        getGeoPosition().then(addrText=>{
            setAddr(addrText)
        })
    },[sessionID])

    //通过h5 获取用户地理位置
    var handleGetUserPositionH5 = ()=>{
        getGeoPosition().then(addrText=>{
            setAddr(addrText)
        })
    }
    //通过查询用户历史地址设置(路由跳转)-暂时没做
    var handleGetUserPositionFromSession = function(){
        window.alert("路由跳转")
    }

    return (
        <div className='header'>
            <h3>外卖</h3>
            <div>
                <FontAwesomeIcon icon='map-marker-alt' color='black' onClick={handleGetUserPositionH5}/>
                <span>{addr}</span>
                <FontAwesomeIcon icon='angle-right' onClick={handleGetUserPositionFromSession}/>
            </div>
        </div>
    )
}