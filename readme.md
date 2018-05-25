# Todos案例
[案例仓库]https://github.com/tastejs/todomvc-app-template
### 克隆到本地之后，在项目中安装
## 配置 browser-sync 浏览器同步测试工具
1. 安装依赖项：
```javascript;
也可以 npm i -D browser-sync
npm install --save-dev browser-sync
```
2. 配置script
```javascript
"scripts": {
  "dev": "browser-sync start --server --files \"*.html, css/*.css, js/*.js\"",
  "start": "npm run dev"
}
```
3. 启动开发服务
```javascript
或者 npm start
npm run dev
```
我们装的browser sync是全局包（同时这也是一个服务器的包，），但是当同事clone到本地后缺失了全局包，所以方法是，在项目中安装browser sync浏览区自动刷新的包，命令是：
`npm browser-sync  --save-dev `
Browser-sync仅仅是用于辅助我们开发的一个工具而已
在服务器计算机真正上线发布给普通用户访问的时候，不可能使用这种工具，
一般会选择 apache这样稳定的老牌http服务器软件
所以对于我们在项目中使用 `browser-sync` 这样的工具包，
我们在安装的时候，加上  `--save-dev` 选项
`--save-dev` 就是告诉npm 你把这个包的依赖信息保存到 devDependencies选项中。
之后我们在服务器安装第三方包的时候， npm i  暗转所有依赖项，包括 `devDependencies`
但是我们可以通过， `npm i --production` 告诉npm 你只给我安装 `dependencies` 中的依赖，排除掉 `devDependencies` 中的依赖
但是我们先服务器上安装第三方包的时候，是不需要这个自动刷新页面的包的，
装工具包的时候，使用命令
好处：

# 1. 数据列表展示
 1.1  有数据
使用 `v-for( item in array)` 循环就可以了

### 2. 无数据
没有数据时的显示，使用的template标签
v-if 中使用 Vue提供了一个特殊的标签 template, 既不想增加节点，还可以控制多个元素，就可以使用v-if 和template标签结合使用

## 添加任务
### 1. 敲回车添加到任务列表
### 2. 不允许有非空数据
### 3. 添加完成后清空文本框

## 任务项
### 1. 删除任务
### 2. 双击进入编辑模式
3. 思路是我们用`currentEdit=item`将当前的对象存下来，之后在赋值给`callbackTitle.item.titles`这样我们就可以在编辑的框中显示了，

## 编辑任务项
### 在编辑文本框中敲回车或失去焦点
### 输入状态下按esc取消编辑

## 显示所有未完成的任务数