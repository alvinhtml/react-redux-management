import React, {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'


//引入下拉菜单组件
import {Dropmenu, Droptool} from '../../components/dropdown'

//引入组件
import {PageList, ListSearcher, ListConfiger, ListHeader, ListBody} from '../../components/common'

//引入action类型常量名
import {
	RESIZE_TH_WIDTH,
	UPDATE_LIST_CONFIGS,
	CHANGE_LIST_CHECKBOX
} from '../../constants'

//引入Action创建函数
import {ActionCreator, getAdminList, makePost} from '../../actions/actions'

class TermhomeUI extends Component {
	render () {
		return (
			<div className="main-box">
				<div className="page-bar clear">
	                <div className="page-bar-left">终端统计列表</div>
	                <div className="page-bar-right"><i className="icon-calendar"></i> Wed Aug 10 2016 10:51:20 GMT+0800</div>
	            </div>

            </div>
		)
	}
}

export const Termhome = connect(
	(state) => {
		return state.termList.statistics
	},
	(dispatch, ownProps) => {
		return {
			getTermStatistics: (o) => {
				//dispatch(getAdminList(o))
			}
		};
	}
)(TermhomeUI)
