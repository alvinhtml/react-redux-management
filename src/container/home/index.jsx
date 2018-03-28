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

class IndexUI extends Component {

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
                    <div className="crumbs-first"> <b>首页</b></div>
                </div>
                <div className="page-bar-right">
                    <i className="icol-calendar"></i>
                    Wed Aug 10 2016 10:51:20 GMT+0800</div>
            </div>
            <div className="content-box view-box">
				<div className="row">
                    <div className="col-grid6">
                        <ul className="t-l-block-6">
                            <li className="clear"><div className="left-icon"><i className="icon-speedometer"></i></div><div className="left-text">终端总数</div><div className="right-text color-blue">2936</div></li>
                            <li className="clear"><div className="left-icon"><i className="icon-speedometer"></i></div><div className="left-text">离线</div><div className="right-text color-gray">298</div></li>
                            <li className="clear"><div className="left-icon"><i className="icon-speedometer"></i></div><div className="left-text">合规</div><div className="right-text color-green">3845</div></li>
                            <li className="clear"><div className="left-icon"><i className="icon-speedometer"></i></div><div className="left-text">未注册</div><div className="right-text color-yellow">10384</div></li>
                            <li className="clear"><div className="left-icon"><i className="icon-speedometer"></i></div><div className="left-text">已注册</div><div className="right-text color-green">188</div></li>
                            <li className="clear"><div className="left-icon"><i className="icon-speedometer"></i></div><div className="left-text">已安装客户端</div><div className="right-text">362</div></li>
                            <li className="clear"><div className="left-icon"><i className="icon-speedometer"></i></div><div className="left-text">可信终端</div><div className="right-text">1823</div></li>
                            <li className="clear"><div className="left-icon"><i className="icon-speedometer"></i></div><div className="left-text">终端总数</div><div className="right-text">32</div></li>
                            <li className="clear"><div className="left-icon"><i className="icon-speedometer"></i></div><div className="left-text">离线</div><div className="right-text">7658</div></li>
                            <li className="clear"><div className="left-icon"><i className="icon-speedometer"></i></div><div className="left-text">合规</div><div className="right-text">34</div></li>
                            <li className="clear"><div className="left-icon"><i className="icon-speedometer"></i></div><div className="left-text">未注册</div><div className="right-text">1097</div></li>
                            <li className="clear"><div className="left-icon"><i className="icon-speedometer"></i></div><div className="left-text">已注册</div><div className="right-text">35</div></li>
                            <li className="clear"><div className="left-icon"><i className="icon-speedometer"></i></div><div className="left-text">已安装客户端</div><div className="right-text">2</div></li>
                            <li className="clear"><div className="left-icon"><i className="icon-speedometer"></i></div><div className="left-text">可信终端</div><div className="right-text">2367</div></li>
                        </ul>
                    </div>
					<div className="col-grid12 term-circle-home" style={{backgroundColor: '#32c5d2'}}>
                        <div className="row">
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
                        <div className="row term-circle-text">
                            <div className="col-grid12 view-number text-center">
                                在线终端<br/><strong className="color-green">12464</strong>
                            </div>
                            <div className="col-grid12 view-number text-center">
                                离线终端<br/><strong className="color-gray">2956</strong>
                            </div>
                        </div>
                    </div>
					<div className="col-grid6">
                        <ul className="t-r-block-6">
                            <li>
                                <div className="t-r-chart">
                                    <svg width="110" height="108">
                                        <circle cx="50%" cy="50%" r="30%" className="t-r-circle-gray"></circle>
                                        <circle cx="50%" cy="50%" r="30%" stroke="#f1c40f" strokeDasharray="80 300" className="t-r-circle"></circle>
                                        <circle cx="50%" cy="50%" r="38%" className="t-r-circle-border"></circle>
                                        <text x="50%" y="53%" className="t-r-circle-text">39%</text>
                                    </svg>
                                </div>
                                <div className="t-r-text">
                                    <span>CPU</span>
                                    <strong className="color-yellow">39%</strong>
                                </div>
                            </li>
                            <li>
                                <div className="t-r-chart">
                                    <svg width="110" height="108">
                                        <circle cx="50%" cy="50%" r="30%" className="t-r-circle-gray"></circle>
                                        <circle cx="50%" cy="50%" r="30%" stroke="#1bbc9b" strokeDasharray="40 300" className="t-r-circle"></circle>
                                        <circle cx="50%" cy="50%" r="38%" className="t-r-circle-border"></circle>
                                        <text x="50%" y="53%" className="t-r-circle-text">23%</text>
                                    </svg>
                                </div>
                                <div className="t-r-text">
                                    <span>内存</span>
                                    <strong className="color-green">4.8G / 16G</strong>
                                </div>
                            </li>
                            <li>
                                <div className="t-r-chart">
                                    <svg width="110" height="108">
                                        <circle cx="50%" cy="50%" r="30%" className="t-r-circle-gray"></circle>
                                        <circle cx="50%" cy="50%" r="30%" stroke="#fa5a64" strokeDasharray="180 300" className="t-r-circle"></circle>
                                        <circle cx="50%" cy="50%" r="38%" className="t-r-circle-border"></circle>
                                        <text x="50%" y="53%" className="t-r-circle-text">87%</text>
                                    </svg>
                                </div>
                                <div className="t-r-text">
                                    <span>硬盘</span>
                                    <strong className="color-red">881.7G / 1024G</strong>
                                </div>
                            </li>
                        </ul>
                    </div>
				</div>

