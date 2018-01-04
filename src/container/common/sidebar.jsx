import React, { Component } from 'react'

import {
	Link
} from 'react-router-dom'

import {
	connect
} from 'react-redux'

//引入cookie操作库
import Cookies from 'js-cookie'


class SidebarUI extends Component {

	constructor(props) {
		super(props)

		this.sidebar = Cookies.get("sidebar") || "opened"

		//ES6 类中函数必须手动绑定
		this.toggleEvent = this.toggleEvent.bind(this)
	}


	toggleEvent() {
		const manageElement = document.getElementById("manage")

		this.sidebar = this.sidebar === "opened" ? "closed" : "opened"

		manageElement.className = "manage " + this.sidebar

		Cookies.set("sidebar", this.sidebar, { path: '/' })
	}

	render() {
        return (
            <div className="sidebar-box">
	            <nav>
					<div className="sidebar-toggle" onClick={this.toggleEvent}><i className="icon-menu"></i></div>
	                <ul className="navigate">
	                    <li className="nav-item"><Link to="/home" className="nav-link"><i className="icon-home"></i><span className="text">首页</span></Link></li>
	                    <li className="nav-item"><Link to="/ou" className="nav-link"><i className="icon-organization"></i><span className="text">部门列表</span><span className="arrow"></span></Link></li>
						<li className="nav-item"><Link to="/term" className="nav-link"><i className="icon-support"></i><span className="text">终端列表</span><span className="arrow"></span></Link></li>
						<li className="nav-item"><Link to="/admin" className="nav-link"><i className="icon-user"></i><span className="text">管理员列表</span><span className="arrow"></span></Link></li>
	                    <li className="nav-item open"><Link to="/home" className="nav-link"><i className="icon-pie-chart"></i><span className="text">统计视图</span><span className="arrow"></span></Link>
	                        <ul className="sub-nav">
	                            <li className="nav-item"><Link to="/home" className="nav-link">终端统计视图</Link></li>
	                            <li className="nav-item"><Link to="/home" className="nav-link">VLAN视图</Link></li>
	                            <li className="nav-item"><Link to="/home" className="nav-link">网终拓扑图</Link></li>
	                            <li className="nav-item"><Link to="/home" className="nav-link">物理位置</Link></li>
	                        </ul>
	                    </li>
	                    <li className="nav-item"><Link to="/home" className="nav-link"><i className="icon-support"></i><span className="text">入网策略</span><span className="arrow"></span></Link></li>
	                    <li className="nav-item"><Link to="/home" className="nav-link"><i className="icon-credit-card"></i><span className="text">资产报告</span><span className="arrow"></span></Link></li>
	                    <li className="nav-item"><Link to="/home" className="nav-link"><i className="icon-equalizer"></i><span className="text">入网设置</span><span className="arrow"></span></Link></li>
	                    <li className="nav-item"><Link to="/home" className="nav-link"><i className="icon-settings"></i><span className="text">系统设置</span><span className="arrow"></span></Link></li>
	                </ul>
	            </nav>
	        </div>
        );
    }

}

export const Sidebar = connect(
	(state) => {
		return state.common
	},
	(dispatch, ownProps) => {
		return {
			submit: (o) => {
				//dispatch(loginFetch({email, password},'/common'))
			}
		};
	}
)(SidebarUI)
