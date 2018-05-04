import React, {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'

import Query from '../../tools/query.js'
import Validator from '../../tools/validator.js'

//引入下拉菜单组件
import {Dropmenu, Droptool} from '../../components/dropdown'

//引入弹出提示组件
import {Popup} from '../../components/popup'
import {OuSelect} from '../../components/select'
import {Alert, Confirm} from '../../components/modal'
import {Radios, Radio} from '../../components/radios'

//引入组件
import {Crumbs, PageList, TermSearcher, Filtrate, Configer, Theader, Tbodyer, Arraylist, FetchButton} from '../../components/common'

//引入action类型常量名
import {
	GET_TERM_LIST,
	UPDATE_LIST_CONFIGS,
	UPDATE_LIST_FILTRATE,
	CHANGE_LIST_CHECKBOX,
	GET_TERM_INFO,
	POST_TERM_INFO,
	DELETE_TERM,
	UPDATE_TERM_STATE
} from '../../constants'


//引入Action创建函数
import {ActionCreator, ActionGet, ActionPost, FetchPost} from '../../actions/actions'

class TermListUI extends Component {

	constructor(props) {
		super(props)

		this.actions = [{
			type: 'link',
			href: '/term/form/{id}',
			name: '编辑',
			icon: 'icon-note',
			bgcolor: 'green'
		},{
			type: 'button',
			name: '删除',
			icon: 'icon-trash',
			bgcolor: 'red',
			buttonEvent: id => {
				this.props.deleteEvent(id)
			}
		}]

		this.decorater = this.decorater.bind(this)
	}

	componentWillMount() {
        this.props.getList({
			page: 1
		})
    }

	//值修饰器
	decorater(key, value) {
		const {typeObjectList} = this.props
		switch(key) {
			case "state":
			 	return value[key] == 0 ? <span className="state-green">在线</span> : <span className="state-red">离线</span>
			case 'type':
				return typeObjectList[value[key]].name
			case 'ip':
				return <Arraylist list={value[key]} />
			case 'mac':
				return <Arraylist list={value[key]} />
			default:
				return value[key]
		}
	}

	render() {
		const {tools, actions, list, count, configs, filtrate, filtrateData} = this.props
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
                            <TermSearcher getList={getList} filtrate={filtrate} updateConfigs={updateConfigs} configs={configs}></TermSearcher>
							<div className="tools">
								<Filtrate title="在线状态" name='online' getList={getList} filtrateData={filtrateData.online} filtrate={filtrate}  updateConfigs={updateConfigs} configs={configs} />
								<Filtrate title="操作系统" name='os' getList={getList} filtrateData={filtrateData.os} filtrate={filtrate}  updateConfigs={updateConfigs} configs={configs} />
							</div>
                        </div>
                        <div className="olist-header-r">
                            <Link data-content="刷新" to="/term/list"  className="tools bg-teal ititle"><i className="icon-refresh"></i></Link>
                            <Link data-content="新建" to="/term/form" className="tools bg-teal ititle"><i className="icon-plus"></i></Link>
                            <Configer getList={getList} updateConfigs={updateConfigs} configs={configs} />
                        </div>
                    </div>
					<div id="listTable" className="olist-main">
                        <table className="olist-table" id="olist_table">
							<Theader getList={getList} filtrate={filtrate} updateConfigs={updateConfigs} list={list} configs={configs}  actions={true} checkEvent={checkEvent} />
                            <Tbodyer updateConfigs={updateConfigs} list={list} configs={configs} actions={this.actions} checkEvent={checkEvent} decorater={this.decorater} />
                        </table>
                    </div>
					<PageList getList={getList} filtrate={filtrate} updateConfigs={updateConfigs} count={parseInt(count)} configs={configs} />
				</div>
            </div>
		)
	}
}



export const TermList = connect(
	(state) => {
		return {
			...state.termlist,
			typeObjectList: state.common.typeObjectList
		}
	},
	(dispatch, ownProps) => {

		return {
			getList: (where) => {
				console.log(where);
				dispatch(ActionGet(GET_TERM_LIST, '/api/term/list' ,where, 'termlist'))
				//更新store配置
				dispatch(ActionCreator(UPDATE_LIST_FILTRATE, where, 'termlist'))
			},
			//更新配置
			updateConfigs: (configs, isPost) => {
				if (isPost) {
					//更新数据库配置
					FetchPost('/api/setting/list_configs', {
						listPath: configs.listPath,
						configs: JSON.stringify(configs)
					})
				}
				//更新store配置
				dispatch(ActionCreator(UPDATE_LIST_CONFIGS, configs, 'termlist'))
			},
			//单选框
			checkEvent: (list) => {
				//更新store配置
				dispatch(ActionCreator(CHANGE_LIST_CHECKBOX, list, 'termlist'))
			},
			deleteEvent: (id) => {
				//删除一条
				dispatch(ActionGet(DELETE_TERM, '/api/term/del/' + id, 'termlist'))
			},
			toolsClickEvent: (value) => {
				let idArray = []
				let checkboxArray = Query("#list_body .input-checkbox:checked")
				checkboxArray.each((ii, element) => {
					idArray.push(element.value)
				})

				if (idArray.length === 0) {
					Alert("请先勾选要执行操作的列!")
					return false
				}

				switch (value) {
					case '0':
						dispatch(ActionGet(DELETE_TERM, '/api/term/del/' + idArray.join(','), 'termlist'))
						break;
					case '1':
						dispatch(ActionGet(UPDATE_TERM_STATE, '/api/term/edit_state/' + idArray.join(','), {state: 1}, 'termlist'))
						break;
					case '2':
						dispatch(ActionGet(UPDATE_TERM_STATE, '/api/term/edit_state/' + idArray.join(','), {state: 0}, 'termlist'))
						break;
					default:
				}

			}
		};
	}
)(TermListUI)



