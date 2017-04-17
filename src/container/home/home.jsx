import React, { Component } from 'react';

import {
	Link
} from 'react-router';

import {
	createStore
} from 'redux';

import {
	connect
} from 'react-redux';



export class Home extends Component {

	render() {


		return (<div className="main-box"></div>)
	}

}


/*export class Myselect extends Component {
	render() {
		const {id, name, selected, options} = this.props;
		return (<select name={name} id={id}>
		{
		   	options.map(function (option) {
		    	return <option {selected ? "selected" : ''} value="{option.value}">{option.name}</option>
		    })
		}
		</select>)
	}
}

var selectOption = [{
		value: 1,
		name: '选项1'
},{
		value: 2,
		name: '选项2'
},{
		value: 3,
		name: '选项3'
}];

<Myselect name="select1" id="select1" selected="2" options={selectOption}></Myselect>*/
