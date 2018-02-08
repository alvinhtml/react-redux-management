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

class TermViewUI extends Component {

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
					<div className="col-grid12 term-view-strong">
						<ul className="lf-box">
							<li className="view-number">
                                <a href="/">终端总数<br/> <span className="chunk-num">1</span> <span className="chunk-num">6</span> <span className="chunk-num">8</span> <span className="chunk-num">2</span> <span className="chunk-num">1</span></a>
                            </li>
                            <li className="view-number">
                                <a href="/">在线终端<br/> <span className="chunk-num">9</span> <span className="chunk-num">8</span> <span className="chunk-num">3</span> <span className="chunk-num">1</span></a>
                            </li>
                            <li className="view-number">
                                <a href="/">合规终端<br/> <span className="chunk-num">4</span> <span className="chunk-num">2</span> <span className="chunk-num">5</span></a>
                            </li>
                            <li className="view-number">
                                <a href="/">告警终端<br/> <span className="chunk-num">7</span> <span className="chunk-num">3</span></a>
                            </li>
						</ul>
						<div className="rf-box">
							<div className="term-strong-box active">
								<div className="row term-circle-row">
									<div className="col-grid12 text-center">
										<svg width="220" height="220">
											<circle cx="50%" cy="50%" r="28%" className="view-circle-border"></circle>
                                            <circle cx="50%" cy="50%" r="46%" className="view-circle-border2"></circle>
											<circle cx="50%" cy="50%" r="32%" className="view-circle"></circle>
											<circle cx="50%" cy="50%" r="20%" className="view-circle2"></circle>
											<foreignObject x="0" y="50%" width="100%" height="30px" className="view-circle-text">
									            <div className="color-green"> &nbsp; 98<span>%</span></div>
									        </foreignObject>
                                            <text x="50%" y="60%" className="view-circle-textlittle">合格率 </text>
										</svg>
									</div>
									<div className="col-grid12 text-center">
										<svg width="220" height="220">
                                            <circle cx="50%" cy="50%" r="28%" className="view-circle-border"></circle>
                                            <circle cx="50%" cy="50%" r="46%" className="view-circle-border2"></circle>
											<circle cx="50%" cy="50%" r="32%" className="view-circle"></circle>
											<circle cx="50%" cy="50%" r="20%" className="view-circle2"></circle>
											<foreignObject x="0" y="50%" width="100%" height="30px" className="view-circle-text">
									            <div className="color-red"> &nbsp; 3<span>%</span></div>
									        </foreignObject>
                                            <text x="50%" y="60%" className="view-circle-textlittle">告警率 </text>
										</svg>
									</div>
								</div>
								<div className="row">
									<div className="col-span6 view-number">
                                        <a href="">在线终端 <span className="chunk-num">9</span> <span className="chunk-num">2</span> <span className="chunk-num">4</span> <span className="chunk-num">3</span> </a>
									</div>
									<div className="col-span6 view-number">
										<a href="">离线终端 <span className="chunk-num">6</span> <span className="chunk-num">1</span> <span className="chunk-num">4</span> <span className="chunk-num">3</span> </a>
									</div>
								</div>
							</div>
							<div className="term-strong-box"></div>
							<div className="term-strong-box"></div>
						</div>
					</div>
					<div className="col-grid6 view-where-line">
                        <dl className="clear">
                            <dt>需要安装客户端终端<span>721</span></dt>
                            <dd><a href="/">已安装<span>235</span></a></dd>
                            <dd><a href="/">未安装<span className="badge red">34</span></a></dd>
                            <dd><a href="/">客户端在线<span className="badge green">345</span></a></dd>
                            <dd><a href="/">客户端离线<span>33</span></a></dd>
                        </dl>
                        <dl className="clear" style={{display:'none'}}>
                            <dd><a href="/">无效终端<span className="badge blue">2465</span></a></dd>
                            <dd><a href="/">普通终端<span className="badge blue">23</span></a></dd>
                        </dl>
                        <dl className="clear">
                            <dt>需要注册终端<span>3266</span></dt>
                            <dd><a href="/">未注册<span>345</span></a></dd>
                            <dd><a href="/">已注册<span className="badge green">469</span></a></dd>
                            <dd><a href="/">待审核<span className="badge yellow">178</span></a></dd>
                            <dd><a href="/">已审核<span>22</span></a></dd>
                        </dl>
                        <dl className="clear">
                            <dt>可信终端<span className="badge green">13561</span></dt>
                            <dd><a href="/">可信过期<span>71</span></a></dd>
                            <dd><a href="/">普通终端<span>241</span></a></dd>
                        </dl>
                        <dl className="clear">
                            <dd><a href="/">IP已绑定<span className="badge teal">265</span></a></dd>
                            <dd><a href="/">IP未绑定<span>23</span></a></dd>
                        </dl>
					</div>
					<div className="col-grid6 view-where-line">
                        <dl className="clear" style={{display:'none'}}>
                            <dd><a href="/">告警终端<span className="badge red">65</span></a></dd>
                            <dd><a href="/">正常终端<span className="badge green">12432</span></a></dd>
                        </dl>
                        <dl className="clear">
                            <dd><a href="/">物理机<span>23677</span></a></dd>
                            <dd><a href="/">虚拟机<span className="badge yellow">23</span></a></dd>
                        </dl>
                        <dl className="clear">
                            <dt>需要抓取指纹终端<span>3266</span></dt>
                            <dd><a href="/">未抓取<span>345</span></a></dd>
                            <dd><a href="/">已抓取<span>469</span></a></dd>
                            <dd><a href="/">有指纹<span className="badge green">178</span></a></dd>
                            <dd><a href="/">无指纹<span>22</span></a></dd>
                            <dd><a href="/">指纹正常<span>178</span></a></dd>
                            <dd><a href="/">指纹违规<span className="badge red">22</span></a></dd>
                        </dl>
                        <dl className="clear">
                            <dd><a href="/">有责任人<span>15673</span></a></dd>
                            <dd><a href="/">无责任人<span>234</span></a></dd>
                        </dl>
                        <dl className="clear">
                            <dt>需要检查规范终端<span>3638</span></dt>
                            <dd><a href="/">未检查<span>15673</span></a></dd>
                            <dd><a href="/">成功<span>234</span></a></dd>
                            <dd><a href="/">失败<span className="badge yellow">15673</span></a></dd>
                            <dd><a href="/">告警<span className="badge red">234</span></a></dd>
                        </dl>
					</div>
				</div>
                <div className="row" style={{paddingTop:"4px"}}>
                    <div className="col-grid6 term-view-largetype bg-blue">
                        <div><i className="icon-screen-desktop"></i></div>
                        <strong>17642</strong>
                        <span>用户设备</span>
                    </div>
                    <div className="col-grid6 term-view-largetype bg-green">
                        <div><i className="icon-drawer"></i></div>
                        <strong>17642</strong>
                        <span>网终设备</span>
                    </div>
                    <div className="col-grid6 term-view-largetype bg-blue">
                        <div><i className="icon-film"></i></div>
                        <strong>17642</strong>
                        <span>服务器</span>
                    </div>
                    <div className="col-grid6 term-view-largetype bg-teal">
                        <div><i className="icon-social-instagram"></i></div>
                        <strong>17642</strong>
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

                <div className="row">

                </div>
            </div>
        </div>)
    }
}

export const TermView = connect((state) => {
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
})(TermViewUI)
