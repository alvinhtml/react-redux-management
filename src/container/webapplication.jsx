import React, {Component} from 'react'

import {Link} from 'react-router'

import {createStore} from 'redux'

import {connect} from 'react-redux'

import {Header} from './common/header'
import {Sidebar} from './common/sidebar'
import {Login} from './admin/login'

class Application extends Component {

    componentWillMount() {

    }

    render() {

        if (this.props.logined) {
            return (
                <div className="manage">
                    <Header />
                    <Sidebar />
					{this.props.children}
                </div>
            );
        } else {
            console.log("Application", this.props)
            return <Login />
        }
    }
}

export const WebApplication = connect((state) => {
    return {logined: state.common.logined}
}, (dispatch) => {
    return {
        onWillMount: () => {
				dispatch({
					type: 'LOGIN',
					filter: ""
				});
		}
    };
})(Application)
