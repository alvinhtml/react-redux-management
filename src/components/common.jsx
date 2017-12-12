import React, { Component } from 'react'

import { Link } from 'react-router';


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

			//console.log("count-", pageCount , limit);

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
                <div className="pagelist"><b>{count}</b>条信息 共<b>{pageCount}</b>页</div>
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
			<div class="olist-tool olist-operation dropdown">
                <a class="dropdown-toggle bg-red"><i class="icon-wrench"></i></a>
                <div class="dropdown-main dropdown-menu">
                    <ul class="ul-option">
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
		console.log("sv: ", this.searchValue.value , nextProps.configs.search);
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
	}

	onMousedown(e) {
		let th = e.currentTarget.parentNode
		window.resize = {
			column: this.props.configs.column,
			pageX: e.pageX,
			width: th.offsetWidth,
			th: th,
			index: e.currentTarget.getAttribute("data-index"),
			listPath: this.props.configs.listPath
		}
		e.stopPropagation();
	}

	onOrderByEvent(e) {
		let {orderby, orderkey} = this.props.configs

		let key = e.currentTarget.getAttribute("data-key")
		let order = 'asc'

		if (key == orderkey) {
			order = orderby == 'asc' ? 'desc' : 'asc'
		}

		this.props.updateConfigs({
			...this.props.configs,
			orderkey: key,
			orderby: order
		})
		this.props.getList({
			page: 1,
			order: key + ',' + order
		})
	}

	onCheckEvent(currentTarget) {
		// this.props.checkedEvent(currentTarget.checked)
		this.props.updateConfigs({
			...this.props.configs,
			checked: currentTarget.checked
		})
	}

	render() {
		const {column, checkboxs, orderby, orderkey, checked} = this.props.configs

		let columns = column.map((v, i) => {
			let resize = '', order = ''

			if (v.resize) {
				resize = <span onClick={e=>{e.stopPropagation()}} onMouseDown={this.onMousedown} data-index={i} data-key={v.key} className="resize"></span>
			}

			if (v.order) {
				order = <span onClick={this.onOrderByEvent} className={'order ' + (orderkey == v.key ? orderby : '')} data-key={v.key}></span>
			}

			return (
				<th
					key = {v.key}
					data-key = {v.key}
					style = {{
						width: v.width ? v.width + 'px' : 'auto',
						display: v.visibility ? undefined : 'none',
					}}
				><strong>{v.title}</strong>{order}{resize}</th>
			)
		})

		let inputCheck = checkboxs ?
			<th
				className="row-checkbox"
				key="check-all"
			><input checked={checked} type="checkbox" ref="checkbox_all" onChange={e=>{this.onCheckEvent(this.refs['checkbox_all'])}} /></th> : ''

		return (
			<thead id="list_head">
				<tr>
					{inputCheck}
					{columns}
				</tr>
			</thead>
        )
	}
}

/**
 * 列表主体
 */
export class Tbodyer extends Component {

	checkEvent() {

	}

	render() {

		const {list, configs, checkedEvent} = this.props

		const lines = (line, key) => {

			let columns = configs.column.map((v, i) => {
				return (
					<td
						key={v.key}
						style = {{
							display: v.visibility ? undefined : 'none',
						}}
					><div className="td-cell">
						{line[v.key]}
					</div></td>
				)
			})
			//let checked =  typeof(line.checked) === 'undefined' ? false : line.checked
			let checked =  configs.checked ? true : false
			let inputCheck = configs.checkboxs ?
				<td className="row-checkbox" key="check">
					<div className="td-cell">
						<input value={line.id} checked={checked} type="checkbox" ref={"checkbox_" + line.id} onChange={e=>this.checkEvent(e,this.refs['checkbox_'+line.id],line.id).bind(this)} />
					</div>
				</td> : ''

			return (
				<tr key={key} className="animates">
					{inputCheck}
					{columns}
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
