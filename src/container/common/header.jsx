import React, { Component } from 'react';

import {
	Link
} from 'react-router';

import {
	connect
} from 'react-redux';

//引入下拉菜单组件
import {Dropdown, Dropmenu} from '../../components/dropdown'


//引入Action创建函数
import {logoutFetch} from '../../actions/actions'

class HeaderUI extends Component {

	render () {

		const {reminds, remindClickEvent, messages, messagesClickEvent, tasks, tasksClickEvent, adminActions, adminActionsClickEvent, admin, logined} = this.props
			//console.log("8.1", common);

		if(logined !== true){
			//this.context.router.push("/")
		}

        return (
            <div className="header">
	            <div className="logo-box">
	                <a><span>hua</span>foun</a>
	            </div>
	            <div className="head-tools-box">
	                <ul className="head-tools">
	                    <li>
							<Dropdown icon="icon-bell" badge="6" badgeColor="teal">
								<Dropmenu options={reminds} clickEvent={remindClickEvent} />
							</Dropdown>
	                    </li>
	                    <li className="dropdown">
	                        <Dropdown icon="icon-envelope-open" badge="27" badgeColor="red">
								<Dropmenu options={messages} clickEvent={messagesClickEvent} />
							</Dropdown>
	                    </li>
	                    <li className="dropdown">
							<Dropdown icon="icon-calendar" badge="3" badgeColor="green">
								<Dropmenu options={tasks} clickEvent={tasksClickEvent} />
							</Dropdown>
	                    </li>
	                    <li className="dropdown">
	                        <a className="dropdown-toggler"><span className="avatar"><img src={admin.avatar} /></span> {admin.name}</a>
	                        <div className="dropdown-main dropdown-menu dropdown-right">
								<Dropmenu options={adminActions} clickEvent={adminActionsClickEvent} />
	                        </div>
	                    </li>
	                </ul>
	            </div>
	        </div>
        );
    }

}




export const Header = connect(
	(state) => {
		return {...state.header, ...state.common}
	},
	(dispatch, ownProps) => {
		return {
			remindClickEvent: (value) => {
				console.log("header remind click event",value)
			},
			messagesClickEvent: (value) => {
				console.log("header message click event",value)
			},
			tasksClickEvent: (value) => {
				console.log("header tasks click event",value)
			},
			adminActionsClickEvent: (value) => {
				console.log("header admin click event",value)
				switch (value) {
					case "3":
						dispatch(logoutFetch({a:1}, '/common'))
						break;
					default:

				}
			}
		};
	}
)(HeaderUI)
