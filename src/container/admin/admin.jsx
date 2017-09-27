import React, {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'


//引入下拉菜单组件
import {Dropmenu, Droptool} from '../../components/dropdown'

//引入组件
import {PageList, ListSearcher, ListConfiger, ListHeader, ListBody} from '../../components/common'

//引入action类型常量名
import {RESIZE_TH_WIDTH} from '../../constants'

//引入Action创建函数
import {ActionCreator, getAdminList} from '../../actions/actions'

class AdminListUI extends Component {

	componentWillMount() {
        this.props.getList({
			page: 2,
			limit: this.props.configs.limit
		});
    }

	render() {
		const {tools, list, count, configs, page} = this.props
		const {resizeThEvent, getList, toolsClickEvent, setSearchMode, changeLimitEvent, changeColumnEvent, orderbyEvent} = this.props
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
                            <ListSearcher search="search..." getList={getList} searchMode={configs.searchMode} setSearchMode={setSearchMode} />
                        </div>
                        <div className="olist-header-r">
                            <Link data-content="刷新" to="/admin/list"  className="tools bg-teal ititle"><i className="icon-refresh"></i></Link>
                            <Link data-content="新建" to="/admin/form" className="tools bg-teal ititle"><i className="icon-plus"></i></Link>
                            <ListConfiger changeLimitEvent={changeLimitEvent} changeColumnEvent={changeColumnEvent} page={page}  column={configs.column} limit={configs.limit}  />
                        </div>
                    </div>
					<div id="listTable" className="olist-main">
                        <table className="olist-table" id="olist_table">
							<ListHeader orderbyEvent={orderbyEvent} resizeThEvent={resizeThEvent} configs={configs} />
                            <ListBody list={list} column={configs.column} />
                        </table>
                    </div>
					<PageList getList={getList} count={parseInt(count)} limit={parseInt(configs.limit)} page={parseInt(page)}  />
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
		return {
			resizeThEvent: (e, configs) => {
				console.log(ActionCreator)
				dispatch(ActionCreator(RESIZE_TH_WIDTH, {
					resizeing: true,
					resize_column: configs.column,
					resize_path: configs.listPath,
					resize_key: e.currentTarget.getAttribute("data-key"),
					resize_clientX: e.clientX
				}, '/common'))
				e.stopPropagation()
			},
			getList: (o) => {
				dispatch(getAdminList(o, '/adminlist'))
			},
			toolsClickEvent: (v) => {
				//
			},
			orderbyEvent: (v) => {
				//
			},
			setSearchMode: (v) => {
				//
			},
			changeLimitEvent: (v) => {
				//
			},
			changeColumnEvent: (v) => {
				//
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
