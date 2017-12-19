import React, {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'


//引入下拉菜单组件
import {Dropmenu, Droptool} from '../../components/dropdown'

//引入弹出提示组件
import {Popup} from '../../components/popup'

//引入组件
import {Crumbs, PageList, Searcher, Configer, Theader, Tbodyer} from '../../components/common'

//引入action类型常量名
import {
	RESIZE_TH_WIDTH,
	UPDATE_LIST_CONFIGS,
	CHANGE_LIST_CHECKBOX
} from '../../constants'

//引入Action创建函数
import {ActionCreator, getAdminList, makePost} from '../../actions/actions'

class AdminListUI extends Component {

	componentWillMount() {
        this.props.getList({
			page: 1
		})
    }

	componentWillReceiveProps(nextProps) {
		//
	}
	//值修饰器
	decorater(key, value) {
		switch(key) {
			case "state":
			 	return value[key] == 1 ? <span className="state-green">启用</span> : <span className="state-red">停用</span>
			default:
				return value[key]
		}
	}
	render() {
		const {tools, actions, list, count, configs, isCheckAll} = this.props
		const {
			toolsClickEvent,
			getList,
			updateConfigs
			// resizeThEvent,
			// setPageEvent,
			// toolsClickEvent,
			// setSearchMode,
			// searchEvent,
			// changeLimitEvent,
			// changeColumnEvent,
			// orderbyEvent,
			// checkEvent,
			// checkAllEvent
		} = this.props
		return (
			<div className="main-box">
				<div className="page-bar clear">
	                <div className="page-bar-left crumbs-box">
						<div className="crumbs-first"><b>终端列表</b> / 首页</div>
						<div className="crumbs-arrow bg-orange"><i className="fa fa-angle-right"></i></div>
						<Crumbs>技术部
							<div className="crumbs-main" style={{width: "280px"}}><div className="title"><i className="fa fa-cubes"></i> 部门路径</div><span>根部门/画方科技/技术部</span></div>
						</Crumbs>
						<Crumbs>用户设备 & 交换机 ...
							<div className="crumbs-main">
								<div className="title"><i className="icon-screen-desktop"></i> 终端类型</div>
								<span>用户设备</span>
								<span>交换机</span>
								<span>网络打印机</span>
								<span>路由器</span>
								<span>交换机</span>
								<span>防火墙</span>
								<span>访问控制认证网关</span>
								<span>安全加密设备</span>
								<span>网络扫描仪</span>
								<span>网络录像机</span>
							</div>
						</Crumbs>
						<Crumbs>在线</Crumbs>
						<Crumbs>告警</Crumbs>
						<Crumbs>客户端在线</Crumbs>
	                </div>
	                <div className="page-bar-right"><i className="icon-calendar"></i> Wed Aug 10 2016 10:51:20 GMT+0800</div>
	            </div>
				<div className="list-box">
					<div id="listHeader" className="olist-header clear">
                        <div className="olist-header-l">
                            <Droptool icon="icon-wrench" bgColor="bg-red">
								<Dropmenu options={tools} clickEvent={toolsClickEvent} />
                            </Droptool>
                            <Searcher getList={getList} updateConfigs={updateConfigs} configs={configs}></Searcher>
                        </div>
                        <div className="olist-header-r">
                            <Link data-content="刷新" to="/admin/list"  className="tools bg-teal ititle"><i className="icon-refresh"></i></Link>
                            <Link data-content="新建" to="/admin/form" className="tools bg-teal ititle"><i className="icon-plus"></i></Link>
                            <Configer getList={getList} updateConfigs={updateConfigs} configs={configs} />
                        </div>
                    </div>
					<div id="listTable" className="olist-main">
                        <table className="olist-table" id="olist_table">
							<Theader getList={getList} updateConfigs={updateConfigs} configs={configs}  actions={actions} isCheckAll={isCheckAll} />
                            <Tbodyer list={list} configs={configs} actions={actions} decorater={this.decorater} />
                        </table>
                    </div>
					<PageList getList={getList} updateConfigs={updateConfigs} count={parseInt(count)} configs={configs} />
				</div>
            </div>
		)
	}
}

class AdminFormUI extends Component {
	render() {
		const {submit} = this.props
		return (
			<div className="main-box">
				<div className="page-bar clear">
	                <div className="page-bar-left">新增管理员</div>
	                <div className="page-bar-right"><i className="icon-calendar"></i> Wed Aug 10 2016 10:51:20 GMT+0800</div>
	            </div>
            </div>
		)
	}
}

export const AdminList = connect(
	(state) => {
		return state.adminlist
	},
	(dispatch, ownProps) => {

		// const updateConfigs = (configs) => {
		// 	makePost('/api/setting/list_configs', {
		// 		listPath: configs.listPath,
		// 		configs: JSON.stringify(configs)
		// 	})
		// }
		return {
			// getList: (o) => {
			// 	dispatch(getAdminList(o))
			// },
			//获取列表
			getList: (where, configs) => {
				dispatch(getAdminList(where))
			},
			//更新配置
			updateConfigs: (configs) => {
				//更新数据库配置
				makePost('/api/setting/list_configs', {
					listPath: configs.listPath,
					configs: JSON.stringify(configs)
				})
				//更新store配置
				dispatch(ActionCreator(UPDATE_LIST_CONFIGS, configs, 'adminlist'))
			},
			//checked
			// checkedEvent: (checked, action) => {
			// 	dispatch(ActionCreator(CHANGE_LIST_CHECKBOX, {
			// 		isCheckAll: checked
			// 	}, 'adminlist'))
			// },
			toolsClickEvent: (v) => {
				//
			}
			// //排序
			// orderbyEvent: (v, key, configs) => {
			// 	let column = configs.column
            //
			// 	for (let i = 0; i < column.length; i++) {
			// 		console.log(key, i)
			// 		if (column[i].order) {
			// 			if (i == key) {
			// 				column[i].order = v
			// 			} else {
			// 				column[i].order = 'order'
			// 			}
			// 		}
			// 	}
            //
			// 	dispatch(ActionCreator(UPDATE_LIST_CONFIGS, {
			// 		column
			// 	}, 'adminlist'))
            //
			// 	updateConfigs(configs)
            //
			// 	dispatch(getAdminList({
			// 		order: column[key].key + ',' + v
			// 	}))
			// },
			// //全选
			// checkAllEvent: (element) => {
			// 	dispatch(ActionCreator(CHANGE_LIST_CHECKBOX, {
			// 		isCheckAll: element.checked
			// 	}, 'adminlist'))
			// },
			// //单选
			// checkEvent: (e, element, id) => {
			// 	dispatch(ActionCreator(CHANGE_LIST_CHECKBOX, {
			// 		//isCheckAll: element.checked
			// 		id,
			// 		checked: element.checked
			// 	}, 'adminlist'))
			// },
			// //搜索模式
			// setSearchMode: (modeValue) => {
			// 	dispatch(ActionCreator(UPDATE_LIST_CONFIGS, {
			// 		searchMode: modeValue
			// 	}, 'adminlist'))
			// },
			// //搜索
			// searchEvent: (search) => {
			// 	dispatch(getAdminList({
			// 		search
			// 	}))
			// },
			// //改变页码
			// setPageEvent: (page) => {
			// 	dispatch(ActionCreator(UPDATE_LIST_CONFIGS, {
			// 		page
			// 	}, 'adminlist'))
			// 	dispatch(getAdminList({
			// 		page
			// 	}))
			// },
			// //改变每页显示条数
			// changeLimitEvent: (v, configs) => {
            //
			// 	configs.limit = parseInt(v)
            //
			// 	dispatch(ActionCreator(UPDATE_LIST_CONFIGS, {
			// 		limit: v
			// 	}, 'adminlist'))
            //
			// 	updateConfigs(configs)
            //
			// 	dispatch(getAdminList({
			// 		page: configs.page,
			// 		limit: configs.limit
			// 	}))
            //
			// },
			// //改变表格列宽
			// changeColumnEvent: (key, configs) => {
            //
			// 	let column = configs.column
            //
			// 	column[key].visibility = column[key].visibility ? false : true
            //
			// 	dispatch(ActionCreator(UPDATE_LIST_CONFIGS, {
			// 		column
			// 	}, 'adminlist'))
            //
			// 	updateConfigs(configs)
			// }
		};
	}
)(AdminListUI)


export const AdminForm = connect(
	(state) => {
		return state.adminlist
	},
	(dispatch, ownProps) => {
		return {
			submit: (o) => {
				//dispatch(loginFetch({email, password},'/common'))
			}
		};
	}
)(AdminFormUI)