                <div className="row home-row-block">
                    <div className="home-block col-grid6">0</div>
                    <div className="home-block col-grid6">1</div>
                    <div className="home-block col-grid6">
                        <div className="t-r-w-box">
                            <span className="t-r-w-icon bg-red"><i className="icon-bell"></i></span>
                            <span className="t-r-w-total">32</span>
                        </div>
                        <ul className="t-r-w-list">
                            <li><a href=""><i className="icon-screen-desktop bg-red"></i> <span>设备需要注册</span> <span className="badge red">7</span></a></li>
                            <li><a href=""><i className="icon-screen-desktop bg-red"></i> <span>IP地址发生变化</span> <span className="badge red">1</span></a></li>
                            <li><a href=""><i className="icon-flag bg-red"></i> <span>发现新设备入网</span></a></li>
                            <li><a href=""><i className="icon-screen-desktop bg-red"></i> <span>用户认证失败</span></a></li>
                            <li><a href=""><i className="icon-screen-desktop bg-red"></i> <span>设备探测发生变化</span></a></li>
                        </ul>
                    </div>
                    <div className="home-block col-grid6">
                        <ul className="server-status-list clear"><li><span className="label" title="HFPing">PING探测</span> <div data-name="PING探测" data-process="hf_termpingd" className="s-switch off usable"><span></span></div></li>
                            <li><span className="label" title="IPC">IPC探测</span> <div data-name="IPC探测" data-process="hf_ipcd" className="s-switch off usable"></div></li>
                            <li><span className="label" title="Brain">智能分析</span> <div data-name="智能分析" data-process="hf_brain" className="s-switch on disabled"></div></li>
                            <li><span className="label" title="Agent">客户端</span> <div data-name="客户端" data-process="hf_agentd" className="s-switch on usable"></div></li>
                            <li><span className="label" title="AAA">认证授权</span> <div data-name="认证授权" data-process="radiusd" className="s-switch on usable"></div></li>
                            <li><span className="label" title="Sniffer">网络监听</span> <div data-name="网络监听" data-process="hf_sniffd" className="s-switch on usable"></div></li>
                            <li><span className="label" title="TermFP">网络指纹</span> <div data-name="网络指纹" data-process="hf_termfpd" className="s-switch off usable"></div></li>
                            <li><span className="label" title="DHCP">IP分配</span> <div data-name="IP分配" data-process="dhcpd" className="s-switch off usable"></div></li>
                            <li><span className="label" title="SPAN">数据镜像</span> <div data-name="数据镜像" data-process="hf_spand" className="s-switch error usable"></div></li>
                            <li><span className="label" title="SNMP">网络设备</span> <div data-name="网络设备" data-process="hf_snmpd" className="s-switch off usable"></div></li>
                            <li><span className="label" title="VG">虚拟网桥</span> <div data-name="虚拟网桥" data-process="hf_vgd" className="s-switch off usable"></div></li>
                            <li><span className="label" title="HA">双机热备</span> <div data-name="双机热备" data-process="hf_had" className="s-switch off usable"></div></li>
                        </ul>
                    </div>
                </div>

                <div className="row home-row-block">
                    <div className="col-grid6">
                        <ul className="net-resources">
                            <li>
                                <div className="left-icon bg-green"><i className="fa fa-desktop"></i></div>
                                <div className="center-text">终端</div>
                                <div className="right-total"><Link className="text-green" id="NTEM_term" to="/term/list">67</Link></div>
                            </li>
                            <li>
                                <div className="left-icon bg-teal"><i className="fa fa-user"></i></div>
                                <div className="center-text">用户</div>
                                <div className="right-total"><Link className="text-teal" id="NTEM_user" to="/admin/list">5</Link></div>
                            </li>
                            <li>
                                <div className="left-icon bg-yellow"><i className="fa fa-cloud"></i></div>
                                <div className="center-text">VLAN</div>
                                <div className="right-total"><Link className="text-yellow" id="NTEM_vlan" to="/term/list">2</Link></div>
                            </li>
                            <li>
                                <div className="left-icon bg-purple"><i className="fa fa-sitemap"></i></div>
                                <div className="center-text">部门</div>
                                <div className="right-total"><Link className="text-purple" id="NTEM_ou" to="/ou/list">4</Link></div>
                            </li>
                            <li>
                                <div className="left-icon bg-blue"><i className="fa fa-tags"></i></div>
                                <div className="center-text">标签</div>
                                <div className="right-total"><Link className="text-blue" id="NTEM_tag" to="/term/list">19</Link></div>
                            </li>
                        </ul>
                    </div>
                    <div className="col-grid6 view-where-line">
                        <dl className="clear">
                            <dt>IP绑定统计</dt>
                            <dd><a href="/">IP已绑定<span className="badge bg-teal">265</span></a></dd>
                            <dd><a href="/">IP未绑定<span>23</span></a></dd>
                        </dl>
                        <dl className="clear">
                            <dt>MAC绑定统计</dt>
                            <dd><a href="/">MAC已绑定<span className="badge bg-teal">265</span></a></dd>
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
                            <dd><a href="/">失败<span className="badge bg-yellow">15673</span></a></dd>
                            <dd><a href="/">告警<span className="badge bg-red">234</span></a></dd>
                        </dl>
                    </div>

