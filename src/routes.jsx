import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

//引入各个容器组件
import {Login} from './container/admin/login'
import {Home} from './container/home/home'
import {AdminList, AdminForm} from './container/admin/admin'
import {Termhome} from './container/company/term'

import {Header} from './container/common/header'
import {Sidebar} from './container/common/sidebar'

//引入Action创建函数
import {ActionGet} from './actions/actions'

//引入action类型常量名
import {
	GET_AUTH_INFO
} from './constants'


//引入cookie操作库
import Cookies from 'js-cookie'

class Manage extends Component {

    constructor(props) {
		super(props)

		let sidebar = Cookies.get("sidebar")

		if (!sidebar) {
			 Cookies.set("sidebar", "opened", { path: '/' })
			 sidebar = "opened"
		}

        this.sidebar = sidebar
	}

    render () {
        return (
            <div className={"manage " + this.sidebar} id="manage">
                <Header />
                <Sidebar />
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/admin/form/:id" component={AdminForm}/>
                    <Route path="/admin/form" component={AdminForm}/>
                    <Route path="/admin" component={AdminList}/>
                    <Route path="/term" component={Termhome}/>
                </Switch>
            </div>
        )
    }
}

class AppUI extends Component {

    componentWillMount() {
        this.props.onWillMount();
    }

    render () {

        return (
            <Router>
                <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={3000} transitionLeaveTimeout={3000}>
                    <Switch>
                        <Route key='/login' exact path="/login" render={(urls) => {
                            let url = urls.location.search.split("=")[1]
                            return this.props.logined ? <Redirect to={url} /> : <Login />
                        }} />
                    <Route key='/' path="/" render={(urls) => {
                            let backurl = {
                                pathname: '/login',
                                search: '?=' + urls.location.pathname
                            }
                            return this.props.logined ? <Manage /> : <Redirect to={backurl} />
                        }} />
                    </Switch>
                </ReactCSSTransitionGroup>
            </Router>
        )
    }
}


const App = connect((state) => {
    return {logined: state.common.logined}
}, (dispatch) => {
    return {
        onWillMount: () => {
			dispatch(ActionGet(GET_AUTH_INFO, '/api/authinfo', 'common'))
		}
    };
})(AppUI)

export default App
