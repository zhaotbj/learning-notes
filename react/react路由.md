## 在React中使用react-router-dom路由
`npm install react-router-dom --save-dev`
```javascript
import {HashRouter, Route, Switch} from 'react-router-dom';
 <HashRouter>
        <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/detail" component={Detail}/>
    </Switch>
</HashRouter>
    
```
### 动态路由传值
#### 方式1：通过params
路由文件
```javascript
<Route path="/list/:id" component={List} />
```
跳转传参
```javascript
方式1：
 html 方式：<Link to={'/list/'+item.uid}> {item.title}</Link> 
 js方式：this.props.history.push('/user/' + '2')

接受参数：this.props.match.params.id
componentDidMount(){
        console.log(this.props.match)
    }
    
方式2：
this.props.history.push({ pathname: '/home' , params : { id: '2' }})

接收方式：this.props.location.params.id
```
#### 方式2 通过query方式
在刷新页面的时候，参数丢失

1.`<Route path="/home" component={home}/>`
跳转传参
```
HTML方式：<NavLink to={ pathname:'/home', query:{id:3} }>跳转按钮</NavLink>
js方式： this.props.history.push({ pathname: '/three' , query : { id: '6666' }})

```
接收参数
`this.props.location.query.id`

#### 方式3 通过state
同query差不多，只是属性不一样，而且state传递的参数是加密的，query传递的参数是公开的，在地址栏。
```
 HTML方式：<Link to={{ pathname : ' /user' , state : { day: 'Friday' }}}> 
 JS方式： this.props.history.push({ pathname:'/user',state:{day : 'Friday' } })
```
**接收参数**
```
//user页面       
this.props.location.state.day
```
### ReactRouter重定向-Redirect使用
```
直接在render函数里使用就可以了。

html跳转 <Redirect to="/home/" />
现在就可以实现页面的重定向。
```
```
js 跳转
this.props.history.push("/home/");  
```
