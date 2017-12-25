import React, { Component } from 'react'

import { Link } from 'react-router-dom';

import Query from '../tools/query.js'

import {resize, remove} from '../index.jsx'


/**
 * 内面顶部标题栏
 */
export class Crumbs extends Component {

	render() {

		const {title, clickEvent} = this.props

		return (
			<div className='crumbs animates'>
				{this.props.children}
			</div>
		)
	}
}

/**
 * 分页组件
 */
export class PageList extends Component {

	constructor(props) {
		super(props)

		this.gotoPage = this.props.page

		//ES6 类中函数必须手动绑定
		this.inputEnterEvent = this.inputEnterEvent.bind(this)
		this.setPageEvent = this.setPageEvent.bind(this)
	}

	inputEnterEvent(event) {
		if (event.charCode === 13){
			this.props.setPageEvent(this.gotoPage)
		}
	}

	setPageEvent(page) {
		this.props.updateConfigs({
			...this.props.configs,
			page
		})

		let where = {
			page
		}
		if (this.props.configs.search != '') {
			where.search = this.props.configs.search
		}
		this.props.getList(where)
	}

	render() {

		const count = this.props.count
		const {limit, page} = this.props.configs


		if(count > limit){

			//获取总页数
            let pageCount = count === 0 ? 0 : Math.ceil(count / limit)

			let begin = 1, //起始页
                showPage = 10 //要显示的页码个数

            if (pageCount < 11) {
                showPage = pageCount
            } else {
                if (page > 6) {
                    begin = pageCount - page > 5 ? page - 4 : pageCount - 9
                }
            }

			let pages = [];
			for (let i = 0; i < showPage; i++) {
				let pageNumber = begin + i

				if (pageNumber == page) {
					pages.push(<a key={pageNumber} className="active">{pageNumber}</a>)
				} else {
					pages.push(<a key={pageNumber} className="animates" onClick={e=>this.setPageEvent(pageNumber)}>{pageNumber}</a>)
				}
			}

            return (
                <div className="pagelist">
                    <em>{count}</em>条信息 共<em>{pageCount}</em>页
                    转到 <input onKeyPress={this.inputEnterEvent} type="text" onChange={n=>this.gotoPage=n} defaultValue={page} /> 页
                    <a onClick={e=>this.setPageEvent(this.gotoPage)}>Go</a>
                    <a className="page-prev animates" onClick={e=>this.setPageEvent(page - 1 ? page - 1 : page)}><i className="icon-arrow-left"></i></a>
                    {pages}
                    <a className="page-next animates" onClick={e=>this.setPageEvent(page + 1 < pageCount ? page + 1 : pageCount)}><i className="icon-arrow-right"></i></a>
                </div>
            )
        }else{
            return (
                <div className="pagelist"><em>{count}</em>条信息 共<em>{1}</em>页</div>
            );
        }
	}

}


/**
 * 列表操作组件
 * @type {String}
 */
export class ListActioner extends Component {

	constructor(props) {
		super(props)

		//this.search = this.props.search

		//ES6 类中函数必须手动绑定

	}

	render() {

		const {} = this.props

		return (
			<div className="olist-tool olist-operation dropdown">
                <a className="dropdown-toggle bg-red"><i className="icon-wrench"></i></a>
                <div className="dropdown-main dropdown-menu">
                    <ul className="ul-option">
						{this.props.children}
					</ul>
				</div>
			</div>
        )
	}
}


/**
 * 列表搜索组件
 */
export class Searcher extends Component {

	constructor(props) {
		super(props)

		this.searchValue = undefined

		//ES6 类中函数必须手动绑定
		this.inputEnterEvent = this.inputEnterEvent.bind(this)
		this.searchSubmitEvent = this.searchSubmitEvent.bind(this)
		this.openTaggleEvent = this.openTaggleEvent.bind(this)

		this.state = {
			opened: false,
			starch: ''
		}
	}

	componentWillReceiveProps(nextProps) {
		this.searchValue.value = nextProps.configs.search
	}

	openTaggleEvent() {
		this.setState({
			opened: !this.state.opened
		})
	}