                    <div className="col-grid6 view-where-line">
                        <dl className="clear">
                            <dt>可信终端<span className="badge bg-green">13561</span></dt>
                            <dd><a href="/">可信过期<span>71</span></a></dd>
                            <dd><a href="/">普通终端<span>241</span></a></dd>
                        </dl>

                        <dl className="clear">
                            <dt>虚拟机统计</dt>
                            <dd><a href="/">物理机<span>23677</span></a></dd>
                            <dd><a href="/">虚拟机<span className="badge bg-yellow">23</span></a></dd>
                        </dl>
                        <dl className="clear">
                            <dt>终端指纹抓取率统计</dt>
                            <dd><a href="/">未抓取<span>345</span></a></dd>
                            <dd><a href="/">已抓取<span>469</span></a></dd>
                        </dl>
                        <dl className="clear extends-right">
                            <dt>有无指纹统计</dt>
                            <dd><a href="/">有指纹<span className="badge bg-green">178</span></a></dd>
                            <dd><a href="/">无指纹<span>22</span></a></dd>
                        </dl>
                        <dl className="clear extends-left">
                            <dt>指纹状态统计</dt>
                            <dd><a href="/">指纹正常<span>178</span></a></dd>
                            <dd><a href="/">指纹违规<span className="badge bg-red">22</span></a></dd>
                        </dl>
                    </div>
                    <div className="col-grid6 view-where-line">
                        <dl className="clear">
                            <dt>客户端安装率统计<Popup content="需要安装客户端的终端数量"><span>721</span></Popup></dt>
                            <dd><a href="/">已安装<span>235</span></a></dd>
                            <dd><a href="/">未安装<span className="badge bg-red">34</span></a></dd>
                        </dl>
                        <dl className="clear extends-left">
                            <dt>客户端在线率统计<span>721</span></dt>
                            <dd><a href="/">客户端在线<span className="badge bg-green">345</span></a></dd>
                            <dd><a href="/">客户端离线<span>33</span></a></dd>
                        </dl>
                        <dl className="clear">
                            <dt>无效终端统计</dt>
                            <dd><a href="/">无效终端<span className="badge bg-blue">2465</span></a></dd>
                            <dd><a href="/">普通终端<span className="badge bg-blue">23</span></a></dd>
                        </dl>
                        <dl className="clear">
                            <dt>终端注册统计<span>3266</span></dt>
                            <dd><a href="/">未注册<span>345</span></a></dd>
                            <dd><a href="/">已注册<span className="badge bg-green">469</span></a></dd>
                        </dl>
                        <dl className="clear extends-right">
                            <dt>终端审核统计</dt>
                            <dd><a href="/">待审核<span className="badge bg-yellow">178</span></a></dd>
                            <dd><a href="/">已审核<span>22</span></a></dd>
                        </dl>
                    </div>
                </div>
                <div className="row home-row-block">
                    <div className="col-grid12 home-block">
                        2
                    </div>
                    <div className="col-grid12 home-block">
                        <div className="row">
                            <div className="col-grid12 t-r-w-box">
                                <span className="t-r-w-icon bg-yellow"><i className="icon-envelope"></i></span>
                                <span className="t-r-w-total">6</span>
                            </div>

                        </div>
                        <div className="row">
                            <ul className="t-r-w-list col-span6">
                                <li><a href=""><i className="icon-screen-desktop bg-yellow"></i> <span>待审核的终端</span> </a></li>
                                <li><a href=""><i className="icon-screen-desktop bg-yellow"></i> <span>待审核的终端告警</span> <span className="badge green">1</span></a></li>
                                <li><a href=""><i className="icon-flag bg-yellow"></i> <span>待审核的验证码</span></a></li>
                                <li><a href=""><i className="icon-screen-desktop bg-yellow"></i> <span>客户端卸载请求</span></a></li>
                                <li><a href=""><i className="icon-screen-desktop bg-yellow"></i> <span>待处理的资产状态</span></a></li>
                            </ul>

                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}



export const Index = connect((state) => {
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
})(IndexUI)
