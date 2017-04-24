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

import {Pagebar, listActions, ListSearch, ListConfig} from '../../components/common'


class Termlist extends Component {
	render() {

		const {logo, logoname, logined, version, error, message, onSubmit, onKeyPress} = this.props

		let emailInput, passwordInput

		return (
			<div className="min-box">
				<Pagebar title=""><i className="icon-calendar"></i> Wed Aug 10 2016 10:51:20 GMT+0800</Pagebar>
				<div className="list-box">
					<div id="olist_header" className="olist-header clear">
                        <div className="olist-header-l">
                            <Listaction>

                            </Listaction>
                            <Listsearch />
                        </div>
                        <div className="olist-header-r">
                            <Link data-content="刷新" to="/admin/list"  className="olist-tool bg-teal ititle"><i className="icon-refresh"></i></Link>
                            <Link data-content="新建" to="/admin/form" className="olist-tool bg-teal ititle"><i className="icon-plus"></i></Link>
                            <OlistConfig />
                        </div>
                    </div>
					<div id="OListTable" className="olist-main">
                        <table className="olist-table" id="olist_table">
                            <thead id="olist_thead">
                                <tr>
                                    <th className="row-checkbox"><input type="checkbox" onChange={} ref="ival_checkbox_all" /></th>

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

export const Term = connect(
	(state) => {
		return state.common
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
)(Termlist)
