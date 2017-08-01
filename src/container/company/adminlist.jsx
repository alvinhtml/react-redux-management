import React, { Component } from 'react'

import {
	Link
} from 'react-router'

import {
	connect
} from 'react-redux'

//引入Action创建函数
import {loginFetch} from '../../actions/actions'

//引入action类型常量名
import {
    REQUESTPOST,
    RECEIVEPOST
} from '../../constants'

import {Pagebar, ListActioner, ListSearcher, ListConfiger} from '../../components/common'


class AdminlistUI extends Component {
	render() {

		const {logo, logoname, logined, version, error, message, onSubmit, onKeyPress} = this.props

		let emailInput, passwordInput

		return (
			<div className="min-box">
				<Pagebar title=""><i className="icon-calendar"></i> Wed Aug 10 2016 10:51:20 GMT+0800</Pagebar>
				<div className="list-box">
					<div id="olist_header" className="olist-header clear">
                        <div className="olist-header-l">
                            // <ListActioner>
							// 	<li data-val="0"><i class="icon-close"></i><span class="itext">删除</span></li>
		                    //     <li data-val="1"><i class="icon-layers"></i><span class="itext">合并</span></li>
                            // </ListActioner>
                            // <ListSearcher />
                        </div>
                        <div className="olist-header-r">
                            <Link data-content="刷新" to="/admin/list"  className="olist-tool bg-teal ititle"><i className="icon-refresh"></i></Link>
                            <Link data-content="新建" to="/admin/form" className="olist-tool bg-teal ititle"><i className="icon-plus"></i></Link>
                            //<ListConfiger />
                        </div>
                    </div>
					<div id="OListTable" className="olist-main">
                        <table className="olist-table" id="olist_table">
                            <thead id="olist_thead">
                                <tr>
                                    <th className="row-checkbox"><input type="checkbox" ref="ival_checkbox_all" /></th>

                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody id="olist_tbody" className="olist-body">

                            </tbody>
                        </table>
                    </div>
				</div>
            </div>
		)
	}
}

export const Adminlist = connect(
	(state) => {
		return state.adminlist
	},
	(dispatch, ownProps) => {
		return {
			onSubmit: (email, password) => {
				dispatch(loginFetch({email, password},'/common'))
			},
			onKeyPress: (event, email, password) => {
				if(event.charCode === 13){
					dispatch(loginFetch({email, password},'/common'))
				}
			}
		};
	}
)(AdminlistUI)
