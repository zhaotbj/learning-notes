## 第二章 设计高质量的react组件

### props和pros验证
style的值有两层花括号，外层花括号代表是jsx的语法，内层的花括号代表这是一个对象常量。


```javascript
 <Counter onUpdate={this.onCounterUpdate} caption="First" />
        <Counter onUpdate={this.onCounterUpdate} caption="Second" initValue={this.initValues[1]} />
        <Counter onUpdate={this.onCounterUpdate} caption="Third" initValue={this.initValues[2]} />
```


```javascript
// 在子组件中进行props 验证
Counter.propTypes = {
  caption: PropTypes.string.isRequired,
  initValue: PropTypes.number,
  onUpdate: PropTypes.func
};
```
也可以给props设置默认值
```

```
### prop 和state的对比

- prop 用于定义外部的接口，state用于记录内部的状态
- prop 的赋值在外部世界使用组件时，state的赋值在组件内部，
- 组件不应该改变prop的值，而state存在的目的就是让组件来改变的
- 组件的state修改 使用 setstate
注意：组件不能去修改传入的props的值，
一个子组件不能修改props的值。

### 组件的声明周期
分为三个大的过程
- 装载过程
- 更新过程
- 卸载过程

###  装载过程 当组件第一次被渲染的时候，依次调用的函数是
- constructor
- componentWillmount
- render
- componentDidMount


#### - constructor
- 初始化state
- 绑定成员函数的this环境

在ES6语法下，类的每个成员函数在执行时的this并不是和类实例自动绑定的。而在构造函数中，this就是当前组件实例，所以为了方便将来的调用，往往在构造函数中将这个实例的特定函数绑定this为当前实例。
```javascript
this.func=this.func.bind(this)
```
render 函数不做实际的渲染动作，它只是返回一个JSX描述的结构，最终由react来操作渲染过程。
如果这个组件不需要渲染的话就用render函数返回一个null 或者false

componentWillmount会在render函数之前被调用，componentDidMount会在render函数之后被调用，这两个函数就像是render函数的前哨和后哨，一前一后，把render函数夹住，正好分别做render前后的必要工作。

componentWillMount 将要装载  这个时候没有人会渲染出来的结果

componentDidMount 调用的时候组件已经被装载到DOM树上了。
render函数被调用完之后，componentDidMount函数并不是会被立刻调用，componentDidMount被调用的时候，render函数返回的东西已经引发了渲染，组件已经被‘装载’到了DOM树上。

一个例子
渲染三个组件，当所有三个组件的render函数都被调用之后，三个组件的componentDidMount才连在一起被调用。
之所以会出现这种情况，是因为render函数本身并不是一往DOM树上渲染或者装载内容，它只是返回一个JSX表示的对象，然后有react库来根据返回对象决定如何渲染。而react库肯定是吧所有组件返回的结果综合起来，才能知道该如何产生对应的DOM修改。
所以，只有react库调用三个组件的render函数之后，才有可能完成装载。

在componentDidMount调用的时候，组件已经被装载到DOM树上了，可以获取渲染出来的任何dom。

### 更新过程
- shouldCompontentUpdate
- componentWillUpdate
- render
- componentDidUpdate

- shouldCompontentUpdate
而shouldCompontentUpdate 决定了一个组件什么时候不需要渲染，
提高react组件性能。
render 和shouldCompontentUpdate函数，render函数返回结果将用于构建dom对象，shouldCompontentUpdate函数返回的是一个布尔值，告诉react库这个组件在这次更新过程中是否要继续。


在更新的过程中，react库先调用而shouldCompontentUpdate函数，如果这个函数返回true，那就会继续更新过程，接下来调用reader函数，反之，如果得到的是一个false，那就立刻停止更新过程，也就不会引发后续的渲染了。

```javascript
 shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.caption !== this.props.caption) ||
           (nextState.count !== this.state.count);
  }
```
shouldCompontentUpdate 接收两个参数nextProps, nextState值，
在通过this.setState函数引发更新过程，并不是立刻更新组件的state值，在执行到函数 shouldComponentUpdate的时候，this.state依然是this.setState函数执行之前的值，所以我们要做的实际上就是在nextProps、nextState、this.props和this.state中互相对比。

- componentWillUpdate和componentDidUpdate

如果shouldCompontentUpdate函数返回的是true，react接下来就会依次调用对应组件的componentWillUpdate、render和componentDidUpdate函数。

###  卸载过程
componentWillUnmount， 当react组件要从dom树上删除掉之前被调用。 这个函数适合做一些清理性工作。


# redux
redux 三个基本原则
- 唯一数据源
- 保持状态只读
- 数据改变只能通过纯函数完成


1. 唯一数据源
指应用的状态数据应该只存储在唯一的一个store上
2. 保持状态只读
不能直接修改状态，要修改store的状态，必须要通过派发一个action对象完成。
数据改变只能通过纯函数reducer完成

3. reducer有两个参数是state，action
第一个是当前的状态，第二个是action是接收到的action对象。 reducer函数要做的事情，就是根据state和action的值产生一个新的对象返回，注意reducer必须是纯函数，也就是说函数的返回结果必须完全由参数state和action决定，而且不产生任何副作用，也不会修改参数state和action对象。

### react-redux
```
export default connect(mapStateToProps, mapDispatchToProps)(EditTable);
```
react-redux 的两个主要的功能
connect 连接容器组件和傻瓜组件
provider 提供包含store的context
connect是react-redux提供的方法，这个方法接受两个参数mapStateToProps和 mapDispatch-ToProps，执行结果依然是一个函数，说以才可以在后面又加一个圆括号，把connect函数执行的结果立刻执行，这一次参数是counter这个傻瓜组件。

### connect
这个connect函数具体做了什么工作呢？

- 把store上的状态转化为内层傻瓜组件的prop
- 把内层傻瓜组件中的用户动作转化为派发给store的动作。
这两个工作一个是内层傻瓜对象的输入，一个是内层傻瓜对象的输出。

这两个的工作，是把store上的状态转化为内层组件的props，其实就是一个映射关系，去掉框架，最后就是一个mapStateToProps函数该做的事情。


### provider


## 第五章 react组件的性能优化

单个组件的性能优化
react利用虚拟DOM来提高渲染性能，虽然每一次页面更新都是对组件的重新渲染，但是并不是将之前渲染的内容全部抛弃重来，借助虚拟DOM,react能够计算出对dom树的最少修改

但是计算虚拟DOM也是一个很复杂的过程。

shouldComponentUpdate是默认方式，默认返回true，也就是说默认每次更新的时候都要调用所有的生命周期函数，包括render函数，根据render函数的返回结果计算虚拟dom。

就是在编写逻辑的时候返回false。
自己每个组件都写很麻烦，
二react-redux库，

```
export default connect(mapStateToProps, mapDispatchToProps)(EditTable);
```

connect的过程实际上产生了一个无名的react组件类，这个类定制了shouldComponentUpdate函数的实现，实现逻辑是比对这次传递给内层组件的props和上一次的props，她的渲染结果完全由传入的props决定，如果props没有变化，那就可以认为渲染结果肯定一样。

问题是react-redux的渲染比较是浅层比较，简单的说如果prop的类型是复杂对象，传入两次相同的props也会从新渲染。

为什么是浅层比较
不知道prop是有多少层

### 多个子组件的情况
使用key，给每一个子组件增加一个key属性，且这个key是唯一的，这个key不应该是数组的下标