import React,{ Component, createContext } from 'react'
import Header from './Header'
import Search from './Search'
import Advertising from './Advertising'
import TagTable from './TagTable'
import ShopList from './ShopList'

import './App.css'

//引入fontawesome-react
import fontawesome from '@fortawesome/fontawesome'
import { faMapMarkerAlt,faAngleRight,faSearch } from '@fortawesome/fontawesome-free-solid/'

fontawesome.library.add(faMapMarkerAlt,faAngleRight,faSearch)


//用户对象因为在大多数组件都要用到，所以使用context，由App的state.user维护其value
export const UserContext = createContext({sessionID:''})

export class App extends Component{
    state={
        user:{
            sessionID:'1'
        }
    }
    render(){
        const {user} = this.state
        return (
            <UserContext.Provider value={user}>
                <div id='app'>
                    <div id="header-area">
                        <Header />
                    </div>
                    <div id="search-area">
                        <Search />
                    </div>
                    <div id="advertising-area">
                        <Advertising />
                    </div>
                    <div id="tag-table-area">
                        <TagTable />
                    </div>
                    <div id="shop-list-area">
                        <ShopList />
                    </div>
                </div>
            </UserContext.Provider>
        )
    }
}