import React, {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'

import Query from '../../tools/query.js'

//引入下拉菜单组件
import {Dropmenu, Droptool} from '../../components/dropdown'

//引入弹出提示组件
import {Popup} from '../../components/popup'
import {OuSelect} from '../../components/select'
import {Alert, Confirm} from '../../components/modal'
import {Radios, Radio} from '../../components/radios'

//引入组件
//import {Crumbs, PageList, Searcher, Configer, Theader, Tbodyer, Arraylist, FetchButton} from '../../components/common'

//引入action类型常量名
import {
    GET_TERM_LIST,
    UPDATE_LIST_CONFIGS,
    CHANGE_LIST_CHECKBOX,
    GET_TERM_INFO,
    POST_TERM_INFO,
    DELETE_TERM,
    UPDATE_TERM_STATE
} from '../../constants'

//引入Action创建函数
import {ActionCreator, ActionGet, ActionPost, FetchPost} from '../../actions/actions'

class TermView2UI extends Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {}

    render() {
        const {} = this.props
        const {} = this.props
        return (<div className="main-box">
            <div className="page-bar clear">
                <div className="page-bar-left crumbs-box">
                    <div className="crumbs-first"> <b>终端视图</b> / 首页</div>
                </div>
                <div className="page-bar-right">
                    <i className="icol-calendar"></i>
                    Wed Aug 10 2016 10:51:20 GMT+0800</div>
            </div>
            <div className="content-box view-box">
				<div className="row">
					<div className="col-grid12 term-view-strong term-view-strong2">
						<ul className="lf-box">
							<li className="view-number"> 终端总数<br/><strong className="color-blue">16821</strong></li>
							<li className="view-number active"> 在线终端<br/><strong className="color-green">12464</strong></li>
							<li className="view-number"> 告警终端<br/><strong className="color-red">643</strong></li>
							<li className="view-number"> 合规终端<br/><strong className="color-teal">643</strong></li>
						</ul>
						<div className="rf-box">
							<div className="term-strong-box active">
								<div className="row term-circle-row">
									<div className="col-grid12 text-center">
										<svg width="220" height="220">
											<circle cx="50%" cy="50%" r="46%" className="view-circle-border"></circle>
											<circle cx="50%" cy="50%" r="32%" className="view-circle"></circle>
											<circle cx="50%" cy="50%" r="20%" className="view-circle2"></circle>
											<foreignObject x="0" y="50%" width="100%" height="30px" className="view-circle-text">
									            <div>98<span>%</span></div>
									        </foreignObject>
                                            <text x="50%" y="60%" className="view-circle-textlittle">合格率</text>
										</svg>
									</div>
									<div className="col-grid12 text-center">
										<svg width="220" height="220">
											<circle cx="50%" cy="50%" r="46%" className="view-circle-border"></circle>
											<circle cx="50%" cy="50%" r="32%" className="view-circle"></circle>
											<circle cx="50%" cy="50%" r="20%" className="view-circle2"></circle>
											<foreignObject x="0" y="50%" width="100%" height="30px" className="view-circle-text">
									            <div>98<span>%</span></div>
									        </foreignObject>
                                            <text x="50%" y="60%" className="view-circle-textlittle">告警率</text>
										</svg>
									</div>
								</div>
								<div className="row">
									<div className="col-span6 view-number">
										在线终端<br/><strong className="color-green">12464</strong>
									</div>
									<div className="col-span6 view-number">
										离线终端<br/><strong className="color-gray">2956</strong>
									</div>
								</div>
							</div>
							<div className="term-strong-box"></div>
							<div className="term-strong-box"></div>
						</div>
					</div>
					<div className="col-grid12">
						<ul className="view-where-line2 clear">
		                    <li className="animates important bg-red lf b4" data-value="unreg">
		                        <span>未注册</span>
		                        <em>50</em>
		                    </li>
		                    <li className="animates b2 bg-blue" data-value="reged">
		                        <span>已注册</span>
		                        <em>0</em>
		                    </li>
		                    <li className="animates important bg-teal" data-value="auditing">
		                        <span>待审核</span>
		                        <em>0</em>
		                    </li>
		                    <li className="animates bg-orange" data-value="audited">
		                        <span>已审核</span>
		                        <em>0</em>
		                    </li>
		                    <li className="animates important bg-green lf" data-value="install">
		                        <span>已安装</span>
		                        <em>1</em>
		                    </li>
		                    <li className="animates bg-blue" data-value="uninstall">
		                        <span>未安装</span>
		                        <em>49</em>
		                    </li>
		                    <li className="animates bg-yellow" data-value="online">
		                        <span>客户端在线</span>
		                        <em>1</em>
		                    </li>
		                    <li className="animates bg-olive" data-value="offline">
		                        <span>客户端离线</span>
		                        <em>0</em>
		                    </li>
		                    <li className="animates important bg-green lf b2" data-value="yes">
		                        <span>可信</span>
		                        <em>387</em>
		                    </li>
		                    <li className="animates important bg-yellow" data-value="expire">
		                        <span>可信过期</span>
		                        <em>0</em>
		                    </li>
		                    <li className="animates bg-blue" data-value="no">
		                        <span>普通</span>
		                        <em>50</em>
		                    </li>
		                    <li className="animates bg-blue" data-value="yes">
		                        <span>无效</span>
		                        <em>0</em>
		                    </li>
		                    <li className="animates bg-blue" data-value="no">
		                        <span>普通</span>
		                        <em>50</em>
		                    </li>
		                    <li className="animates bg-blue" data-value="no">
		                        <span>物理机</span>
		                        <em>40</em>
		                    </li>
		                    <li className="animates important bg-orange" data-value="yes">
		                        <span>虚拟机</span>
		                        <em>10</em>
		                    </li>
		                    <li className="animates bg-blue lf" data-value="yes">
		                        <span>有责任人</span>
		                        <em>0</em>
		                    </li>
		                    <li className="animates bg-blue" data-value="no">
		                        <span>无责任人</span>
		                        <em>50</em>
		                    </li>
		                    <li className="animates bg-blue" data-value="no">
		                        <span>未抓取</span>
		                        <em>50</em>
		                    </li>
		                    <li className="animates important bg-olive" data-value="yes">
		                        <span>已抓取</span>
		                        <em>0</em>
		                    </li>
		                    <li className="animates bg-blue lf" data-value="exist">
		                        <span>有指纹</span>
		                        <em>0</em>
		                    </li>
		                    <li className="animates bg-blue" data-value="noexist">
		                        <span>无指纹</span>
		                        <em>0</em>
		                    </li>
		                    <li className="animates bg-blue" data-value="normal">
		                        <span>指纹正常</span>
		                        <em>0</em>
		                    </li>
		                    <li className="animates important bg-red" data-value="warning">
		                        <span>指纹违规</span>
		                        <em>3</em>
		                    </li>
		                </ul>
					</div>
				</div>
                <div className="row" style={{paddingTop:"14px"}}>
					<div className="col-grid6 term-view-largetype2">
                        <div className="bg-blue"><i className="icon-screen-desktop"></i></div>
                        <strong>17642</strong>
                        <span>用户设备</span>
                    </div>
                    <div className="col-grid6 term-view-largetype2">
                        <div className="bg-green"><i className="icon-drawer"></i></div>
                        <strong>356</strong>
                        <span>网终设备</span>
                    </div>
                    <div className="col-grid6 term-view-largetype2">
                        <div className="bg-blue"><i className="icon-film"></i></div>
                        <strong>5</strong>
                        <span>服务器</span>
                    </div>
                    <div className="col-grid6 term-view-largetype2">
                        <div className="bg-teal"><i className="icon-social-instagram"></i></div>
                        <strong>29443</strong>
                        <span>哑终端</span>
                    </div>
                </div>
				<div className="row" style={{paddingTop:"14px"}}>
					<div className="col-grid6 term-view-types">
						<div className="row">
							<div className="types-number"><span className="bg-teal"><i className="icon-speedometer"></i></span>交换机<strong>273</strong></div>
							<div className="types-number"><span className="bg-teal"><i className="icon-wallet"></i></span>路由器<strong>34</strong></div>
							<div className="types-number"><span className="bg-teal"><i className="icon-picture"></i></span>探针设备<strong>4</strong></div>
							<div className="types-number"><span className="bg-teal"><i className="icon-screen-tablet"></i></span>无线AP<strong>391</strong></div>
						</div>
					</div>
					<div className="col-grid6 term-view-types">
						<div className="row">
							<div className="types-number"><span className="bg-blue"><i className="icon-speedometer"></i></span>交换机<strong>273</strong></div>
							<div className="types-number"><span className="bg-blue"><i className="icon-wallet"></i></span>路由器<strong>34</strong></div>
							<div className="types-number"><span className="bg-blue"><i className="icon-picture"></i></span>探针设备<strong>4</strong></div>
							<div className="types-number"><span className="bg-blue"><i className="icon-screen-tablet"></i></span>无线AP<strong>391</strong></div>
						</div>
					</div>
					<div className="col-grid6 term-view-types">
						<div className="row">
							<div className="types-number"><span className="bg-red"><i className="icon-speedometer"></i></span>交换机<strong>273</strong></div>
							<div className="types-number"><span className="bg-red"><i className="icon-wallet"></i></span>路由器<strong>34</strong></div>
							<div className="types-number"><span className="bg-red"><i className="icon-picture"></i></span>探针设备<strong>4</strong></div>
							<div className="types-number"><span className="bg-red"><i className="icon-screen-tablet"></i></span>无线AP<strong>391</strong></div>
						</div>
					</div>
					<div className="col-grid6 term-view-types">
						<div className="row">
							<div className="types-number"><span className="bg-green"><i className="icon-speedometer"></i></span>交换机<strong>273</strong></div>
							<div className="types-number"><span className="bg-green"><i className="icon-wallet"></i></span>路由器<strong>34</strong></div>
						</div>
					</div>
				</div>

            </div>
        </div>)
    }
}

export const TermView2 = connect((state) => {
    return {
        ...state.termlist,
        typeObjectList: state.common.typeObjectList
    }
}, (dispatch, ownProps) => {

    return {
        getList: (where) => {
            // dispatch(ActionGet(GET_TERM_LIST, '/api/term/list', where, 'termlist'))
        }
    };
})(TermView2UI)
