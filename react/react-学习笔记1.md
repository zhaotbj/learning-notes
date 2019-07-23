# 总结
# 动态绑定样式
- 绑定类名`<div className={this.state.color}>我是一个红的的div  1111</div>`
- 绑定行内样式`<div style={{"color":'red'}}>我是一个红的的 div  行内样式</div>`
```html
this.state={
	msg:'我是一个home组件',
	title:'我是一个title',
	color:'red',
	style:{
		color:'red',
		fontSize:'40px'
	}
}
<div style={this.state.style}>我是一个红的的 div  行内样式</div>
```
# 引入图片的三种方式
```javascript
import logo from '../assets/images/1.jpg';
<img src={logo} />
```
- h5异步加载
```html
<img src={require('../assets/images/1.jpg')} />html
```
- 线上
```html
<img src="https://www.baidu.com/img/xinshouye_353af22a7f305e1fb6cfa259394dea9b.png" />
```

                
# 循环数据的两种方式

```
state中的数据
list:['11111111111','222222222222','3333333333333'],
list2:[<h2 key='1'>我是一个h2</h2>,<h2 key='2'>我是一个h2</h2>],
 render(){
   var result=this.state.list.map(function(item,index){
      return (
        <li key={index}>{item}</li>
      )
    })
	reutn (<p>{result}</p>)
	}
	
	{
	  this.state.list2.map((item,index)=>{
		return <li key={index}>{item.title}</li>
	  })
    }
		
```
# react绑定事件改变this指向的三种方式， 事件传值
- 直接值函数后面加bind(this, 传参) 
- 第二种改变this指向的方法
- 使用箭头函数 推荐的用法
```javascript
    constructor(props){
        this.getMessage= this.getMessage.bind(this);
    }

getName=()=>{
	alert(this.state.username);
}
```
# 表单事件

# 1.事件获取 2、使用ref获取输入框的值
```javascript
//<input onChange={this.inputChange} /> <button onClick={this.getValue}>获取表单输入的值</button>

//事件对象获取值
inputChange=(event)=>{
this.setState({
  userName: event.target.value
})
}

// ref获取值
// <input ref="user" onChange={this.inputChange} /> <button onClick={this.getValue}>获取表单输入的值</button>
  inputChange=()=>{
    let val=this.refs.user.value
    this.setState({
      userName: val
    })
  }
```
# 键盘事件


# 实现vue-v-modle双向数据绑定
 model改变影响View    view改变反过来影响model
 ```javascript
 import React, { Component } from 'react';
class Vmode extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username:'张三'
     }
  }
  changeValue=(e)=>{
    this.setState({
      username:e.target.value
    })
  }
  handleClick=(e)=>{
    this.setState({
      username:'王五'
    })
  }
  render() { 
    return (
      <div>
        <h1>我是Vmode组件---双向数据绑定</h1>
      <input value={this.state.username} onChange={this.changeValue}/>
      <button onClick={this.handleClick}>改变值</button>
      <br></br>
      {this.state.username}
      <br/>
      <input defaultValue={this.state.username}/>
      </div>
    );
  }
}
export default Vmode;
 ```
# form表单
```html
<h1>react-Form表单</h1>
	<form onSubmit={this.handleSubmit}>
	  用户名：<input type="text" value={this.state.name} onChange={this.handelName} /> <br />
	  性别： <input type="radio" value="1" checked={this.state.sex === '1'} onChange={this.handelSex} />男
	  <input type="radio" value="2" checked={this.state.sex === '2'} onChange={this.handelSex} />女
	  居住城市: <select value={this.state.city} onChange={this.handleCity}>
		{
		  this.state.citys.map(function (item, index) {
			return <option key={index}>{item}</option>
		  })
		}
	  </select>
	  <br />
	  爱好：{
		this.state.hobby.map((item,index)=>{
		  return (
			<span key={index}>
			  <input type="checkbox" checked={item.checked} onChange={this.handleHobby.bind(this,index)} />{item.title}
			</span>
		  )
		})
	  }
	  <br />
	  <textarea value={this.state.info} onChange={this.handleInfo}></textarea>
	  <br />
	  <input type="submit" value="提交" />
	</form>
```
# React组件通信的几种方式

## 父子组件传值（react 父子组件通信)
- 父组件给子组件传值 
  1. 绑定属性。就是给子组件定义一个属性`<Child title={this.state.title} />`，之后在子组件里面 this.props.xxx，获取传递的值。
说明：父组件不仅可以给子组件传值，还可以给子组件传方法，以及把整个父组件的实例传给子组件（this）,可以在子组件拿到父组件的实例。

- 子组件传递给父组件
  1. 通过ref。就是父组件调用子组件的时候指定ref的值 `<Child ref='xxx' />`，在父组件中通过this.refs.xxx  获取整个子组件整个实例  (dom（组件）加载完成以后获取 )
  2. 通过子组件调用父组件时传递参数
```javascript
//父组件
import React, { Component } from 'react'

import Child from './Child'
class Parent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title:'我是父组件的数据'
    }
  }
  run=()=>{
    alert('父组件方法')
  }
  //父组件主动调用子组件的数据和方法
  getChild=()=>{
    console.log(this.refs.child)
  }
  // 子组件传递给父组件数据
  chlidToParent=(value)=>{
    console.log('子组件传来的',value)
  }
  render() {
    return (
    <div>
      <h3>我是父组件</h3>
      <button onClick={this.getChild}>父组件通过ref获取子组件的实例</button>
      <Child ref="child" title={this.state.title} run={this.run} Parent={this}/>
      <br />
    </div>
    );
  }
}

export default Parent;

```

```javascript
// 子组件
import React, { Component } from 'react'
class Child extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  // 获取父组件实例
  getParent=()=>{
    console.log(this.props.Parent)
  }
  render() { 
    return ( 
      <div>
        <h3>我是子组件</h3>
        父组件传递的数据---{this.props.title}
        <br /><br />
        <button onClick={this.props.run}>接受父组件方法</button>
        <br /><br />
        <button onClick={this.getParent}>接受父组件整个实例</button>
        <br /><br />
        {/* 子传夫 */}
        <button onClick={this.props.Parent.chlidToParent.bind(this, '我是子组件数据')}>子传夫</button>
      </div>
     );
  }
}
export default Child;
```
### props验证
 propTypes  defaultProps 
 验证夫组件传递给子组件的值
 - defaultProps:父子组件传值中，如果父组件调用子组件的时候不给子组件传值，可以在子组件中使用defaultProps定义的默认值
 - propTypes：验证父组件传值的类型合法性
 ```javascript
 // 默认值
Child.defaultProps={
  title:"默认值"
}
//验证
 Child.propTypes={
  count:PropTypes.number
}
 ```