    inputEnterEvent(event) {
        if(event.charCode === 13){
			this.searchSubmitEvent(event)
        }
    }

    searchSubmitEvent(event) {
		this.props.updateConfigs({
			...this.props.configs,
			search: this.searchValue.value
		})
		this.props.getList({
			search: this.searchValue.value
		})
		this.setState({
			opened: false,
			search: this.searchValue.value
		})
    }

	render() {

		const search = this.props.configs.search

		return (
			<div className="tools olist-search">
				<input type="text" className="form-control" ref={n=>this.searchValue=n} placeholder="搜索" defaultValue={search} onKeyPress={this.inputEnterEvent} />
				<div className="search-toggle" onClick={this.openTaggleEvent}><i className="fa fa-angle-down"></i></div>
				<span className="button blue" onClick={this.searchSubmitEvent} type="button"><i className="icon-magnifier"></i></span>
				<div className="search-where ilinks" style={{display : this.state.opened ? "block" : "none"}}>
					<span className="search-close animates rotate" onClick={this.openTaggleEvent}>×</span>
					<dl className="search-where-line clear">
						<dt>搜索模式：</dt>
						<dd className="animates active"><span>精确搜索</span></dd>
						<dd className="animates"><span>模糊搜索</span></dd>
					</dl>
					<dl className="search-where-line clear">
						<dt>在线状态：</dt>
						<dd className="animates"><span>全部</span><em className="color-blue">225</em></dd>
						<dd className="animates active"><span>在线</span><em className="color-green">235</em></dd>
						<dd className="animates"><span>离线</span><em className="color-blue">44</em></dd>
					</dl>
					<dl className="search-where-line clear">
						<dt>告诉状态：</dt>
						<dd className="animates"><span>全部</span><em className="color-blue">436</em></dd>
						<dd className="animates"><span>告警</span><em className="color-red">34</em></dd>
						<dd className="animates active"><span>正常</span><em className="color-green">235</em></dd>
					</dl>
					<dl className="search-where-line clear">
						<dt>客户端：</dt>
						<dd className="animates active"><span>全部</span><em className="color-blue">7023</em></dd>
						<dd className="animates"><span>已安装</span><em className="color-green">6087</em></dd>
						<dd className="animates"><span>未安装</span><em className="color-blue">0</em></dd>
						<dd className="animates"><span>客户端在线</span><em className="color-blue">2446</em></dd>
						<dd className="animates"><span>客户端离线</span><em className="color-blue">17</em></dd>
					</dl>
					<div className="search-where-footer spaced">
						<button onClick={this.searchSubmitEvent} className="button teal">含条件搜索</button><button onClick={this.searchSubmitEvent} className="button blue">不含条件搜索</button>
					</div>
				</div>
			</div>
        )
	}
}



/**
 * 列表配置
 * @type {String}
 */
export class Configer extends Component {
	constructor(props) {
		super(props)

		//设置 initial state
		this.state = {
			opened: false
		}

		//ES6 类中函数必须手动绑定
		this.handleClick = this.handleClick.bind(this)
		this.changeLimitEvent = this.changeLimitEvent.bind(this)
		this.changeColumnEvent = this.changeColumnEvent.bind(this)
	}

	handleClick(event) {
		this.setState({
			opened: !this.state.opened
		})
	}

	//改变limit(每页显示条数)
	changeLimitEvent(e) {
		let limit = e.currentTarget.getAttribute("data-val")
		this.props.updateConfigs({
			...this.props.configs,
			limit
		})
		this.props.getList({
			page: 1,
			limit
		})
	}

	//改变每列状态,显示或隐藏
	changeColumnEvent(e){
		let i = e.currentTarget.getAttribute("data-val")
		this.props.configs.column[i].visibility = !this.props.configs.column[i].visibility
		this.props.updateConfigs({
			...this.props.configs
		})
	}

