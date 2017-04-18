import React, { Component } from 'react'



class Dropdown extends Component {
	render() {

		const {className, options} = this.props

		let emailInput, passwordInput

		return (
			<div className="dropdown {className}">
                <div className="dropdown-toggler"><i className="icon-bell"></i><span className="badge teal">6</span></d>
                <div className="dropdown-main dropdown-menu dropdown-dark">
                    <ul>
                        <li>menu 1</li>
                        <li>menu 2</li>
                    </ul>
                </div>
            </div>
		)
	}
}

const propss = {
    className:'',
    title:'',
    icon:'',
    badge:'',

}

class DropMenu extends Dropdown {
    render() {

    }
}
