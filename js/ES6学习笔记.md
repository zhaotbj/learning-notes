# ES6学习笔记
示例代码来自 《新时期的Node.js入门》第三章 用ES6来书写Node
```
  块级作用域
  数组
  函数
  对象
  Set&Map
  类 class
```
## 块级作用域
  - var 可以重复定义、不能限制修改、没有块级作用域
  - let 不能重复定义， 变量，块级作用域
  - const 不能重复定义， 常量，块级作用域
```
// 重复申明 变量提升
var命令会发生”变量提升“现象
let不允许在相同作用域内，重复声明同一个变量； 变量不提升
const 的变量不可以被修改，也不能重复申明
使用const的对象可以修改，因为const内部是依靠指针来判断一个对象是否被修改
```
## 数组

##### 数组实例的 find() 和 findIndex()
 数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，
 所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。
 如果没有符合条件的成员，则返回undefined。
```javascript
[1, 4, -5, 10].find((n) => n < 0)
// -5
[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}) // 10
[1,2,-3,-4].findIndex(function(n){
    return n<0
})// 2
```
- fill()方法
Fill方法用给一个给定的值来填充数组，通常用来初始化一个新建的array对象
```javascript
var a = new Array(5)
console.log(a) // [ <5 empty items> ]
a.fill(0)
console.log(a) //[ 0, 0, 0, 0, 0 ]
// ES5方法实现
// 需要借助apply和map方法
var array = Array.apply(null, new Array(5))
.map(function(){
  return 0
})
console.log(array) // [ 0, 0, 0, 0, 0 ]
// ES6方式实现
const array = new Array(2).fill(0)
```

##### from方法

> Array.from([array-like])=>[x,x,x]

用于将一个array-like object转换为数组

什么是array-like?

例子：js中的参数对象arguments就是一个array-like object我们可以通过[]来访问其中的元素，
也可以使用length。但是不能使用array对象的方法

```javascript
// 新建一个array-like object
var a = {}
var i = 0
while(i<10) {
  a[i]=i*i
  i++
}
a.length = i 
// console.log(a)
/* { '0': 0,
  '1': 1,
  '2': 4,
  '3': 9,
  '4': 16,
  '5': 25,
  '6': 36,
  '7': 49,
  '8': 64,
  '9': 81,
  length: 10 } */
  // 在es5中可以使用array.prototype.slice方法来将array-like对象转换成真正的数组，
  // 不便的是如果要转换一个现有的object
  // 通常还要调用call()方法，否则返回的是一个空数组
  // ES5 
var al = Array.prototype.slice.call(a); // 需要增加call()方法
  al.push(10) 
  console.log(al) // [ 0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 10 ]
// ES6  
var a2= Array.from(a); // form方法不是定义在prototype上的
a2.push(10)
console.log(a2) // [ 0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 10 ]
```
##### 数组的遍历

ES6提供三个新的方法 entries, keys 和values用于遍历数组。
```javascript
// 区别
// keys是对键名的遍历 values是对键值的遍历 entries是对键值对的遍历
var a = ['a', 'b', 'c']
for(let i of a.keys()) {
  console.log(i) // 0 1 2
}

for(let i of a.values()) {
    console.log(i) // a b c
}
for(let i of a.entries()) {
  console.log(i)
}
// [ 0, 'a' ]
// [ 1, 'b' ]
// [ 2, 'c' ]
```
## 函数
#### 参数的默认值
```javascript
// 参数的默认值
// 如果在参数重使用了默认值，那么就不能再方法体内再使用let关键字申明同名的变量
function greed(x='Hello', y='Node') {
  console.log(x, y)
}
greed() // Hello Node

// spread运算符
// 合并数组，在ES5中通常调用concat方法来实现
var arr =[1,2,3]
var arr2=[4,5]
console.log([...arr, ...arr2]) // [ 1, 2, 3, 4, 5 ]
// 将字符串转换为数组
var name=[...'learing']
console.log(name) // [ 'l', 'e', 'a', 'r', 'i', 'n', 'g' ]
// ...也可以作为函数的参数,表示该函数有多个参数,也可以在函数调用时使用
function func(x,y,z){
  return x+y+z
}
var args = [1,2,3]
func(...args) // 6
```
##### 箭头函数
> 优点

箭头函数 可以修复 this作用域

 setTimeout中匿名函数的this的指向，node和浏览器是不同的