	render() {
		const configs = this.props.configs
		const {column, limit} = configs

		const limitArray = [10,20,30,50,100,200]

		let limits = limitArray.map((v, i) => {
			return (
                <span key={i} onClick={this.changeLimitEvent} data-val={v} className={v == limit ? 'active' : ''}>{v}</span>
            )
		})

		let columns = column.map((v, i) => {
			return (
				<span key={i} onClick={this.changeColumnEvent} data-val={i} className={v.visibility ? 'active' : ''}>{v.title}</span>
			)
		})

		return (
			<div className={this.state.opened ? 'tools dropdown open' : 'tools dropdown'}>
                <a className="bg-teal dropdown-toggler" onClick={this.handleClick}><i className="icon-settings"></i></a>
                <div className="dropdown-main dropdown-menu dropdown-dark dropdown-right">
                    <div className="olist-tool-conf">
                        <h4>每页显示数量</h4>
                        <div className="tools-span-list page-limit">
                            {limits}
                        </div>
                        <h4>显示项目</h4>
                        <div className="list-column">
                            {columns}
                        </div>
                    </div>
                </div>
            </div>
        )
	}
}

/**
 * 列表头部
 * @type {Array}
 */
export class Theader extends Component {
	constructor(props) {
		super(props)

		//设置 initial state
		this.state = {
			opened: false
		}

		//ES6 类中函数必须手动绑定
		this.onMousedown = this.onMousedown.bind(this)
		this.onOrderByEvent = this.onOrderByEvent.bind(this)
		this.onCheckEvent = this.onCheckEvent.bind(this)
		this.onMouseDownTh = this.onMouseDownTh.bind(this)
	}



	onOrderByEvent(e) {
		e.stopPropagation()
		let order = this.props.configs.order
		let key = e.currentTarget.getAttribute("data-key")

		if (order.length === 0) {
			order = [key, 'asc']
		} else {
			if (order[0] === key) {
				order = [key, order[1] === 'asc' ? 'desc' : 'asc']
			} else {
				order = [key, 'asc']
			}
		}

		this.props.updateConfigs({
			...this.props.configs,
			order
		})
		this.props.getList({
			page: 1,
			order: order[0] + ',' + order[1]
		})
	}

	onCheckEvent(currentTarget) {
		let checked = currentTarget.checked
		for (let v of this.props.list) {
			v.checked = checked
		}
		this.props.checkEvent([...this.props.list])
		this.props.updateConfigs({
			...this.props.configs,
			checked: checked
		})
	}

	//resize 按下
	onMousedown(e) {
		e.stopPropagation()
		resize.resizeing = true
		resize.configs = this.props.configs
		resize.event = e
		resize.pageX = e.pageX
		resize.element = e.currentTarget.parentNode
		resize.width = e.currentTarget.parentNode.offsetWidth
		resize.index = e.currentTarget.getAttribute("data-index")
	}

	//remove 按下, 开始拖动改变列序
	onMouseDownTh(e) {

		e.stopPropagation()

		let configs = this.props.configs

		//当前按下的 th
		let currentTh = Query(e.currentTarget)

		//当前 th 的 index
		let currentIndex = currentTh.index()

		let olistTable = Query("#olist_table").addClass("moving")

		//列表所有th
		let thElements = Query("#olist_table th.column-th")

		//镜像table集合
		remove.mirrorArr = []

		thElements.each((i, elem) => {
			let th = Query(elem)

			let index = th.index()

			if(elem.offsetParent === null) {
				remove.mirrorArr.push({
					mirror: null,
					title: configs.column[i].title,
					column: configs.column[i],
					index,
				})
			} else {
				let position = th.offset()
				let width = elem.offsetWidth

				let tdElements = Query("#olist_table tr>td:nth-child(" + (index + 1) + ")")

				//生成一个单列的镜像表格
				let mirror = document.createElement("table")

				mirror.style = 'top: '+ position.top +'px; left: '+ position.left +'px; width: '+ width +'px'

				let Tdstr = '<tr><thead><th>' + elem.innerHTML + '</th></thead></tr>'

				tdElements.each((ii, element) => {
					Tdstr += '<tr><td style="height:' + element.offsetHeight + 'px;">' + element.innerHTML + '</td></tr>'
				})

				mirror.innerHTML = '<tbody>' + Tdstr + '</tbody>'


				let mirrorObject = {
					mirror,
					position: position,
					title: configs.column[i].title,
					column: configs.column[i],
					index,
					width
				}
				if (currentIndex === index) {
					remove.moving = true
					remove.configs = configs
					mirror.className = "olist-table mirror current-mirror"
					remove.position = position
					remove.mirror = mirror
					remove.width = width
					remove.index = i
					remove.pageX = e.pageX
					remove.initial = {
						index: i,
						pageX: e.pageX,
						...position
					}
				} else {
					mirror.className = "olist-table mirror"
				}

				remove.mirrorArr.push(mirrorObject)

				document.body.appendChild(mirror)
			}

		})

	}

