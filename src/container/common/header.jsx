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



export class Header extends Component {

	render () {
        return (
            <div className="header">
	            <div className="logo-box">
	                <a><span>hua</span>foun</a>
	                <div className="sidebar-toggler"><span></span></div>
	            </div>
	            <div className="head-tools-box">
	                <ul className="head-tools">
	                    <li className="dropdown">
	                        <a className="dropdown-toggler"><i className="icon-bell"></i><span className="badge teal">6</span></a>
	                        <div className="dropdown-main dropdown-menu dropdown-dark">
	                            <ul>
	                                <li>menu 1</li>
	                                <li>menu 2</li>
	                            </ul>
	                        </div>
	                    </li>
	                    <li className="dropdown">
	                        <a className="dropdown-toggler"><i className="icon-envelope-open"></i><span className="badge red">27</span></a>
	                        <div className="dropdown-main dropdown-menu">
	                            <ul>
									<li>menu 1</li>
	                                <li>menu 2</li>
	                            </ul>
	                        </div>
	                    </li>
	                    <li className="dropdown">
	                        <a className="dropdown-toggler"><i className="icon-calendar"></i><span className="badge green">3</span></a>
	                        <div className="dropdown-main dropdown-menu">
	                            <ul>
									<li>menu 1</li>
	                                <li>menu 2</li>
	                            </ul>
	                        </div>
	                    </li>
	                    <li className="dropdown">
	                        <a className="dropdown-toggler"><span className="avatar"><img src="/public/images/admin.png" /></span> Admin</a>
	                        <div className="dropdown-main dropdown-menu">
								<ul>
									<li>menu 1</li>
	                                <li>menu 2</li>
	                            </ul>
	                        </div>
	                    </li>
	                </ul>
	            </div>
	        </div>
        );
    }

}
