import React, {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'


//引入下拉菜单组件
import {Dropmenu, Droptool} from '../../components/dropdown'

//引入组件
import {Pagelist, Listsearcher, Listconfiger, Listheader} from '../../components/common'


class AdminListUI extends Component {
	render() {
		const {tools, list, count, configs, page, toolsClickEvent, setSearchMode, orderbyEvent} = this.props
		return (
			<div className="main-box">
				<div className="page-bar clear">
	                <div className="page-bar-left">管理员列表</div>
	                <div className="page-bar-right"><i className="icon-calendar"></i> Wed Aug 10 2016 10:51:20 GMT+0800</div>
	            </div>
				<div className="list-box">
					<div id="listHeader" className="olist-header clear">
                        <div className="olist-header-l">
                            <Droptool icon="icon-wrench">
								<Dropmenu options={tools} clickEvent={toolsClickEvent} />
                            </Droptool>
                            <Listsearcher search="search..." searchMode={configs.searchMode} setSearchMode={setSearchMode} />
                        </div>
                        <div className="olist-header-r">
                            <Link data-content="刷新" to="/admin/list"  className="olist-tool bg-teal ititle"><i className="icon-refresh"></i></Link>
                            <Link data-content="新建" to="/admin/form" className="olist-tool bg-teal ititle"><i className="icon-plus"></i></Link>
                            <Listconfiger column={configs.column} limit={configs.limit}  />
                        </div>
                    </div>
					<div id="listTable" className="olist-main">
                        <table className="olist-table" id="olist_table">
                            <Listheader column={configs.column} orderbyEvent={orderbyEvent} />
                            <tbody id="listTbody" className="olist-body">

                            </tbody>
                        </table>
                    </div>
					<Pagelist count={parseInt(count)} limit={parseInt(configs.limit)} page={parseInt(page)}  />
				</div>
            </div>
		)
	}
}

class AdminFormUI extends Component {
	render() {
		const {dropTools, list, count, listConfig, page, toolsClickEvent, setSearchMode} = this.props
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
			getList: (o) => {
				//dispatch(loginFetch({email, password},'/common'))
			},
			toolsClickEvent: (v) => {
				//
			},
			orderbyEvent: (v) => {
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
