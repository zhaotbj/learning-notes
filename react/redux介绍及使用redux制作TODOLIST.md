

> 快速介绍：

react中如何使用redux 以及和结合redux使用的2个中间件Redux-thunk和redux-saga
这两个插件是redux的不是react
React-Redux
这是一个React生态中常用组件，它可以简化Redux流程,需要注意的是概念：React、Redux、React-redux是三个不同的东西）

# redux
Redux中，可以把数据先放在数据仓库（store-公用状态存储空间）中，这里可以统一管理状态，然后哪个组件用到了，就去stroe中查找状态。如果途中的紫色组件想改变状态时，只需要改变store中的状态，然后其他组件就会跟着中的自动进行改变。

## Flux和Redux的关系

Redux就是Flux的升级版本，早期使用React都要配合Flux进行状态管理，但是在使用中，Flux显露了很多弊端，比如多状态管理的复杂和易错。所以Redux就诞生了，现在已经完全取代了Flux



## 调试
安装谷歌插件  Redux DevTools

配置Redux Dev Tools
```javascript
import { createStore } from 'redux'  //  引入createStore方法
import reducer from './reducer'    
const store = createStore(reducer,
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) // 创建数据存储仓库
export default store   //暴露出去
```
`window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()`
这句话的意思就是看window里有没有这个方法

这步完成后，就可以启动项目测试一下了，你会发现State数据变的一目了然，以后再进行Redux调试，就会变的非常简单了。

## redux官方图片

![](./images/redux_flow.png)


### 使用todolist案例体验Redux的流程

#### 1. 创建store，reduce
在src下建一个store文件夹
```
src
———— store
    |—— index.js // 就是整个项目的store文件
    |—— reducer.js // 一个有管理能力的模块 这就是Reducers

    |—— actionCreators.js // 后续优化 组件中定义的action提取出来
    |—— actionType.js  //  后续优化 将Action的 Types提取出来 单度写入一个文件
```
#### 1. 编写创建store仓库
```javascript
// index.js
import { createStore } from 'redux'  // 引入createStore方法
const store = createStore()          // 创建数据存储仓库
export default store                 //暴露出去
```


```javascript
// reducer.js

const defaultStore = { //默认数据 
  inputValue: "Write Something",
  list: [1,2,3,4,5]
}

export default (state = defaultStore, action) => {  //就是一个方法函数
  return state
}
```

#### 2. 组件获得store中的数据
```javascript
import store from './store'
constructor(props){
    super(props)
    this.state=store.getState();
}
```

#### 3. 在组件中动态修改store中的值

创建Action 改变store里面的state就要使用action

action 是要通过 dispatch()方法传递给store，
```javascript
// 给input绑定onchange事件
changeInputValue(e){
    const action ={
        type:'changeInput',
        value:e.target.value
    }
    store.dispatch(action)  // 通过dispatch()方法传递给store
}
```
传递给store之后再 Reducer里编写业务逻辑
### store的自动推送策略
store只是一个仓库，它并没有管理能力，它会把接收到的action自动转发给Reducer，

- state: 指的是原始仓库里的状态。
- action: 指的是action新传递的状态
Reducer可以拿到了原来的数据和新传递过来的数据，现在要作的就是改变store里的值。我们先判断type是不是正确的，如果正确，我们需要从新声明一个变量newState。（记住：Reducer里只能接收state，不能改变state。）,所以我们声明了一个新变量，然后再次用return返回回去。
```javascript
const defaultStore = {
  inputValue: "Write Something",
  list: [1,2,3,4,5]
}
export default (state = defaultState,action)=>{
    if(action.type === 'changeInput'){
        let newState = JSON.parse(JSON.stringify(state)) //深度拷贝state
        newState.inputValue = action.value
        return newState
    }
    return state
}
```
在这里store中的值就改变了，但是视图还是没有拿到改变后的值。

#### 5. store数据更改之后让组件视图进行更新

