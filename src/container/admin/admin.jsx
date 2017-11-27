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

class AdminListUI extends Component {

	componentWillMount() {
        this.props.getList({
			page: 1
		})
    }

	render() {
		const {tools, list, count, configs, isCheckAll} = this.props
		const {
			resizeThEvent,
			setPageEvent,
			toolsClickEvent,
			setSearchMode,
			searchEvent,
			changeLimitEvent,
			changeColumnEvent,
			orderbyEvent,
			checkEvent,
			checkAllEvent
		} = this.props

		return (
			<div className="main-box">
				<div className="page-bar clear">
	                <div className="page-bar-left">管理员列表</div>
	                <div className="page-bar-right"><i className="icon-calendar"></i> Wed Aug 10 2016 10:51:20 GMT+0800</div>
	            </div>
				<div className="list-box">
					<div id="listHeader" className="olist-header clear">
                        <div className="olist-header-l">
                            <Droptool icon="icon-wrench" bgColor="bg-red">
								<Dropmenu options={tools} clickEvent={toolsClickEvent} />
                            </Droptool>
                            <ListSearcher search="search..." searchEvent={searchEvent} configs={configs} setSearchMode={setSearchMode}>
								
                            </ListSearcher>
                        </div>
                        <div className="olist-header-r">
                            <Link data-content="刷新" to="/admin/list"  className="tools bg-teal ititle"><i className="icon-refresh"></i></Link>
                            <Link data-content="新建" to="/admin/form" className="tools bg-teal ititle"><i className="icon-plus"></i></Link>
                            <ListConfiger changeLimitEvent={changeLimitEvent} changeColumnEvent={changeColumnEvent} page={configs.page}  configs={configs} />
                        </div>
                    </div>
					<div id="listTable" className="olist-main">
                        <table className="olist-table" id="olist_table">
							<ListHeader orderbyEvent={orderbyEvent} resizeThEvent={resizeThEvent} checkAllEvent={checkAllEvent} isCheckAll={isCheckAll} configs={configs} />
                            <ListBody list={list} configs={configs} checkEvent={checkEvent} />
                        </table>
                    </div>
					<PageList setPageEvent={setPageEvent} count={parseInt(count)} configs={configs} />
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



		const updateConfigs = (configs) => {
			makePost('/api/setting/list_configs', {
				listPath: configs.listPath,
				configs: JSON.stringify(configs)
			})
		}
		return {
			getList: (o) => {
				dispatch(getAdminList(o))
			},
			toolsClickEvent: (v) => {
				//
			},
			//排序
			orderbyEvent: (v, key, configs) => {
				let column = configs.column

				for (let i = 0; i < column.length; i++) {
					console.log(key, i)
					if (column[i].order) {
						if (i == key) {
							column[i].order = v
						} else {
							column[i].order = 'order'
						}
					}
				}

				dispatch(ActionCreator(UPDATE_LIST_CONFIGS, {
					column
				}, 'adminlist'))

				updateConfigs(configs)

				dispatch(getAdminList({
					order: column[key].key + ',' + v
				}))
			},
			//全选
			checkAllEvent: (element) => {
				dispatch(ActionCreator(CHANGE_LIST_CHECKBOX, {
					isCheckAll: element.checked
				}, 'adminlist'))
			},
			//单选
			checkEvent: (e, element, id) => {
				dispatch(ActionCreator(CHANGE_LIST_CHECKBOX, {
					//isCheckAll: element.checked
					id,
					checked: element.checked
				}, 'adminlist'))
			},
			//搜索模式
			setSearchMode: (modeValue) => {
				dispatch(ActionCreator(UPDATE_LIST_CONFIGS, {
					searchMode: modeValue
				}, 'adminlist'))
			},
			//搜索
			searchEvent: (search) => {
				dispatch(getAdminList({
					search
				}))
			},
			//改变页码
			setPageEvent: (page) => {
				dispatch(ActionCreator(UPDATE_LIST_CONFIGS, {
					page
				}, 'adminlist'))
				dispatch(getAdminList({
					page
				}))
			},
			//改变每页显示条数
			changeLimitEvent: (v, configs) => {

				configs.limit = parseInt(v)

				dispatch(ActionCreator(UPDATE_LIST_CONFIGS, {
					limit: v
				}, 'adminlist'))

				updateConfigs(configs)

				dispatch(getAdminList({
					page: configs.page,
					limit: configs.limit
				}))

			},
			//改变表格列宽
			changeColumnEvent: (key, configs) => {

				let column = configs.column

				column[key].visibility = column[key].visibility ? false : true

				dispatch(ActionCreator(UPDATE_LIST_CONFIGS, {
					column
				}, 'adminlist'))

				updateConfigs(configs)
			}
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
