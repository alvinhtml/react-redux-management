import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

//引入各个容器组件
import {Login} from './container/admin/login'
import {Home} from './container/home/home'
import {AdminList, AdminForm} from './container/admin/admin'

import {Header} from './container/common/header'
import {Sidebar} from './container/common/sidebar'

//引入Action创建函数
import {authInfo} from './actions/actions'


class Manage extends Component {
    render () {
        console.log("管理界面")
        return (
            <div className="manage">
                <Header />
                <Sidebar />
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/admin" component={AdminList}/>
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
                            //console.log("EEE-login",urls)
                            let url = urls.location.search.split("=")[1]
                            return this.props.logined ? <Redirect to={url} /> : <Login />
                        }} />
                    <Route key='/' path="/" render={(urls) => {
                            //console.log("EEE-manage",urls)
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
			dispatch(authInfo())
		}
    };
})(AppUI)

export default App

// <meta http-equiv="refresh" content="0;url=http://www.baidu.com">
// <div className="manage">
//     <Header />
//     <Sidebar />
//     <Switch>
//         <Route exact path="/" component={Home}/>
//         <Route path="/home" component={Home}/>
//         <Route path="/admin" component={Adminlist}/>
//     </Switch>
// </div>