在组件文件中的constructor，写入下面的代码。
```javascript

constructor(props){
    super(props)
    this.state=store.getState();
    //----------关键代码-----------start
    store.subscribe(this.storeChange) //订阅Redux的状态
    //----------关键代码-----------end
}

// 重新设置state的值
storeChange=()=>{
    this.setState(store.getState())
  }
```
**这时 组件的数据更新了，一个完整的redux流程已经跑通了。 是不是很简单。**

# 案例 使用redux制作todoList

实现增加 、删除功能

```javascript
// TodoList.js
  inputChange=(e)=>{
    const action={
      type:'changeInput',
      value:e.target.value
    }
    store.dispatch(action)
  }
  clickBtn=()=>{
    const action={
      type:'add_item'
    }
    store.dispatch(action)
  }
  deleteItem(index){
    const action={
      type:'delete_item',
      index:index
    }
    store.dispatch(action)
  }


// reducer.js
const defaultStore = {
  inputValue: "Write Something",
  list: [1,2,3,4,5]
}

export default (state = defaultStore, action) => {
  console.log(state, action)

  if(action.type==='changeInput'){
    let newState=JSON.parse(JSON.stringify(state))
    newState.inputValue=action.value
    action.value=''
    return newState
  }
  if(action.type==='add_item'){
    let newState=JSON.parse(JSON.stringify(state))
    newState.list.push(newState.inputValue)
    newState.inputValue=''
    return newState
  }

  if(action.type==='delete_item'){
    let newState=JSON.parse(JSON.stringify(state))
    newState.list.splice(action.index,1)
    return newState
  }
  

  return state
}
```

## 工作中写Redux的小技巧-1

合理的分离让层次更清晰

- 把Action Types 单度写入一个文件， type要大写

写Redux Action的时候，我们写了很多Action的派发，产生了很多Action Types，如果需要Action的地方我们就自己命名一个Type,会出现两个基本问题：

这些Types如果不统一管理，不利于大型项目的服用，设置会长生冗余代码。
因为Action里的Type，一定要和Reducer里的type一一对应在，所以这部分代码或字母写错后，浏览器里并没有明确的报错，这给调试带来了极大的困难。
那我司中会把Action Type单独拆分出一个文件。

在src/store文件夹下面，新建立一个actionTypes.js文件，然后把Type集中放到文件中进行管理。

```javascript
// actionTypes.js
export const  CHANGE_INPUT = 'changeInput'
export const  ADD_ITEM = 'addItem'
export const  DELETE_ITEM = 'deleteItem'
```

引入Reducer并进行更改 和引入 组件
- 工作中写Redux的小技巧-2
将ToDoList组件里很多的Action提取出来，写入actionCreators.js, 放在一个文件里进行管理
```javascript
// action 的提取
import {CHANGE_INPUT}  from './actionTypes'

export const changeInputAction = (value)=>({
    type:CHANGE_INPUT,
    value
})

```
```javascript
// 组件中使用
import {changeInputAction} from './store/actionCreatores'
changeInputValue(e){
        const action = changeInputAction(e.target.value)
        store.dispatch(action)
    }
```
## Redux填三个小坑
- store必须是唯一的，多个store是坚决不允许，只能有一个store空间
- 只有store能改变自己的内容，Reducer不能改变
- Reducer必须是纯函数


···
- Store必须是唯一的
现在看TodoList.js的代码，就可以看到，这里有一个/store/index.js文件，只在这个文件中用createStore()方法，声明了一个store，之后整个应用都在使用这个store。
- 只有store能改变自己的内容，Reducer不能改变

很多新手小伙伴会认为把业务逻辑写在了Reducer中，那改变state值的一定是Reducer，其实不然，在Reducer中我们只是作了一个返回，返回到了store中，并没有作任何改变。我这个在上边的课程中也着重进行了说明。我们再来复习一下Reducer的代码，来加深印象。

Reudcer只是返回了更改的数据，但是并没有更改store中的数据，store拿到了Reducer的数据，自己对自己进行了更新。
- Reducer必须是纯函数

