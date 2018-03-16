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

// echarts
import echarts from 'echarts'


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

    componentWillMount() {

    }
    componentDidMount() {
        //告警事件统计
        const warningChart = echarts.init(document.getElementById('warningChart'));
        let warningOption = {
            color: ['#ffffff'],
            textStyle: {
                color: '#ffffff',
                fontSize: 14
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                // show: true,
                top: 0,
                left: 0,
                right: '70',
                bottom: 0,
                containLabel: true
            },
            xAxis: {
                show: true,
                type: 'value',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color:'#fff',
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        color: '#ffffff'
                    },
                },
                nameTextStyle: {
                    fontSize: 14
                }
            },
            yAxis: {
                type: 'category',
                data: ['无效终端', '终端规范检查失败', 'IP-MAC绑定与规定不符', 'NETBIOS名与规定不符', '主机名与规定不符', '客户端主动退网'],
                axisLine: {
                    show: true,
                    lineStyle: {
                        color:'#fff',
                    }
                },
                axisTick: {
                    show: true
                },
                splitLine: {
                    show: false
                },
                nameTextStyle: {
                    fontSize: 14
                }
            },
            series : [
                {
                    name:'告警数量',
                    type:'bar',
                    barWidth: '20%',
                    label: {
                        normal: {
                            show: true,
                            position: 'right'
                        }
                    },
                    data:[138, 52, 200, 334, 390, 330]
                }
            ]
        }
        warningChart.setOption(warningOption)
    }

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
											<circle cx="50%" cy="50%" r="46%" className="view-circle-border2"></circle>
											<circle cx="50%" cy="50%" r="32%" className="view-circle"></circle>
											<circle cx="50%" cy="50%" r="20%" className="view-circle2"></circle>
											<foreignObject x="0" y="50%" width="100%" height="30px" className="view-circle-text">
									            <div>7<span>%</span></div>
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
					<div className="col-grid12 bg-red" style={{height:'365px'}}>
                        <div id="warningChart" className="term-view-warning"></div>
					</div>
				</div>
                <div className="row" style={{paddingTop:"14px"}}>
                    <div className="col-grid8 view-where-line">
                        <dl className="clear">
                            <dt>客户端安装率统计<Popup content="需要安装客户端的终端数量"><span>721</span></Popup></dt>
                            <dd><a href="/">已安装<span>235</span></a></dd>
                            <dd><a href="/">未安装<span className="color-red">34</span></a></dd>
                        </dl>
                        <dl className="clear extends-left">
                            <dt>客户端在线率统计<span>721</span></dt>
                            <dd><a href="/">客户端在线<span className="color-green">345</span></a></dd>
                            <dd><a href="/">客户端离线<span>33</span></a></dd>
                        </dl>
                        <dl className="clear">
                            <dt>无效终端统计</dt>
                            <dd><a href="/">无效终端<span className="color-blue">2465</span></a></dd>
                            <dd><a href="/">普通终端<span className="color-blue">23</span></a></dd>
                        </dl>
                        <dl className="clear">
                            <dt>终端注册统计<span>3266</span></dt>
                            <dd><a href="/">未注册<span>345</span></a></dd>
                            <dd><a href="/">已注册<span className="color-green">469</span></a></dd>
                        </dl>
                        <dl className="clear extends-right">
                            <dt>终端审核统计</dt>
                            <dd><a href="/">待审核<span className="color-yellow">178</span></a></dd>
                            <dd><a href="/">已审核<span>22</span></a></dd>
                        </dl>
					</div>
                    <div className="col-grid8 view-where-line">
                        <dl className="clear">
                            <dt>可信终端<span className="color-green">13561</span></dt>
                            <dd><a href="/">可信过期<span>71</span></a></dd>
                            <dd><a href="/">普通终端<span>241</span></a></dd>
                        </dl>

                        <dl className="clear">
                            <dt>虚拟机统计</dt>
                            <dd><a href="/">物理机<span>23677</span></a></dd>
                            <dd><a href="/">虚拟机<span className="color-yellow">23</span></a></dd>
                        </dl>
                        <dl className="clear">
                            <dt>终端指纹抓取率统计</dt>
                            <dd><a href="/">未抓取<span>345</span></a></dd>
                            <dd><a href="/">已抓取<span>469</span></a></dd>
                        </dl>
                        <dl className="clear extends-right">
                            <dt>有无指纹统计</dt>
                            <dd><a href="/">有指纹<span className="color-green">178</span></a></dd>
                            <dd><a href="/">无指纹<span>22</span></a></dd>
                        </dl>
                        <dl className="clear extends-left">
                            <dt>指纹状态统计</dt>
                            <dd><a href="/">指纹正常<span>178</span></a></dd>
                            <dd><a href="/">指纹违规<span className="color-red">22</span></a></dd>
                        </dl>
                    </div>
					<div className="col-grid8 view-where-line">
                        <dl className="clear">
                            <dt>IP绑定统计</dt>
                            <dd><a href="/">IP已绑定<span className="color-teal">265</span></a></dd>
                            <dd><a href="/">IP未绑定<span>23</span></a></dd>
                        </dl>
                        <dl className="clear">
                            <dt>MAC绑定统计</dt>
                            <dd><a href="/">MAC已绑定<span className="color-teal">265</span></a></dd>
                            <dd><a href="/">MAC未绑定<span>23</span></a></dd>
                        </dl>
                        <dl className="clear">
                            <dt>终端责任人统计</dt>
                            <dd><a href="/">有责任人<span>15673</span></a></dd>
                            <dd><a href="/">无责任人<span>234</span></a></dd>
                        </dl>
                        <dl className="clear">
                            <dt>终端规范检查统计<span>3638</span></dt>
                            <dd><a href="/">未检查<span>15673</span></a></dd>
                            <dd><a href="/">成功<span>234</span></a></dd>
                        </dl>
                        <dl className="clear extends-right">
                            <dt>终端规范检查合格率统计<span>3638</span></dt>
                            <dd><a href="/">失败<span className="color-yellow">15673</span></a></dd>
                            <dd><a href="/">告警<span className="color-red">234</span></a></dd>
                        </dl>
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
