import React from 'react';

import {
	Link
} from 'react-router';

import {
	createStore
} from 'redux';

import {
	connect
} from 'react-redux';



export class AdminList extends Component {
	//注意，组件内部也可能有时候会暴露事件给外部调用，和参数传递的原理一样
	render() {
		const {
			list,
			config
		} = this.props
		
		return ()
	}

	//严格来说，这些暴露给外部的参数都需要做验证,常用的验证类型为array，bool，func，number，object，string
	static propTypes = {
		title: React.PropTypes.string.isRequired
	}
}

export {
	AdminList,
	AdminForm
}