```javascript
// 匿名函数中的this
/* var obj={}
obj.func = function() {
  console.log(this)
} */

function foo() {
  setTimeout( function(){
    console.log(this)
  }, 1000);
}
foo()

// 浏览器中是Windows 在node中输出的是一个timeout对象
// 使用箭头函数后，this的指向和foo函数内部相同

// 箭头函数自动绑定this, 实际上匿名函数函数内部没有定义this,仅是引用外面一层的this而已。

// 弄清匿名函数内部的this指向
function foo() {
  this.name='lear'
  setTimeout(() => {
    console.log(this)
    console.log('name--', this.name) // lear
  }, 100);
}
// foo()


// 箭头函数本身没有定义this,在箭头函数内部使用this关键字时，
// 它开始在代码定义的位置向上找，直到遇见第一个this,
// 这带来了很大的便利，但是在构造函数中会出现问题

function Person() {
  this.name ='lear'
}
Person.prototype.greet = ()=> {
  console.log(this.name) // undefined
}
var person =new Person()
person.greet()

// 出现undefined是因为 箭头函数绑定了上一层的环境，就是全局环境中的this
// 这段代码在浏览器中运行时this是Windows
// 不建议在构造函数中使用箭头函数
```
## Set&Map
####  Set 和 WeakSet
Set 的实现类似于数组，和普通数组的不同在于Set中不能包含重复的数据

weakSet和set的区别在于weakset的成员只能是对象， weak是虚弱的意思，表示weakset中存储的对象没有被其他对象所引用，其内存空间就会被回收。
```javascript
var set= new Set([1,2,3,4,5]) // 使用够构造函数初始化一个set
set.add(6) //添加  {1,2,3,4,5}是array-like 使用Array.form()转为array
set.delete(5) // 删除
console.log(set.has(6)) // true
console.log(set) 

for(var i of set) {
  console.log(i)
}

set.clear()  // 清除所有元素
console.log(set) // {}
-----
var wset =new WeakSet()
wset.add({a:1,b:2}) //success
```
- set的遍历
```javascript
 let set = new Set([1,2,3])
 for(let i of set.keys()) {
   console.log(i) // 1 2 3
 }
 for(let i of set.values()) {
   console.log(i) //  123
 }
 for(let i of set.entries()) {
   console.log(i)
 }
//  [ 1, 1 ]
// [ 2, 2 ]
// [ 3, 3 ]
```

##### Map和weakMap
Map 表示键值对组成的有序集合
有序表现在map的遍历顺序即为插入顺序

weakMap的用法和weakSet相似，作为key的变量必须是个对象，也是弱引用类型。
```javascript
var obj = {'c':3}
var map= new Map([['a',1], ['b',2],[obj,3]])
console.log(map.size) // 3  map的大小
console.log(map.has('a')) // true  判断是否存在键值对
console.log(map.get('a')) // 获取摸个键值对的值
map.set('d', 4) // 如果键值不存在，则增加新的键值对，否者覆盖原有的值
map.delete('d') // 删除 返回布尔值

// 遍历map

for(let key of map.keys()) {
  console.log(key)
}
// a
// b
// { c: 3 }]
```
## 对象
- 新的方法object.assign() 

该方法将一个对象的属复制到另一个对象上， ==浅拷贝==。

- 对象的遍历 es5使用 for in es6 Object.keys() 
```javascript
// 浅拷贝
var obj1 = {a: {b:1}}
var obj2 = Object.assign({}, obj1)
obj1.a.b=2
// console.log(obj2.a.b) // 2

// 对象的遍历
var obj={
  'name': 'lear',
  'age': 10,
  'sex': 'male'
}
// 1.使用for in 遍历
for(var key in obj) {
  // console.log('key', key, obj[key] )
}

//  2.object.keys() 遍历
console.log(Object.keys(obj)) // [ 'name', 'age', 'sex' ]
```
## 类 class
####  ES5
```javascript
// ES5
// 在js中，类的所有实例对象都从同一个原型对象上继承属性
/* function Person (sex, age) {
  this.sex =sex
  this.age= age
}
Person.prototype.getInfo =function(){
  return this.sex+','+this.age
}
var person =new Person('man', '10')
console.log(person.getInfo()) // man,10
 */
```
####  ES6 语法糖
```javascript
// ES6 语法糖
class Person {
  constructor(sex, age){
    this.sex=sex
    this.age=age
  }
  getInfo(){
    return this.sex+','+this.age
  }
}
var person=new Person('female', '20')
console.log(person.getInfo()) // female,20
```
####  属性和构造函数
```javascript
//  属性和构造函数
// class中的属性定义在constructor函数（构造函数）中，构造函数负责类的初始化，
// 包括初始化属性和调用其他类方法等
// 构造函数同样支持默认值参数

// 如果申明一个类的时候没有声明构造函数，那么会默认添加一个空的构造函数。
// 构造函数只有在使用关键字new实例化一个对象的时候才会被调用
class Student{
  constructor(name="lear", sex='male'){
    this.age='lear'
    this.sex='male'
  }
}
```
####  类方法
```javascript
// 类方法
class Student{
  constructor(name='lear', sex='male'){
    this.name=name
    this.sex=sex
  }
  getInfo(){
    console.log('name ：', this.name, 'sex :',this.sex)
  }
}
var student=new Student()
// console.log(student.getInfo()) // name ： lear sex : male

// 类方法也可以作为属性定义在构造函数中，
class Student{
  constructor(name='lear', sex='male'){
    this.name=name
    this.sex=sex
    this.getInfo=()=>{ // 类方法也可以是箭头函数
      console.log('name ：', this.name, 'sex :',this.sex)
    }
  }
  
}
```
####  __proto__

