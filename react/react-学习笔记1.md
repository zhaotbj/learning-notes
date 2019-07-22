# 总结
# 样式绑定
# 引入图片的三种方式
# 循环数据的三种方式
# react绑定事件改变this指向的三种方式， 事件传值

# 表单事件
# 1.事件获取 2、使用ref获取输入框的值

# 键盘事件

# 实现vue-v-modle双向数据绑定

# form表单

# React组件通信的几种方式

## 父子组件传值（react 父子组件通信）：
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