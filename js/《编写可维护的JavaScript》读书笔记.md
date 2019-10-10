#### <编写可维护的JavaScript>读书笔记


这本书你将学到如何写出具有高维护性的代码，以便团队任何人都可以轻松地理解、修改或扩展你的代码。

> “程序是写给人读的，只是偶尔让计算机执行以下”   --Donald Knuth



## 第一章

#### 使用空格符进行缩进

2个空格表示一个缩进，以及8个空格表示一个缩进。
- jquery核心风格指南规定使用制表符缩进。
- SproutCode风格指南规定使用2个空格的缩进。
- Goolge的js风格指南规定使用2个空格的缩进。
#### 语句结尾
js代码省略分号也是可以正常工作的，分析器会自动寻找代码中应当使用分号但实际没有分号的位置，并插入分号。大多数场景下分析器都会正确插入封号，不会产生错误。但分析器的分号插入规则非常复杂且很难记住，
因此我推荐不要省略分号。
#### 空行
==在每个流程控制语句之前（比如if和for）添加空行==。这样做能使你更流畅地阅读这些语句。
添加空行的场景
- 在方法之间
- 在方法中的局部变量和第一条语句之间
- 在多行或单行注释之前
- 在方法内的逻辑片段之间插入空行，提高可读性。

```javascript
  if (wl && wl.length) {
    for (i = 0, i < wl.length; i < 1; ++i) {
      p = wl[i];
      type = Y.lang.type(r[p]);
      if (s.hasOwnProperty(p)) {
        if (merge && type == 'object') {
          Y.mix(r[p], s[p]);
        } else if (ov || !(p in r) {
            r[p] = s[p];
          })
      }
    }
  }
```

#### 命名
驼峰是大小写 由小写字母开始，后续每个单词首字母都大写

```javascript
var thisIsMyName;
var anotherVariable;
var aVeryLongVariableName;
```
#### 变量和函数
变量名应当总是遵守驼峰大小写命名发，并且命名前缀应当是名词。以及名词作为前缀可以让变量和函数区分开来，因为函数名前缀应当是动词。
```javascript
var count = 0;
var myName = 'rose';
var found = true;
不好的写法
var getCount = 10;
var isFound = true;

好的写法
function getName() {
return myName;
}
```

命名长度应该尽可能短，并抓住要点。尽量在变量名中体现出值的数据类型，比如 命名 `count, length size`表明数据类型是数字。命名`name title message` 表明数据类型是字符串。
循环中变量 `i , j, k`

函数和方法命名，**第一个单词应该是动词，常见的动词 **



| 动词 |        含义        |
|------|--------------------|
| can  | 函数返回一个布尔值 |
| has  | 函数返回一个布尔值 |
| is   | 函数返回一个布尔值 |
| get  | 返回非布尔值       |
| set  | 函数用来保存一个值 |

## 第二章

#### 所有的块语句都应当使用花括号
- if
- for
- while
- do....while...
- try...catch...finally

## 第四章 变量、函数和运算符

变量声明提前；在函数内部任意地方定义变量和在函数顶部定义变量是完全一样的。流行的风格是将所有变量声明放在函数顶部而不是散落在各个角落。
```javascript
  function doSomethingWithItems(items) {
    var i, len,
        value = 10;
        result = value + 10;
    for (i, len = items.length; i < len, i++) {
      doSomething(items[i]);
    }
  }
```
#### 函数声明
和变量声明一样，函数声明也会被js引擎提前，因此，在代码中函数的调用可以出现在函数声明之前。
```javascript
// 不好的写法
  doSomething();
  function doSomething() {
    alert('hello');
  }
```
**推荐先声明js函数然后使用函数。**
#### 函数内部的局部函数应当紧接着变量声明之后声明

```javascript
function doSomethingWithItems(items) {
    var i, len,
      value = 10,
      result = value + 10;
    function doSomething(item) {
      // 代码
    }
    for (i = 0, len = item.length; i < len; i++) {
      doSomething(items[i]);
    }
  }
立即调用的函数（匿名函数）
  // 匿名函数不好好的写法  
  var doSomething = function () {
    // 函数体
    return {
      message: 'Hi'
    }
  }();
  // 匿名函数好的写法
  var doSomething = (function () {
    // 函数体
    return {
      message: 'Hi'
    }
  }());
```

- 第一中方式会让人误以为将一个匿名函数赋值给了这个变量。除非读完整段代码看到最后一行的那对圆括号，否者你不会知道是将函数赋值给变量还是将函数的执行结果赋值给变量。
- 第二种方式添加左圆括号标识符。

#### 相等

js具有强制类型转换机制。

- 强制类型转换会驱使某些类型的变量自动转换成其他不同的类型，这种情形往往会造成意想不到的结果。
`== 和!=`当比较的两个值的类型不同时，这两个运算符都有**强制类型转换**，

- 如果将数字和字符串进行比较，字符串会首先转换为数字，然后执行比较。

- 由于强制类型转换的缘故，我们推荐不要使用` ==和!=`, 而是应当使用 `=== 和!==`。 **不会强制类型转换**。

## 第五章 UI层的松耦合

用户界面是有三个彼此隔离有相互作用的层定义的。

- HTML用来定义页面的数据和语义。
- CSS用来给页面添加样式，创建视觉特征。
- js用来给页面添加行为，使其具有交互。

## 第六章 避免使用全局变量

js的初始执行环境是由多种多样的全局变量所定义的，这些全局变量在脚本环境创建之初就已经存在了。我们说这些都是挂载在‘全局对象 gloabl object’,'全局对象'是一个神秘的对象，塔表示脚本的最外层上的上下文。

#### 全局变量带来的缺点
- 随着代码量的增加，全局变量难维护
- 命名冲突
- 代码的脆弱性  环境发生改变，全局变量不存在，方法就会报错。

- 命名空间解决全局变量污染
> 命名空间是简单的通过全局对象的单一属性表示的功能性分组。


## 第八章
检测原始值 tyopeof

> js中有5种原始类型：字符串，数字，布尔值，null,undefined。

- 对于字符串 typeof返回 ''string''
- 对于数字， typeof 返回 ‘number’
- 对于布尔值，返回‘boolean’
- 对于undefined,返回‘undefined’
- 检测应用值师type所有对象都会返回object

> 检测某个引用值的类型的最好方法是使用instanceof

语法 value instanceof constructor

代码中创建了Person类型，变量me是Person的实例，因此me instanceof Person 
所有的对象都被认为是object的实例。
