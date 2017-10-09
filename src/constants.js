/*!
 * Action 常量
 *
 * Action 常量命名规范
 * 以动词开头 [GET_, POST_, HIDE_, SHOW_, TOGGLE_, ADD_, EDIT_, REMOVE_, SET_]
 *
 */

export const ERROR = 'ERROR'
export const SUCCESS = 'SUCCESS'


//fetch
export const REQUESTPOST = 'REQUESTPOST'
export const RECEIVEPOST = 'RECEIVEPOST'
export const REQUESTGET = 'REQUESTGET'
export const RECEIVEGET = 'RECEIVEGET'

//common
export const GET_AUTH_INFO = 'GET_AUTH_INFO'

//login
export const POST_LOGIN = 'POST_LOGIN'
export const GET_LOGOUT = 'GET_LOGOUT'

//list config
export const CHANGE_COLUMN = 'CHANGE_COLUMN'
export const UPDATE_LIST_CONFIGS = 'UPDATE_LIST_CONFIGS'

//admin list
export const GET_ADMIN_LIST = 'GET_ADMIN_LIST'
export const SET_ADMIN_CONFIG = 'SET_ADMIN_CONFIG'


//drag
export const RESIZE_TH_WIDTH = 'RESIZE_TH_WIDTH'
export const RESIZE_TH_ING = 'RESIZE_TH_WIDTH'
