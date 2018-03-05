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

class SettingUI extends Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {

    }
    componentDidMount() {
        //告警事件统计

    }

    render() {
        const {} = this.props
        const {} = this.props
        return (<div className="main-box">
            <div className="page-bar clear">
                <div className="page-bar-left crumbs-box">
                    <div className="crumbs-first"> <b>入网设置</b> / 首页</div>
                </div>
                <div className="page-bar-right">
                    <i className="icol-calendar"></i>
                    Wed Aug 10 2016 10:51:20 GMT+0800</div>
            </div>
            <div className="content-box setting-box">
                <div className="row setting-nav-box clear">
                    <div className="setting-nav">
                        <div className="setting-nav-icon"><i className="icon-social-dropbox"></i></div>
                        <h3>企业订制</h3>
                        <div className="setting-nav-text">
                            <span>公司信息</span>
                            <span>入网帮助</span>
                            <span>客户端下载</span>
                            <span>底部菜单</span>
                            <span>入网向导</span>
                        </div>
                    </div>
                    <div className="setting-nav">
                        <div className="setting-nav-icon"><i className="icon-shield"></i></div>
                        <h3>客户端</h3>
                        <div className="setting-nav-text">
                            <span>公司信息</span>
                            <span>入网帮助</span>
                            <span>客户端下载</span>
                            <span>底部菜单</span>
                            <span>入网向导</span>
                        </div>
                    </div>
                    <div className="setting-nav">
                        <div className="setting-nav-icon"><i className="icon-screen-desktop"></i></div>
                        <h3>终端管理</h3>
                        <div className="setting-nav-text">
                            <span>公司信息</span>
                            <span>入网帮助</span>
                            <span>客户端下载</span>
                            <span>底部菜单</span>
                            <span>入网向导</span>
                        </div>
                    </div>
                    <div className="setting-nav">
                        <div className="setting-nav-icon"><i className="icon-people"></i></div>
                        <h3>用户管理</h3>
                        <div className="setting-nav-text">
                            <span>公司信息</span>
                            <span>入网帮助</span>
                            <span>客户端下载</span>
                            <span>底部菜单</span>
                            <span>入网向导</span>
                        </div>
                    </div>
                    <div className="setting-nav">
                        <div className="setting-nav-icon"><i className="icon-earphones-alt"></i></div>
                        <h3>监听服务</h3>
                        <div className="setting-nav-text">
                            <span>公司信息</span>
                            <span>入网帮助</span>
                            <span>客户端下载</span>
                            <span>底部菜单</span>
                            <span>入网向导</span>
                        </div>
                    </div>
                    <div className="setting-nav">
                        <div className="setting-nav-icon"><i className="icon-drawer"></i></div>
                        <h3>网络设备</h3>
                        <div className="setting-nav-text">
                            <span>公司信息</span>
                            <span>入网帮助</span>
                            <span>客户端下载</span>
                            <span>底部菜单</span>
                            <span>入网向导</span>
                        </div>
                    </div>
                    <div className="setting-nav">
                        <div className="setting-nav-icon"><i className="icon-pie-chart"></i></div>
                        <h3>智能分析</h3>
                        <div className="setting-nav-text">
                            <span>公司信息</span>
                            <span>入网帮助</span>
                            <span>客户端下载</span>
                            <span>底部菜单</span>
                            <span>入网向导</span>
                        </div>
                    </div>
                    <div className="setting-nav">
                        <div className="setting-nav-icon"><i className="icon-flag"></i></div>
                        <h3>网络指纹</h3>
                        <div className="setting-nav-text">
                            <span>公司信息</span>
                            <span>入网帮助</span>
                            <span>客户端下载</span>
                            <span>底部菜单</span>
                            <span>入网向导</span>
                        </div>
                    </div>
                    <div className="setting-nav">
                        <div className="setting-nav-icon"><i className="icon-book-open"></i></div>
                        <h3>数据镜像</h3>
                        <div className="setting-nav-text">
                            <span>公司信息</span>
                            <span>入网帮助</span>
                            <span>客户端下载</span>
                            <span>底部菜单</span>
                            <span>入网向导</span>
                        </div>
                    </div>
                    <div className="setting-nav">
                        <div className="setting-nav-icon"><i className="icon-ban"></i></div>
                        <h3>访问限制</h3>
                        <div className="setting-nav-text">
                            <span>公司信息</span>
                            <span>入网帮助</span>
                            <span>客户端下载</span>
                            <span>底部菜单</span>
                            <span>入网向导</span>
                        </div>
                    </div>
                    <div className="setting-nav">
                        <div className="setting-nav-icon"><i className="icon-share"></i></div>
                        <h3>联动接口</h3>
                        <div className="setting-nav-text">
                            <span>公司信息</span>
                            <span>入网帮助</span>
                            <span>客户端下载</span>
                            <span>底部菜单</span>
                            <span>入网向导</span>
                        </div>
                    </div>
                    <div className="setting-nav">
                        <div className="setting-nav-icon"><i className="icon-wrench"></i></div>
                        <h3>DHCP服务</h3>
                        <div className="setting-nav-text">
                            <span>公司信息</span>
                            <span>入网帮助</span>
                            <span>客户端下载</span>
                            <span>底部菜单</span>
                            <span>入网向导</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}


export const Setting = connect((state) => {
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
})(SettingUI)
