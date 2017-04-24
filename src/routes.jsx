import React from 'react'
import {Route, IndexRoute} from 'react-router'

//引入各个容器组件
import {WebApplication} from './container/webapplication'
import {VisibleLogin} from './container/admin/login'
import {Home} from './container/home/home'
import {Term} from './container/company/term'

export default(
    <Route path="/" component={WebApplication}>
        <IndexRoute component={Home} />
        <Route path="home" component={Home} />
        <Route path="login" component={VisibleLogin} />
        <Route path="term" component={Term} />
        <Route path="*" component={Home} />
    </Route>
);