> 先来看什么是纯函数，纯函数定义：如果函数的调用参数相同，则永远返回相同的结果。它不依赖于程序执行期间函数外部任何状态或数据的变化，必须只依赖于其输入参数。

他的返回结果，是完全由传入的参数state和action决定的，这就是一个纯函数。

## 组件UI和业务逻辑的拆分方法

TodoList.js组件是ui和业务组件完全耦合在一起，将jsx的部分拆出来，之后使用组件通信，也就是通过属性传参的方式把需要的值传递给子组件，子组件接受到这些值，进行相应的绑定就好了。

拆出来的组件设置为无状态组件，也就是一个纯函数，他不用再继承任何类，也不存在state，所以他的性能也会比react组件好。

## Axios异步获取数据并和Redux结合

easy-mock模拟接口
```javascript
componentDidMount(){
    axios.get('https://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList').then((res)=>{    
        const data = res.data
        const action = getListAction(data)
        store.dispatch(action)
    })
}
// reducer.js
if(action.type === GET_LIST ){ //根据type值，编写业务逻辑
    let newState = JSON.parse(JSON.stringify(state)) 
    newState.list = action.data.data.list //复制性的List数组进去
    return newState
}
```
真实的场景中在生命周期中不要写过多的逻辑，我们异步处理的方法用中间件进行处理。

在Dispatch一个Action之后，到达reducer之前，进行一些额外的操作，就需要用到middleware（中间件）。在实际工作中你可以使用中间件来进行日志记录、创建崩溃报告，调用异步接口或者路由。 这个中间件可以使用是Redux-thunk来进行增强

两个 redux的中间件， 不是react的，是redux的中间件
1. Redux-thunk中间件 
2. Redux-saga 中间件
![](./images/redux_action.png)

## Redux-thunk中间件
- 安装
```
npm install --save redux-thunk
```
- 配置Redux-thunk组件
```javascript
import { createStore , applyMiddleware ,compose } from 'redux'  //  引入createStore方法
import reducer from './reducer'    
import thunk from 'redux-thunk'

// 利用compose创造一个增强函数，就相当于建立了一个链式函数，代码如下:
const composeEnhancers =   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):compose
// 有了增强函数后，就可以把thunk加入进来了，这样两个函数就都会执行了。
const enhancer = composeEnhancers(applyMiddleware(thunk))
// 这时候直接在createStore函数中的第二个参数，使用这个enhancer变量就可以了，相当于两个函数都执行了。
const store = createStore( reducer, enhancer) // 创建数据存储仓库
export default store   //暴露出去
```
在这个配置中使用了增强函数，是为了使得Redux Dev Tools也能够正常使用。也就是一次可以调用两个函数
## Redux-thunk的使用方法
把向后台请求数据的程序放到中间件中，这样就形成了一套完整的Redux流程，所有逻辑都是在Redux的内部完成的，这样看起来更完美，而且这样作自动化测试也会变动简单很多，所以工作中你还是要尽量按照这种写法来写

在actionCreators.js中编写业务逻辑
```javascript
// actionCreators.js
export const getTodoList=()=>{
  return (dispatch)=>{
    axios.get('https://www.easy-mock.com/mock/5d4a953c382a052ea435900a/example/query').then(res=>{
    
      if(res.data.success){
        
        const action=getListAction(res.data.data.list)
        dispatch(action)
      }
    })
  }
}
// TodoList.js
import {getTodoList }  from './store/actionCreators'
  componentDidMount(){

    const action = getTodoList()
    store.dispatch(action)
  }


// reducer.js
  if (action.type === GET_LIST) {
    let newState = JSON.parse(JSON.stringify(state))
    newState.list=action.data
    return newState
  }
```
项目的越来越大，你会发现把共享state的业务逻辑放到你Redux提示当中是非常正确的，它会使你的程序更加有条理。而在自动化测试的时候，可以直接对一个方法进行测试，
## Redux-saga的安装和配置
Redux-saga 是redux的一个中间件   Redux-thunk也是redux的中间件


