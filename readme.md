# Todos案例
[案例仓库]https://github.com/tastejs/todomvc-app-template
	>这是一个空的案例初始化模版

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
	> browser sync是全局包(同时这也是一个服务器的包)在项目中安装browser sync浏览区自动刷新的包，
	> 命令是：`npm browser-sync  --save-dev `