ES5中，类的实现通过__proto__属性来指向构造函数的prototype对象
es6中，==getinfo方法和constructor方法虽然看似是定义在类的内部，但实际上还是定义在prototype上，
侧面可以看出ES6是对class的实现依旧是基于prototype==
`person.constructor=Person.prototype.constructor` // true

对象的__proto__属性指向类的原型

类的本质是构造函数

####  静态方法
在定义类时如果定义了方法,那么该类的每个实例在初始化时都会有一份该方法的备份。有时候我们不希望一些方法被继承,而是希望作为父类的属性来使用,可以直接通过调用类名调用的方法,即静态方法。

es6中使用static关键字来声明一个静态方法，该方法只能通过类名来直接调用，而不能通过类的实例调用。
```javascript
class Person{
  static getName() {
    return 'lear'
  }
}
Person.getName() // lear
var person=new Person()
person.getName() // error
```
```javascript
// super 关键字调用父类的静态方法
class Person{
  static getName() {
    return 'lear'
  }
}
class Student extends Person{
  static getName2() {
    return super.getName() + ', Hi'
  }
}
console.log(Student.getName2()) // lear, Hi
```
####  类的继承
- ES6中的继承
```javascript
class Person {
  constructor(name, age) {
    this.name=name
    this.age=age
  }
  getInfo() {
    return this.name + ',' +this.age
  }
}
var p1= new Person('zhansan', 18, '男')
console.log(p1.getInfo()) // zhansan,18,男
// 继承person类
class Student extends Person {
  constructor(name, age, sex){
    //super调用了父类的构造函数，并将父类中的属性绑定到子类上。
    //  super可以带参数， 表示那些父类的属性会被继承。
    // 在子类中，super方法必须要调用的，因为在子类本身没有自身的this对象，必须通过super方法拿到父类的this对象，
    // 除了用在子类的构造函数中，super还可以用在类方法中来引用父类的方法。
    super(name, age)
    this.sex=sex
  }
  getInfo() {
    return super.getInfo()+ '----'+ this.sex // 调用父类的方法
  }
  print() {
    var info=this.getInfo()
    console.log(info)
  }
}

var p2=new Student('李四', 16, '女')
console.log(p2.getInfo()) // 李四,16----女
p2.print() // 李四,16----女

```
```javascript
// ES5中的继承
// 我们有一个父类Person,并且在类的内部和原型链上各定义了一个方法：

function Person(name, age){
  this.name=name
  this.age=age
  this.greed=function(){
    console.log('Hello, i am', this.name)
  }
}
Person.prototype.getInfo=function(){
  return this.name+','+this.age
}

// 修改原型链
// 这是最普通的继承方法， 通过将子类的prototype指向父类的实例来实现
function Student(){

}
Student.prototype=new Person()
Student.prototype.name='lear'
Student.prototype.age=10
var stud=new Student()
stud.getInfo() // lear,10

// 缺点：在子类构造函数中无法通过传递参数对父类继承的属性值进行修改，只能通过修改prototype的方式进行修改。


```
```javascript
// 构造函数继承
function Person(name, age){
  this.name=name
  this.age=age
  this.greed=function(){
    console.log('Hello, i am', this.name)
  }
}
Person.prototype.getInfo=function(){
  return this.name+','+this.age
}

function Student(name,age,sex) {
  Person.call(this)
  this.name=name
  this.age=age
  this.sex=sex
}
var stud=new Student('lear',10,'male')
stud.greed() // Hello, i am lear
stud.getInfo() // error 
```