import React, { Component } from 'react';

import {
	Link
} from 'react-router';

import {
	createStore
} from 'redux';

import {
	connect
} from 'react-redux';



export class Sidebar extends Component {

	render () {
        return (
            <div className="sidebar-box">
	            <nav>
	                <ul className="navigate">
	                    <li className="nav-item"><Link to="/home" className="nav-link"><i className="icon-home"></i><span className="text">首页</span></Link></li>
	                    <li className="nav-item"><Link to="/home" className="nav-link"><i className="icon-organization"></i><span className="text">部门视图</span><span className="arrow"></span></Link></li>
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
	                    <li className="nav-item"><Link to="/admin/list" className="nav-link"><i className="icon-user"></i><span className="text">管理员列表</span><span className="arrow"></span></Link></li>
	                    <li className="nav-item"><Link to="/home" className="nav-link"><i className="icon-equalizer"></i><span className="text">入网设置</span><span className="arrow"></span></Link></li>
	                    <li className="nav-item"><Link to="/home" className="nav-link"><i className="icon-settings"></i><span className="text">系统设置</span><span className="arrow"></span></Link></li>
	                </ul>
	            </nav>
	        </div>
        );
    }

}
