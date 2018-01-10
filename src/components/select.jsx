import React, { Component } from 'react'

import {
	connect
} from 'react-redux'

//引入action类型常量名
import {
	GET_OU_IN_COMPONENT
} from '../constants'


//引入Action创建函数
import {ActionCreator, ActionGet, ActionPost, FetchPost} from '../actions/actions'


class OuSelectUI extends Component {

	constructor(props) {
		super(props)

		this.state = {
			opened: false,
			value: '',
			text: '请选择'
		}

		//ES6 类中函数必须手动绑定
		this.handleClick = this.handleClick.bind(this)
		this.selectEvent = this.selectEvent.bind(this)

		document.addEventListener('mouseup', (e) => {
			this.setState({
				opened: false
			})
		})
	}

	componentWillMount() {
        this.props.getList(this.props.parentid)

		let ouObjectList = this.props.ouObjectList
		for (let v of ouObjectList) {
			if (this.props.value == v.id && this.state.value === '') {
				this.setState({
					value: v.id,
					text: v.name
				})
				break;
			}
		}
    }

	componentWillReceiveProps(nextProps) {
		let ouObjectList = nextProps.ouObjectList
		for (let v of ouObjectList) {
			if (this.props.value == v.id) {
				this.setState({
					value: v.id,
					text: v.name
				})
				break;
			}
		}
	}

	handleClick(event) {
		this.setState({
			opened: !this.state.opened
		})
	}

	mouseupEvent(event) {
		event.nativeEvent.stopImmediatePropagation()
		event.stopPropagation()
	}

	selectEvent(event) {
		this.setState({
			opened: false,
			value: event.target.getAttribute('data-val'),
			text: event.target.textContent
		})
	}

	render() {

		const {name, ouObjectList, className, value} = this.props

		let options = ouObjectList.map((v, i) => {
			return <li key={i} data-val={v.id} onClick={this.selectEvent}>{v.name}</li>
		})

        return (
			<div className={ 'iselect ' + className + (this.state.opened ? ' open' : '')} onMouseUp={this.mouseupEvent}>
				<input name={name} type="hidden" value={this.state.value} ref='inputSelect' />
				<div className="iselect-handle" onClick={this.handleClick}></div>
				<div className="iselect-value" onClick={this.handleClick}>{this.state.text}</div>
				<div className="iselect-search">
					<label className="input-append"><input name={"iselect" + name} type="text" defaultValue="" /><span className="add-on"><i className="icon-magnifier"></i></span></label>
				</div>
				<ul>{options}</ul>
			</div>
        );
    }

}

export const OuSelect = connect(
	(state) => {
		return {ouObjectList: state.common.ouObjectList}
	},
	(dispatch, ownProps) => {
		return {
			getList: (ouid, search) => {
				dispatch(ActionGet(GET_OU_IN_COMPONENT, '/api/ou/component', 'common'))
			}
		};
	}
)(OuSelectUI)
