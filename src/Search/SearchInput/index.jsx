import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect,useContext,useState } from 'react'
import { UserContext } from '../../App'
import getRandomElement from '../../Common/getRandomElement'
import './index.css'

//FontAwesomeIcom style
const fontSearchStyle={
    position: 'absolute',
    fontSize: '2rem',
    color: '#aaa',
    top: '.5rem',
    left: '2.5rem'
}

//模拟发请求-获取用户喜欢的外卖
function remoteGetUserFavorite(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(['舌尖大师武大店','鱼拿酸菜鱼','潮牛壹号火锅米粉','李富贵和刘桂香的伤心牛腩煲'])
        },200)
    })
}

//模拟发请求-获取系统推荐的外卖
function remoteGetSuggestedArray(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(['蔡林记','正宗桂林米粉','二食堂山东煎饼','天下第一烤冷面','一点点'])
        },200)
    })
}

export default function SearchInput(props) {
    //用户喜爱的店铺
    const [favors,setFavors] = useState([''])
    //获取系统推荐的店铺
    const [suggestedArray,setSuggestedArray] = useState([''])
    //搜索框中推荐给用户的店铺
    const [suggested,setSuggested] = useState('')

    const { sessionID } = useContext(UserContext)
    
    useEffect(()=>{ //获取用户喜爱店铺的effect
        remoteGetUserFavorite().then(favors=>{
            console.log(favors)
            setFavors(favors)
        })
    },[sessionID])

    useEffect(()=>{ //获取系统推荐的店铺
        remoteGetSuggestedArray().then(res=>{
            setSuggestedArray(res)
        })
    },[sessionID])

    useEffect(()=>{ //搜索框推荐给用户的店铺
        var timer = setInterval(()=>{
            setSuggested(getRandomElement(suggestedArray))
        },2000)
        return ()=>{
            clearInterval(timer)
        }
    })

    return (
        <div>
            <div className='search-wrapper'>
                <FontAwesomeIcon icon='search' style={fontSearchStyle}/>
                <input type='text'/>
                {/* 在搜索框中根据用户喜好 滚动的推荐店铺，input无value时，作为搜索的值 */}
                <span>{suggested}</span>
                <button>搜索</button>
            </div>
            <ul className='favorite-list'>
                {favors.map((v)=>
                    <li key={`favor-${v}`}>{v}</li>
                )}
            </ul>
        </div>
    )
}