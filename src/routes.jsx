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

// class Aa extends Component {
//     constructor(props) {
//     	super(props)
//     	//ES6 类中函数必须手动绑定
//     	this.closeFileHandle = this.closeFileHandle.bind(this)
//     }
//     render () {
//         return (
//             <div>h
//                 <Ab ref="fillSelect" />
//                 <button onClick={this.closeFileHandle}>1111</button>
//             </div>
//         )
//     }
//     closeFileHandle(){
//         console.log(this.refs.fillSelect);
//         this.refs.fillSelect.onCloseFileHandle()
//     }
// }
// class Ab extends Component {
//     render () {
//         return (
//             <div></div>
//         )
//     }
//     onCloseFileHandle () {
//         alert("这样写肯定行!");
//     }
// }

class Manage extends Component {
    render () {
        return (
            <div className="manage">
                <Header />
                <Sidebar />
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/admin" component={Adminlist}/>
                </Switch>
            </div>
        )
    }
}

const App = () => (
    <Router>
        <div>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/" component={Manage} />
            </Switch>
        </div>
    </Router>
)
export default App


// <div className="manage">
//     <Header />
//     <Sidebar />
//     <Switch>
//         <Route exact path="/" component={Home}/>
//         <Route path="/home" component={Home}/>
//         <Route path="/admin" component={Adminlist}/>
//     </Switch>
// </div>