class TermFormUI extends Component {

	constructor(props) {
		super(props)

		this.state = {
			id: '',
			name: '',
			ou_id: 0,
			type: 0,
			hostname: '',
			os: '',
			state: 0,
			desp: '',
		}

		//ES6 类中函数必须手动绑定
		this.handleChange = this.handleChange.bind(this)
		this.submitEvent = this.submitEvent.bind(this)
	}

	componentWillMount() {
        this.props.getInfo(this.props.match.params.id)
    }

	componentWillReceiveProps(nextProps) {
		if (nextProps.info) {
			const {id, name, ou_id, type, hostname, os, state, desp} = nextProps.info
			this.setState({
		      id, name, ou_id, type, hostname, os, state, desp
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
		const forms = document.forms.adminform
		const formdata = {
			id: forms.id.value,
			name: Validator(forms.name),
			ou_id: Query(forms.ou_id).val(),
			type: Query(forms.type).val(),
			hostname: Validator(forms.hostname),
			os: Validator(forms.os),
			state: forms.state.value,
			desp: Validator(forms.desp),
		}

		console.log(formdata)
		this.props.submit(formdata, (data) => {
			this.props.history.push('/term/list')
		})
	}

	render() {

		const {isFetching} = this.props

		const {typeObjectList} = this.props

		let typeOptions = typeObjectList.map((v, i) => {
			return <option key={i} value={v.id}>{v.name}</option>
		})

		return (
			<div className="main-box">
				<div className="page-bar clear">
	                <div className="page-bar-left">新增终端</div>
	                <div className="page-bar-right"><i className="icon-calendar"></i> Wed Aug 10 2016 10:51:20 GMT+0800</div>
	            </div>
				<div className="form-box">
					<form className="form" name="adminform">
						<input type="hidden" name="id" value={this.state.id} onChange={this.handleChange} />
						<section className="section">
							<h3 className="section-head">新增终端</h3>
							<div className="control">
								<span className="control-label">名称：</span>
								<div className="controls">
									<label className="input-prepend labled inline-span6"><input type="text" name="name" value={this.state.name} onChange={this.handleChange} /><span className="add-on"><i className="icon-user"></i></span></label>
								</div>
							</div>
							<div className="control">
								<span className="control-label">状态：</span>
								<div className="controls">
									<Radios name="state" value={this.state.state}>
										<Radio className="col-span1" value="0">在线</Radio>
										<Radio className="col-span1" value="1">离线</Radio>
									</Radios>
								</div>
							</div>
							<div className="control">
								<span className="control-label">部门：</span>
								<div className="controls">
									<OuSelect name="ou_id" value={this.state.ou_id} parent='all' search="" className="inline-span4" />
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
								<span className="control-label">主机名：</span>
								<div className="controls">
									<label className="input-prepend labled inline-span6"><input type="text" name="hostname" value={this.state.hostname} onChange={this.handleChange} /><span className="add-on"><i className="icon-user"></i></span></label>
								</div>
							</div>
							<div className="control">
								<span className="control-label">操作系统：</span>
								<div className="controls">
									<label className="input-prepend labled inline-span6"><input type="text" name="os" value={this.state.os} onChange={this.handleChange} /><span className="add-on"><i className="icon-user"></i></span></label>
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
									<FetchButton isFetching={isFetching} submitEvent={this.submitEvent} className="button green">提交</FetchButton>
								</div>
							</div>
						</section>
					</form>
				</div>
            </div>
		)
	}
}


export const TermForm = connect(
	(state) => {
		return {
			isFetching: state.termlist.isFetching,
			info: state.termlist.info,
			typeObjectList: state.common.typeObjectList
		}
	},
	(dispatch, ownProps) => {
		return {
			getInfo: (id) => {
				dispatch(ActionGet(GET_TERM_INFO, '/api/term/view/' + id, 'termlist'))
			},
			submit: (formdata, callback) => {
				let url = '/api/term/edit'

				if (formdata.id !== '') {
					url += '/' + formdata.id
				}

				dispatch(ActionPost(POST_TERM_INFO, url, formdata, 'termlist', callback))
			}
		};
	}
)(TermFormUI)
