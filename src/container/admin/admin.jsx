import React, {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'

import Query from '../../tools/query.js'

//引入下拉菜单组件
import {Dropmenu, Droptool} from '../../components/dropdown'

//引入弹出提示组件
import {Popup} from '../../components/popup'
import {Radios, Radio} from '../../components/radios'

//引入组件
import {Crumbs, PageList, Searcher, Configer, Theader, Tbodyer} from '../../components/common'

//引入action类型常量名
import {
	GET_ADMIN_LIST,
	UPDATE_LIST_CONFIGS,
	CHANGE_LIST_CHECKBOX,
	GET_ADMIN_INFO,
	POST_ADMIN_INFO
} from '../../constants'


//引入Action创建函数
import {ActionCreator, ActionGet, FetchPost} from '../../actions/actions'

class AdminListUI extends Component {

	constructor(props) {
		super(props)

		this.actions = [{
			type: 'link',
			href: '/admin/edit/{id}',
			name: '编辑',
			icon: 'icon-note',
			bgcolor: 'green'
		},{
			type: 'button',
			name: '删除',
			icon: 'icon-trash',
			bgcolor: 'red',
			buttonEvent: id => {
				this.props.getList()
			}
		}]
	}

	componentWillMount() {
        this.props.getList({
			page: 1
		})
    }

	//值修饰器
	decorater(key, value) {
		switch(key) {
			case "state":
			 	return value[key] == 0 ? <span className="state-green">启用</span> : <span className="state-red">停用</span>
			default:
				return value[key]
		}
	}

	render() {
		const {tools, actions, list, count, configs} = this.props
		const {
			toolsClickEvent,
			getList,
			updateConfigs,
			checkEvent
		} = this.props
		return (
			<div className="main-box">
				<div className="page-bar clear">
	                <div className="page-bar-left crumbs-box">
						<div className="crumbs-first"><b>终端列表</b> / 首页</div>
						<div className="crumbs-arrow bg-orange"><i className="fa fa-angle-right"></i></div>
						<Crumbs>技术部
							<div className="crumbs-main" style={{width: "280px"}}><div className="title"><i className="fa fa-cubes"></i> 部门路径</div><span>根部门/画方科技/技术部</span></div>
						</Crumbs>
						<Crumbs>用户设备 & 交换机 ...
							<div className="crumbs-main">
								<div className="title"><i className="icon-screen-desktop"></i> 终端类型</div>
								<span>用户设备</span>
								<span>交换机</span>
								<span>网络打印机</span>
								<span>路由器</span>
								<span>交换机</span>
								<span>防火墙</span>
								<span>访问控制认证网关</span>
								<span>安全加密设备</span>
								<span>网络扫描仪</span>
								<span>网络录像机</span>
							</div>
						</Crumbs>
						<Crumbs>在线</Crumbs>
						<Crumbs>告警</Crumbs>
						<Crumbs>客户端在线</Crumbs>
	                </div>
	                <div className="page-bar-right"><i className="icon-calendar"></i> Wed Aug 10 2016 10:51:20 GMT+0800</div>
	            </div>
				<div className="list-box">
					<div id="listHeader" className="olist-header clear">
                        <div className="olist-header-l">
                            <Droptool icon="icon-wrench" bgColor="bg-red">
								<Dropmenu options={tools} clickEvent={toolsClickEvent} />
                            </Droptool>
                            <Searcher getList={getList} updateConfigs={updateConfigs} configs={configs}></Searcher>
                        </div>
                        <div className="olist-header-r">
                            <Link data-content="刷新" to="/admin/list"  className="tools bg-teal ititle"><i className="icon-refresh"></i></Link>
                            <Link data-content="新建" to="/admin/form" className="tools bg-teal ititle"><i className="icon-plus"></i></Link>
                            <Configer getList={getList} updateConfigs={updateConfigs} configs={configs} />
                        </div>
                    </div>
					<div id="listTable" className="olist-main">
                        <table className="olist-table" id="olist_table">
							<Theader getList={getList} updateConfigs={updateConfigs} list={list} configs={configs}  actions={true} checkEvent={checkEvent} />
                            <Tbodyer updateConfigs={updateConfigs} list={list} configs={configs} actions={this.actions} checkEvent={checkEvent} decorater={this.decorater} />
                        </table>
                    </div>
					<PageList getList={getList} updateConfigs={updateConfigs} count={parseInt(count)} configs={configs} />
				</div>
            </div>
		)
	}
}



export const AdminList = connect(
	(state) => {
		return state.adminlist
	},
	(dispatch, ownProps) => {

		return {
			getList: (where) => {
				dispatch(ActionGet(GET_ADMIN_LIST, '/api/admin/list' ,where, 'adminlist'))
			},
			//更新配置
			updateConfigs: (configs) => {
				//更新数据库配置
				FetchPost('/api/setting/list_configs', {
					listPath: configs.listPath,
					configs: JSON.stringify(configs)
				})
				//更新store配置
				dispatch(ActionCreator(UPDATE_LIST_CONFIGS, configs, 'adminlist'))
			},
			//单选框
			checkEvent: (list) => {
				//更新store配置
				dispatch(ActionCreator(CHANGE_LIST_CHECKBOX, list, 'adminlist'))
			},
			toolsClickEvent: () => {
				let idArray = []
				let checkboxArray = Query("#list_body .input-checkbox:checked")
				checkboxArray.each((ii, element) => {
					idArray.push(element.value)
				})
				console.log(idArray);
			}
		};
	}
)(AdminListUI)



class AdminFormUI extends Component {

	constructor(props) {
		super(props)

		this.state = {
			name: '',
			email: '',
			ouid: 0,
			type: 0,
			state: 0,
			desp: '',
			password: ''
		}

		//ES6 类中函数必须手动绑定
		this.handleChange = this.handleChange.bind(this)
		this.submitEvent = this.submitEvent.bind(this)
	}

	componentWillMount() {
        this.props.getAdminInfo(this.props.match.params.id)
    }

	componentWillReceiveProps(nextProps) {
		if (nextProps.info) {
			const {name, email, ouid, type, state, desp} = nextProps.info
			this.setState({
		      name, email, ouid, type, state, desp
		    })
		}
	}

	handleChange(e) {
	    const target = e.target
	    const value = target.type === 'checkbox' ? target.checked : target.value
	    const name = target.name
	    this.setState({
	      [name]: value
	    })
	}

	submitEvent(e) {
		console.log(document.forms.adminform);
	}

	render() {

		const {submit} = this.props

		const {ouObjectList, typeObjectList} = this.props

		let ouOptions = ouObjectList.map((v, i) => {
			return <option key={i} value={v.id}>{v.name}</option>
		})

		let typeOptions = typeObjectList.map((v, i) => {
			return <option key={i} value={v.id}>{v.name}</option>
		})

		return (
			<div className="main-box">
				<div className="page-bar clear">
	                <div className="page-bar-left">新增管理员</div>
	                <div className="page-bar-right"><i className="icon-calendar"></i> Wed Aug 10 2016 10:51:20 GMT+0800</div>
	            </div>
				<div className="form-box">
					<form className="form" name="adminform">
						<section className="section">
							<h3 className="section-head">新增管理员</h3>
							<div className="control">
								<span className="control-label">用户名：</span>
								<div className="controls">
									<label className="input-prepend labled inline-span6"><input type="text" name="name" value={this.state.name} onChange={this.handleChange} /><span className="add-on"><i className="icon-user"></i></span></label>
								</div>
							</div>
							<div className="control">
								<span className="control-label">密码：</span>
								<div className="controls">
									<label className="input-prepend labled inline-span6"><input name="password" type="password" value={this.state.password} onChange={this.handleChange} /><span className="add-on"><i className="icon-lock"></i></span></label>
								</div>
							</div>
							<div className="control">
								<span className="control-label">邮箱：</span>
								<div className="controls">
									<label className="input-prepend labled inline-span6"><input type="text" name="email" value={this.state.email} onChange={this.handleChange} /><span className="add-on"><i className="icon-envelope-open"></i></span></label>
								</div>
							</div>
							<div className="control">
								<span className="control-label">状态：</span>
								<div className="controls">
									<Radios name="state" value={this.state.state}>
										<Radio className="col-span1" value="0">启用</Radio>
										<Radio className="col-span1" value="1">停用</Radio>
									</Radios>
								</div>
							</div>
							<div className="control">
								<span className="control-label">部门：</span>
								<div className="controls">
									<select name="ouid" value={this.state.ouid} onChange={this.handleChange} className="inline-span4">
										{ouOptions}
									</select>
								</div>
							</div>
							<div className="control">
								<span className="control-label">类型：</span>
								<div className="controls">
									<select name="type" value={this.state.type} onChange={this.handleChange} className="inline-span4">
										{typeOptions}
									</select>
								</div>
							</div>
							<div className="control">
								<span className="control-label">描述：</span>
								<div className="controls">
									<textarea className="inline-span8" name="desp" value={this.state.desp} onChange={this.handleChange} />
								</div>
							</div>
							<div className="control">
								<div className="controls">
									<span onClick={this.submitEvent} className="button green">提交</span>
								</div>
							</div>
						</section>
					</form>
				</div>
            </div>
		)
	}
}


export const AdminForm = connect(
	(state) => {
		return {
			info: state.adminlist.info,
			ouObjectList: state.common.ouObjectList,
			typeObjectList: state.common.typeObjectList
		}
	},
	(dispatch, ownProps) => {
		return {
			getAdminInfo: (id) => {
				dispatch(ActionGet(GET_ADMIN_INFO, '/api/admin/view/' + id, 'adminlist'))
			},
			submit: (o) => {
				//dispatch(loginFetch({email, password},'/common'))
			}
		};
	}
)(AdminFormUI)
