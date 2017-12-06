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
	}

	inputEnterEvent(event) {
		if (event.charCode === 13){
			this.props.setPageEvent(this.gotoPage)
		}
	}

	render() {

		const {count, setPageEvent} = this.props
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
					pages.push(<a key={pageNumber} className="animates" onClick={e=>setPageEvent(pageNumber)}>{pageNumber}</a>)
				}

			}


            return (
                <div className="pagelist">
                    <em>{count}</em>条信息 共<em>{pageCount}</em>页
                    转到 <input onKeyPress={this.inputEnterEvent} type="text" onChange={n=>this.gotoPage=n} defaultValue={page} /> 页
                    <a onClick={e=>setPageEvent(this.gotoPage)}>Go</a>
                    <a className="page-prev animates" onClick={e=>setPageEvent(page - 1 ? page - 1 : page)}><i className="icon-arrow-left"></i></a>
                    {pages}
                    <a className="page-next animates" onClick={e=>setPageEvent(page + 1 < pageCount ? page + 1 : pageCount)}><i className="icon-arrow-right"></i></a>
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
export class ListSearcher extends Component {

	constructor(props) {
		super(props)

		this.searchValue = this.props.search

		//ES6 类中函数必须手动绑定
		this.inputEnterEvent = this.inputEnterEvent.bind(this)
		this.searchSubmitEvent = this.searchSubmitEvent.bind(this)
		this.openTaggleEvent = this.openTaggleEvent.bind(this)

		this.state = {
			opened: false
		}
	}

	openTaggleEvent() {
		this.setState({
			opened: !this.state.opened
		})
	}

    inputEnterEvent(event) {
        if(event.charCode === 13){
			this.props.searchEvent(this.searchValue)
			this.setState({
				opened: false
			})
        }
    }

    searchSubmitEvent(event) {
		this.props.searchEvent(this.searchValue)
		this.setState({
			opened: false
		})
    }

	render() {

		const {setSearchMode, searchEvent} = this.props
		const {searchMode, search} = this.props.configs

		return (
			<div className="tools olist-search">
				<input type="text" className="form-control" ref={n=>this.searchValue=n} placeholder={searchMode} defaultValue={search} onKeyPress={this.inputEnterEvent} />
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
						<button className="button teal">含条件搜索</button><button className="button blue">不含条件搜索</button>
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
export class ListConfiger extends Component {
	constructor(props) {
		super(props)

		//设置 initial state
		this.state = {
			opened: false
		}

		//ES6 类中函数必须手动绑定
		this.handleClick = this.handleClick.bind(this)
	}
	handleClick(event) {
		this.setState({
			opened: !this.state.opened
		})
	}
	render() {
		const {configs, changeLimitEvent, changeColumnEvent} = this.props
		const {column, limit} = configs

		const limitArray = [10,20,30,50,100,200]

		let limits = limitArray.map((v, i) => {
			return (
                <span key={i} onClick={e => changeLimitEvent(e.currentTarget.getAttribute("data-val"), configs)} data-val={v} className={v == limit ? 'active' : ''}>{v}</span>
            )
		})

		let columns = column.map((v, i) => {
			return (
				<span key={i} onClick={e => changeColumnEvent(i, configs)} className={v.visibility ? 'active' : ''}>{v.title}</span>
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
export class ListHeader extends Component {
	constructor(props) {
		super(props)

		//设置 initial state
		this.state = {
			opened: false
		}

		//ES6 类中函数必须手动绑定
		this.onmousedown = this.onmousedown.bind(this)
		this.onmousedown = this.onmousedown.bind(this)
	}

	onmousedown(e, element, key, listPath) {
		window.resize = {
			column: this.props.configs.column,
			pageX: e.pageX,
			width: element.offsetWidth,
			element,
			key,
			listPath
		}
		e.stopPropagation();
	}

	onOrderByEvent(e, i, order) {
		if (order) {
			this.props.orderbyEvent(order !== 'asc' ? 'asc' : 'desc', i, this.props.configs)
		}
	}

	render() {
		const {resizeThEvent, orderbyEvent, checkAllEvent, isCheckAll} = this.props
		const {column, listPath, checkboxs} = this.props.configs

		let columns = column.map((v, i) => {
			let resize = v.resize ? <span onClick={e=>{e.stopPropagation()}} onMouseDown={(e)=>{this.onmousedown(e, this.refs['resize_'+v.key], i, listPath);}} className="resize"></span> : ''
			let order = v.order ? <span onClick = {e=>this.onOrderByEvent(e, i, v.order)} className={'order ' + v.order}></span> : ''
			return (
				<th
					ref = {"resize_" + v.key}
					key = {v.key}
					data-val = {v.key}
					style = {{
						width: v.width ? v.width + 'px' : 'auto',
						display: v.visibility ? undefined : 'none',
					}}
				><strong>{v.title}</strong>{order}{resize}</th>
			)
		})

		let checkboxDom = checkboxs ?
			<th
				className="row-checkbox"
				key="check-all"
			><input checked={isCheckAll} type="checkbox" ref="checkbox_all" onChange={e=>{checkAllEvent(this.refs['checkbox_all'])}} /></th> : ''

		return (
			<thead id="list_head">
				<tr>
					{checkboxDom}
					{columns}
				</tr>
			</thead>
        )
	}
}

/**
 * 列表主体
 */
export class ListBody extends Component {

	render() {

		const {list, configs, checkEvent, ischeck} = this.props

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
			console.log(typeof(line.checked))
			let checked =  typeof(line.checked) === 'undefined' ? false : line.checked
			let checkboxDom = configs.checkboxs ?
				<td className="row-checkbox" key="check">
					<div className="td-cell">
						<input value={line.id} checked={checked} type="checkbox" ref={"checkbox_" + line.id} onChange={e=>checkEvent(e,this.refs['checkbox_'+line.id],line.id)} />
					</div>
				</td> : ''

			return (
				<tr key={key} className="animates">
					{checkboxDom}
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
