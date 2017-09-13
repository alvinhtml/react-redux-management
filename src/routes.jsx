import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

//引入各个容器组件
import {WebApplication} from './container/webapplication'
import {Login} from './container/admin/login'
import {Home} from './container/home/home'
import {Adminlist} from './container/company/adminlist'

import {Header} from './container/common/header'
import {Sidebar} from './container/common/sidebar'

// export class App extends Component {
//
// 	render () {
//         return '<div>hello</div>'
//     }
// }
// export const App = function(){
//     return '<div></div>'
// }

export const App = () => (
    <Router>
        <Route path="/login" component={Login}/>
    </Router>
)


// <div className="manage">
//     <Header />
//     <Sidebar />
//     <Switch>
//         <Route exact path="/" component={Home}/>
//         <Route path="/home" component={Home}/>
//         <Route path="/admin" component={Adminlist}/>
//     </Switch>
// </div>
