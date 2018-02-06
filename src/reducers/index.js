//利用combineReducers合并reducers
import { combineReducers } from 'redux'

//将routerReducer一起合并管理
import { routerReducer } from 'react-router-redux'

//引入reducer
import {common} from './common'
import {header} from './header'
import {adminlist} from './adminlist'
import {termlist} from './termlist'
import {oulist} from './oulist'
import {view} from './view'




export default combineReducers({
	/* your reducers */
	common, //登录相关
	header, //头部相关
	adminlist, //管理员列表
	termlist, //终端列表
	oulist, //部门列表
	view, //视图

    routing: routerReducer
})
