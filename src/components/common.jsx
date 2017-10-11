import React, { Component } from 'react'

import { Link } from 'react-router';


/**
 * 内面顶部标题栏
 * @type {String}
 */
export class Pagebar extends Component {

	render() {

		const {title, clickEvent} = this.props

		return (
			<div className="page-bar clear">
                <div className="page-bar-left">{title}</div>
                <div className="page-bar-right">{this.props.children}</div>
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
					pages.push(<a key={pageNumber} onClick={e=>setPageEvent(pageNumber)}>{pageNumber}</a>)
				}

			}


            return (
                <div className="pagelist">
                    <b>{count}</b>条信息 共<b>{pageCount}</b>页
                    转到 <input onKeyPress={this.inputEnterEvent} type="text" onChange={n=>this.gotoPage=n} defaultValue={page} /> 页
                    <a onClick={e=>setPageEvent(this.gotoPage)}>Go</a>
                    <a className="page-prev" onClick={e=>setPageEvent(page - 1 ? page - 1 : page)}><i className="icon-arrow-left"></i></a>
                    {pages}
                    <a className="page-next" onClick={e=>setPageEvent(page + 1 < pageCount ? page + 1 : pageCount)}><i className="icon-arrow-right"></i></a>
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
                <a class="dropdown-toggle bg-red"><i class="icon-wrench"></i> &nbsp; <i class="fa fa-angle-down"></i></a>
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
		console.log("Listsearcher:", this.props)
		this.searchValue = this.props.search

		//ES6 类中函数必须手动绑定
		this.inputEnterEvent = this.inputEnterEvent.bind(this)
		this.searchSubmitEvent = this.searchSubmitEvent.bind(this)
	}

    inputEnterEvent(event) {
        if(event.charCode === 13){
			this.props.searchEvent(this.searchValue)
        }
    }

    searchSubmitEvent(event) {
		this.props.searchEvent(this.searchValue)
    }

	render() {

		const {setSearchMode, searchEvent} = this.props
		const {searchMode, search} = this.props.configs

		return (
            <div className="tools olist-search">
                <input type="text" className="form-control" ref={n=>this.searchValue=n} placeholder={searchMode} defaultValue={search} onKeyPress={this.inputEnterEvent} />
                <div className="olist-where dropdown"><a className="dropdown-toggler"><i className="icon-arrow-down"></i></a>
                    <div className="dropdown-main dropdown-menu">
                        <ul id="listSearch">
                            <li key={1} onClick={e=>setSearchMode('模糊搜索')}><i className="icon-magnifier"></i><span className="itext">模糊搜索</span></li>
                            <li key={2} onClick={e=>setSearchMode('精确搜索')}><i className="icon-magnifier-add"></i><span className="itext">精确搜索</span></li>
                            {this.props.children}
                        </ul>
                    </div>
                </div>
                <span className="button blue" onClick={this.searchSubmitEvent} type="button">搜索</span>
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
	}

	onOrderByEvent(e, order) {
		if (order) {
			orderbyEvent(order !== 'asc' ? 'asc' : 'desc', this.props.configs)
		}
	}

	render() {
		const {resizeThEvent} = this.props
		const {column, listPath} = this.props.configs

		let columns = column.map((v, i) => {
			let resize = v.resize ? <span onMouseDown={(e)=>{this.onmousedown(e, this.refs['resize_'+v.key], i, listPath)}} className="resize"></span> : ''
			return (
				<th
					ref = {"resize_" + v.key}
					key = {v.key}
					className = {v.order ? v.order : ''}
                    onClick = {e=>this.onOrderByEvent(e, v.order)}
                    data-order = {v.order}
					data-val = {v.key}
					style = {{
						width: v.width ? v.width + 'px' : 'auto',
						display: v.visibility ? undefined : 'none',
					}}
				><strong>{v.title}</strong>{resize}</th>
			)
		})

		return (
			<thead id="list_head">
				<tr>{columns}</tr>
			</thead>
        )
	}
}

/**
 * 列表主体
 */
export class ListBody extends Component {

	render() {

		const {list, column} = this.props

		const lines = (line, key) => {

			let columns = column.map((v, i) => {
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

			return (
				<tr key={key}>
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
