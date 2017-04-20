import React, {Component} from 'react'

import {Link} from 'react-router'

import {createStore} from 'redux'

import {connect} from 'react-redux'

import {VisibleHeader} from './common/header'
import {Sidebar} from './common/sidebar'
import {VisibleLogin} from './admin/login'

class Application extends Component {

    render() {

        if (this.props.logined) {
            return (
                <div className="manage">
                    <VisibleHeader />
                    <Sidebar />
					{this.props.children}
                </div>
            );
        } else {
            console.log("Application", this.props)
            return <VisibleLogin />
        }
    }
}

export const WebApplication = connect((state) => {
    return {logined: state.common.logined}
}, (dispatch) => {
    return {
        /*onSubmit: () => {
				dispatch({
					type: 'LOGIN',
					filter: ""
				});
		}*/
    };
})(Application)