# 使用redux-saga
- 安装
```
npm install --save redux-saga
```
- 配置
```javascript
import { createStore , applyMiddleware ,compose } from 'redux'  //  引入createStore方法
import reducer from './reducer'   
//------关键代码----start----------- 
import createSagaMiddleware from 'redux-saga'   //引入saga
const sagaMiddleware = createSagaMiddleware();   //创建saga中间件
//------关键代码----end-----------

const composeEnhancers =   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):compose
//------关键代码----start-----------
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware))
//------关键代码----end-----------

const store = createStore( reducer, enhancer) // 创建数据存储仓库
export default store   //暴露出去
```

- 使用redux-saga时在sagas.js里编写业务逻辑，需要注意的是要使用generater语法来写。
```javascript
// actionCreators.js
export const getListAction=(data)=>(
  {
    type:GET_LIST,
    data
  }
)

export const getTodoList=()=>{
  return (dispatch)=>{
    axios.get('https://www.easy-mock.com/mock/5d4a953c382a052ea435900a/example/query').then(res=>{
    
      if(res.data.success){
        
        const action=getListAction(res.data.data.list)
        dispatch(action)
      }
    })
  }
}



// sagas.js
import { takeEvery ,put} from 'redux-saga/effects'
import {GET_MY_LIST} from './actionType'

import {getListAction} from './actionCreators'
import axios from 'axios'
function* mySaga() {
  //等待捕获action
  yield takeEvery(GET_MY_LIST, getList)
} 


function* getList(){

    const res = yield axios.get('https://www.easy-mock.com/mock/5d4a953c382a052ea435900a/example/query')
   
    const action = getListAction(res.data.data.list)
    yield put(action)

}

export default mySaga;

// TodoList.js
import {getMyListAction }  from './store/actionCreators'
  componentDidMount(){

    const action = getMyListAction()
    store.dispatch(action)
    // 将异步接口统一放在中间件中处理
  }
```

# React-Redux

React-Redux这是一个React生态中常用组件，它可以简化Redux流程,需要注意的是概念：React、Redux、React-redux是三个不同的东西）
- 安装和配置
```
npm install --save redux
npm install --save react-redux
```

- React-redux中的Provider和connect

`<Provider>`提供器讲解
`<Provider>`是一个提供器，只要使用了这个组件，组件里边的其它所有组件都可以使用store了，这也是React-redux的核心组件了。有了<Provider>就可以把/src/index.js改写成下面的代码样式
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList'
//---------关键代码--------start
import { Provider } from 'react-redux'
import store from './store'
//声明一个App组件，然后这个组件用Provider进行包裹。
const App = (
   <Provider store={store}>
       <TodoList />
   </Provider>
)
//---------关键代码--------end
ReactDOM.render(App, document.getElementById('root'));
```
- connect连接器的使用
```javascript
import {connect} from 'react-redux'  //引入连接器
export default connect(xxx,null)(TodoList);
```
- 映射关系的制作
```javascript
// 映射关系就是把原来的state映射成组件中的props属性，比如我们想映射inputValue就可以写成如下代码。
const stateToProps = (state)=>{
  return {
      inputValue : state.inputValue,
      list:state.list
  }
}

// React-redux修改store数据
const dispatchToProps =(dispatch)=>{
  return {
    inputChange(e){

      let action={
        type:'change_input',
        value:e.target.value
      }
      // 派发action到store中
      dispatch(action)
    },
    addBtn(){

      let action={ type:'add_item'}
      dispatch(action)
    }
  }
}
export default connect(stateToProps, dispatchToProps)(TodoList);
```

优化
```javascript
// 将react组件改为无状态组件
// UI组件就是一个方法，减少很多冗余操作，从而提高程序运行性能。
const TodoList=(props)=>{
  let {inputValue, inputChange, addBtn, list}=props
  return ( 
    <div>
      <div>
        <input value={inputValue} onChange={inputChange} />
        <button onClick={addBtn}>提交</button>
      </div>
      <ul>
        {
          list.map((item,index)=>{
            return (
              <li key={index}>{item}</li>
            )
          })
        }
      </ul>
    </div>
   );
}
```

