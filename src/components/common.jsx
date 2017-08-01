import React, { Component } from 'react'

import { Link } from 'react-router';



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
 * @type {[type]}
 */
export class Pagelist extends Component {

	constructor(props) {
		super(props)

		this.gotoPage = this.props.page

		//ES6 类中函数必须手动绑定
		this.pageClickEvent = this.pageClickEvent.bind(this)
		this.inputEnterEvent = this.inputEnterEvent.bind(this)
		this.gotoClickEvent = this.gotoClickEvent.bind(this)
	}

	pageClickEvent(event) {
		this.getList({
			page: event.currentTarget.getAttribute('data-val')
		})
	}

	inputEnterEvent(event) {
		if (event.charCode === 13){
			this.getList({
				page: this.gotoPage
			})
		}
	}

	gotoClickEvent(event) {
		this.getList({
			page: this.gotoPage
		})
	}

	render() {

		const {count, limit, page} = this.props

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
				let p = begin + i
				pages.push(<a key={p} onClick={this.pageClickEvent} data-val={p} className={p == page ? 'active' : ''}>{p}</a>)
			}


            return (
                <div className="pagelist">
                    <b>{count}</b>条信息 共<b>{pageCount}</b>页
                    转到 <input onKeyPress={this.inputEnterEvent} type="text" onChange={n=>this.gotoPage=n} defaultValue={page} /> 页
                    <a onClick={this.gotoClickEvent}>Go</a>
                    <a className="page-prev" data-val={page - 1 ? page - 1 : page} onClick={this.pageClickEvent}><i className="icon-arrow-left"></i></a>
                    {pages}
                    <a className="page-next" data-val={page + 1 < pageCount ? page + 1 : pageCount} onClick={this.pageClickEvent}><i className="icon-arrow-right"></i></a>
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
		this.inputEnterEvent = this.inputEnterEvent.bind(this)
		this.searchSubmitEvent = this.searchSubmitEvent.bind(this)
	}

    inputEnterEvent(event) {
        if(event.charCode === 13){
			this.getList({
				search: this.search
			})
        }
    }

    searchSubmitEvent(event) {
		this.getList({
			search: this.search
		})
    }

	render() {

		const {searchMode, search, setSearchMode} = this.props

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
 * @type {String}
 */
export class ListSearcher extends Component {

	constructor(props) {
		super(props)

		this.search = this.props.search

		//ES6 类中函数必须手动绑定
		this.inputEnterEvent = this.inputEnterEvent.bind(this)
		this.searchSubmitEvent = this.searchSubmitEvent.bind(this)
	}

    inputEnterEvent(event) {
        if(event.charCode === 13){
			this.getList({
				search: this.search
			})
        }
    }

    searchSubmitEvent(event) {
		this.getList({
			search: this.search
		})
    }

	render() {

		const {searchMode, search, setSearchMode} = this.props

		return (
            <div className="olist-tool olist-search">
                <input type="text" className="form-control" ref={n=>this.search=n} placeholder={searchMode} defaultValue={search} onKeyPress={this.inputEnterEvent} />
                <div className="olist-where dropdown"><a className="dropdown-toggle"><i className="fa fa-angle-down"></i></a>
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

	render() {

		const {column, limit, changeLimitEvent, changeColumnEvent} = this.props

		const limitArray = [10,20,30,50,100,200]

		let limits = limitArray.map((v, i) => {
			return (
                <span key={i} onClick={e => changeLimitEvent(e.currentTarget.getAttribute("data-val"))} data-val={v} className={v == limit ? 'active' : ''}>{v}</span>
            )
		})

		let columns = column.map((v, i) => {
			return (
				<span key={i} onClick={e => changeColumnEvent(e.currentTarget.getAttribute("data-id"))} className={v.visibility ? 'active' : ''} data-id={v.name}>{v.title}</span>
			)
		})

		return (
			<div className="olist-tool dropdown">
                <a className="bg-teal dropdown-toggle"><i className="icon-settings"></i></a>
                <div className="dropdown-main dropdown-menu dropdown-dark dropdown-right">
                    <div className="olist-tool-conf">
                        <h4>每页显示数量</h4>
                        <div className="tools-span-list page-limit">
                            {limits}
                        </div>
                        <h4>显示项目</h4>
                        <div className="list-column">
                            {columnhtml}
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

	render() {

		const {column, orderbyEvent} = this.props

		let columns = column.map((v, i) => {
			let resizer = v.resize ? <span className="resize"></span> : ''
			return (
				<th
					key = {i}
					className = {v.order ? v.order : ''}
                    onClick = {orderbyEvent}
                    data-order = {v.order}
					data-val = {v.name}
					style = {v.width ? 'width:' + v.width + 'px' : ''}
				>{v.title}{resizer}</th>
			)
		})

		return (
			<thead id="listThead">
				<tr>{columns}</tr>
			</thead>
        )
	}
}

export class ListBodyer extends Component {

	render() {

		const {list} = this.props



		const lines = (line) => {

			let columns = column.map((v, i) => {
				return (
					<td key={i}>{line[v.name]}</td>
				)
			})

			return (
				<tr>
					{columns}
				</tr>
			)
		}

		let lists = list.map((v, i) => {
			return lines(v);
		})


		return (
			<thead id="listThead">

			</thead>
        )
	}
}
