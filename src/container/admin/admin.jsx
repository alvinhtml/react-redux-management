import React from 'react';

import {
	Link
} from 'react-router';

import {
	createStore
} from 'redux';

import {
	connect
} from 'react-redux';

//引入Action创建函数
import {loginFetch} from '../../actions/actions'

//引入下拉菜单组件
import {Dropmenu, Droptool} from '../../components/dropdown'

//引入组件
import {Pagelist, Listsearch, Listconf} from '../../components/common'


class AdminList_ui extends Component {
	render() {
		const {dropTools, list, count, listConfig, page, toolsClickEvent, setSearchMode} = this.props
		return (
			<div className="min-box">
				<div className="page-bar clear">
	                <div className="page-bar-left">管理员列表</div>
	                <div className="page-bar-right"><i className="icon-calendar"></i> Wed Aug 10 2016 10:51:20 GMT+0800</div>
	            </div>
				<div className="list-box">
					<div id="listHeader" className="olist-header clear">
                        <div className="olist-header-l">
                            <Droptool icon="icon-wrench">
								<Dropmenu options={dropTools} clickEvent={toolsClickEvent} />
                            </Droptool>
                            <Listsearch search="search..." searchMode={listConfig.searchMode} setSearchMode={setSearchMode} />
                        </div>
                        <div className="olist-header-r">
                            <Link data-content="刷新" to="/admin/list"  className="olist-tool bg-teal ititle"><i className="icon-refresh"></i></Link>
                            <Link data-content="新建" to="/admin/form" className="olist-tool bg-teal ititle"><i className="icon-plus"></i></Link>
                            <Listconf column={listConfig.column} limit={listConfig.limit}  />
                        </div>
                    </div>
					<div id="listTable" className="olist-main">
                        <table className="olist-table" id="olist_table">
                            <thead id="listThead">
                                <tr>
                                    <th className="row-checkbox"><input type="checkbox" onChange={} ref="ival_checkbox_all" /></th>

                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody id="listTbody" className="olist-body">

                            </tbody>
                        </table>
                    </div>
					<Pagelist count={parseInt(count)} limit={parseInt(listConf.limit)} page={parseInt(page)}  />
				</div>
            </div>
		)
	}
}

class AdminForm_ui extends Component {
	render() {
		const {dropTools, list, count, listConfig, page, toolsClickEvent, setSearchMode} = this.props
		return (
			<div className="min-box">
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

			}
		};
	}
)(AdminList_ui)


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
)(AdminForm_ui)
