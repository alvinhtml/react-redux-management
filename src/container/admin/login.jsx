import React, { Component } from 'react'

import {
	Link
} from 'react-router'

import {
	createStore
} from 'redux'

import {
	connect
} from 'react-redux'

//引入Action创建函数
import {loginFetch} from '../../actions/actions'


class LoginUI extends Component {
	render() {

		const {logo, logoname, logined, version, error, message, onSubmit, onKeyPress} = this.props

		//重载以获取新的csrf_token
		if(error === 1) {
			//window.location.reload(true)
		}

		let emailInput, passwordInput

		return (
			<div className="container">
                <div className="login">
                    <div className="logo" onClick={e=>console.log(e)}>
                        <img src={logo} alt={logoname} />
                    </div>
                    {
                        (error === 0 || error === 1) ? (
                            null
                        ) : (
                            <p className="error-message">{message}</p>
                        )
                    }
                    <label><input onKeyPress={(e)=>onKeyPress(e,emailInput.value, passwordInput.value)} type="text" placeholder="Username" name="adminname" ref={n=>emailInput=n} /></label>
                    <label><input onKeyPress={(e)=>onKeyPress(e,emailInput.value, passwordInput.value)} type="password" placeholder="Password" name="adminpassword" ref={n=>passwordInput=n} /></label>
                    <button className="type-button" onClick={(e)=>onSubmit(emailInput.value, passwordInput.value)}>登录</button>
                    <p className="remember-me">软件版本：{version}</p>
                </div>
            </div>
		)
	}
}

export const Login = connect(
	(state) => {
		return state.common
	},
	(dispatch, ownProps) => {
		return {
			onSubmit: (email, password) => {
				dispatch(loginFetch({email, password},'/common'))
			},
			onKeyPress: (event, email, password) => {
				if(event.charCode === 13){
					dispatch(loginFetch({email, password},'/common'))
				}
			}
		};
	}
)(LoginUI)