	render() {
		const actions = this.props.actions
		const {column, checkboxs, checked} = this.props.configs
		const order = this.props.configs.order.length ? this.props.configs.order : ['','']

		let columns = column.map((v, i) => {
			let resize = '', orders = ''

			if (v.resize) {
				resize = <span onClick={e=>{e.stopPropagation()}} onMouseDown={this.onMousedown} data-index={i} data-key={v.key} className="resize"></span>
			}

			if (v.order) {
				orders = <span onMouseDown={this.onOrderByEvent} className={'order ' + (order[0] == v.key ? order[1] : '')} data-key={v.key}></span>
			}

			return (
				<th
					key = {v.key}
					data-key = {v.key}
					style = {{
						width: v.width ? v.width + 'px' : '200px',
						display: v.visibility ? undefined : 'none',
					}}
					className="column-th"
					onMouseDown = {this.onMouseDownTh}
				><strong>{v.title}</strong>{orders}{resize}</th>
			)
		})

		let inputCheck = checkboxs ?
			<th
				className="row-checkbox"
				key="check-all"
			><input checked={checked} type="checkbox" ref="checkbox_all" onChange={e=>{this.onCheckEvent(this.refs['checkbox_all'])}} /></th> : ''
		let action = actions ? <th className="row-action" style={{width:'120px'}}><strong>操作</strong></th> : ''
		return (
			<thead id="list_head">
				<tr>
					{inputCheck}
					{columns}
					{action}
					<th className="row-last"></th>
				</tr>
			</thead>
        )
	}
}

/**
 * 列表主体
 */
export class Tbodyer extends Component {

	checkboxEvent(i) {
		this.props.list[i].checked = this.props.list[i].checked ? false : true
		this.props.checkEvent([...this.props.list])
		for (let v of this.props.list) {
			if (!v.checked) {
				this.props.updateConfigs({
					...this.props.configs,
					checked: false
				})
				return false
			}
		}
		this.props.updateConfigs({
			...this.props.configs,
			checked: true
		})
	}

	render() {

		const {list, configs, actions, decorater, checkedEvent} = this.props

		const lines = (line, key) => {

			let columns = configs.column.map((v, i) => {
				return (
					<td
						key={v.key}
						style = {{
							display: v.visibility ? undefined : 'none',
						}}
					><div className="td-cell">
						{decorater(v.key, line)}
					</div></td>
				)
			})
			let checked =  configs.checked ? true : line.checked ? true : false
			let inputCheck = configs.checkboxs ?
				<td className="row-checkbox" key="check">
					<div className="td-cell">
						<input className="input-checkbox" value={line.id} checked={checked} onChange={e=>this.checkboxEvent(key)} type="checkbox"  />
					</div>
				</td> : ''

			let action = actions.length ? actions.map((vv, ii) => {
				if (vv.type == "link") {
					return (<Link key={ii} className={'ebtn bg-' + vv.bgcolor} to={vv.href.replace('{id}', line.id)} title={vv.name}><i className={vv.icon}></i></Link>)
				}
				if (vv.type == "button") {
					return (<span key={ii} className={'ebtn bg-' + vv.bgcolor} onClick={e=>vv.buttonEvent(line.id)} title={vv.name}><i className={vv.icon}></i></span>)
				}
			}) : ''

			return (
				<tr key={key} className="animates">
					{inputCheck}
					{columns}
					<td className="row-action"><div className="td-cell">{action}</div></td>
					<td className="row-last"></td>
				</tr>
			)
		}

		let lists = list.map((v, i) => {
			return lines(v, i);
		})

		return (
			<tbody id="list_body" className="olist-body">
				{lists}
			</tbody>
        )
	}
}
