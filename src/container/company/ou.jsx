import React, {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'

import Query from '../../tools/query.js'
import Validator from '../../tools/validator.js'

//引入下拉菜单组件
import {Dropmenu, Droptool} from '../../components/dropdown'

//引入弹出提示组件
import {Popup} from '../../components/popup'
import {Alert, Confirm} from '../../components/modal'
import {Radios, Radio} from '../../components/radios'

//引入组件
import {Crumbs, PageList, Searcher, Configer, Theader, Tbodyer, FetchButton} from '../../components/common'

//引入action类型常量名
import {
	GET_OU_LIST,
	UPDATE_LIST_CONFIGS,
	CHANGE_LIST_CHECKBOX,
	GET_OU_INFO,
	POST_OU_INFO,
	DELETE_OU,
	UPDATE_OU_STATE
} from '../../constants'


//引入Action创建函数
import {ActionCreator, ActionGet, ActionPost, FetchPost} from '../../actions/actions'

class OuListUI extends Component {

	constructor(props) {
		super(props)

		this.actions = [{
			type: 'link',
			href: '/ou/form/{id}',
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
		const {ouObjectList} = this.props
		switch(key) {
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
						<div className="crumbs-first"><b>部门列表</b> / 首页</div>
						<div className="crumbs-arrow bg-orange"><i className="fa fa-angle-right"></i></div>
						<Crumbs>技术部
							<div className="crumbs-main" style={{width: "280px"}}><div className="title"><i className="fa fa-cubes"></i> 部门路径</div><span>根部门/画方科技/技术部</span></div>
						</Crumbs>
						<Crumbs>用户设备 & 交换机 ...
							<div className="crumbs-main">
								<div className="title"><i className="icon-screen-desktop"></i> 部门类型</div>
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
                            <Link data-content="刷新" to="/ou/list"  className="tools bg-teal ititle"><i className="icon-refresh"></i></Link>
                            <Link data-content="新建" to="/ou/form" className="tools bg-teal ititle"><i className="icon-plus"></i></Link>
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



export const OuList = connect(
	(state) => {
		return {
			...state.oulist,
			ouObjectList: state.common.ouObjectList
		}
	},
	(dispatch, ownProps) => {

		return {
			getList: (where) => {
				dispatch(ActionGet(GET_OU_LIST, '/api/ou/list' ,where, 'oulist'))
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
				dispatch(ActionCreator(UPDATE_LIST_CONFIGS, configs, 'oulist'))
			},
			//单选框
			checkEvent: (list) => {
				//更新store配置
				dispatch(ActionCreator(CHANGE_LIST_CHECKBOX, list, 'oulist'))
			},
			deleteEvent: (id) => {
				//删除一条
				dispatch(ActionGet(DELETE_OU, '/api/ou/del/' + id, 'oulist'))
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
						dispatch(ActionGet(DELETE_OU, '/api/ou/del/' + idArray.join(','), 'oulist'))
						break;
					case '1':
						dispatch(ActionGet(UPDATE_OU_STATE, '/api/ou/edit_state/' + idArray.join(','), {state: 1}, 'oulist'))
						break;
					case '2':
						dispatch(ActionGet(UPDATE_OU_STATE, '/api/ou/edit_state/' + idArray.join(','), {state: 0}, 'oulist'))
						break;
					default:
				}

			}
		};
	}
)(OuListUI)



class OuFormUI extends Component {

	constructor(props) {
		super(props)

		this.state = {
			id: '',
			name: '',
			ou_id: 1,
			path: '',
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
			const {id, name, ou_id, path, desp} = nextProps.info
			this.setState({
		      id, name, ou_id, path, desp
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
		const ouObjectList = this.props.ouObjectList
		const ou_id = Query(forms.ou_id).val()
		let path = ''

		for (let i = 0; i < ouObjectList.length; i++) {
			if (ouObjectList[i].id == ou_id) {
				path = (ouObjectList[i].path + '/' + Validator(forms.name)).replace("//", '/')
			}
		}


		const formdata = {
			id: forms.id.value,
			name: Validator(forms.name),
			ou_id: ou_id,
			path: path,
			desp: Validator(forms.desp),
		}

		console.log(formdata)
		this.props.submit(formdata, (data) => {
			this.props.history.push('/ou/list')
		})
	}

	render() {

		const {isFetching} = this.props

		const {ouObjectList} = this.props

		let ouOptions = ouObjectList.map((v, i) => {
			return <option key={i} value={v.id}>{v.name}</option>
		})

		return (
			<div className="main-box">
				<div className="page-bar clear">
	                <div className="page-bar-left">新增部门</div>
	                <div className="page-bar-right"><i className="icon-calendar"></i> Wed Aug 10 2016 10:51:20 GMT+0800</div>
	            </div>
				<div className="form-box">
					<form className="form" name="adminform">
						<input type="hidden" name="id" value={this.state.id} onChange={this.handleChange} />
						<section className="section">
							<h3 className="section-head">新增部门</h3>
							<div className="control">
								<span className="control-label">名称：</span>
								<div className="controls">
									<label className="input-prepend labled inline-span6"><input type="text" name="name" value={this.state.name} onChange={this.handleChange} /><span className="add-on"><i className="icon-user"></i></span></label>
								</div>
							</div>
							<div className="control">
								<span className="control-label">上级部门：</span>
								<div className="controls">
									<select name="ou_id" value={this.state.ou_id} onChange={this.handleChange} className="inline-span4">
										{ouOptions}
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
									<FetchButton isFetching={isFetching} submitEvent={this.submitEvent} className="button green">提-交</FetchButton>
								</div>
							</div>
						</section>
					</form>
				</div>
            </div>
		)
	}
}


export const OuForm = connect(
	(state) => {
		return {
			isFetching: state.oulist.isFetching,
			info: state.oulist.info,
			ouObjectList: state.common.ouObjectList
		}
	},
	(dispatch, ownProps) => {
		return {
			getInfo: (id) => {
				dispatch(ActionGet(GET_OU_INFO, '/api/ou/view/' + id, 'oulist'))
			},
			submit: (formdata, callback) => {
				let url = '/api/ou/edit'

				if (formdata.id !== '') {
					url += '/' + formdata.id
				}

				dispatch(ActionPost(POST_OU_INFO, url, formdata, 'oulist', callback))
			}
		};
	}
)(OuFormUI)
