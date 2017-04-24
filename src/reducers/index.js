//利用combineReducers合并reducers
import { combineReducers } from 'redux'

//将routerReducer一起合并管理
import { routerReducer } from 'react-router-redux'

//引入reducer
import {common} from './common'
import {header} from './header'
import {list} from './list'
import {adminlist} from './adminlist'



console.log("login", common);

export default combineReducers({

	/* your reducers */
	list,
	common, //登录相关
	header, //头部相关
	adminlist, //管理员列表

    routing: routerReducer
})
