# 常见的构建工具
- Gulp
- fis3
是一个来自百度的优秀国产构建工具
- webpack

# 核心概念
webpack功能强大且配置项多，但只要理解了其中的几个核心概念，就能随心应手地使用了。
- Entry: 入口， webpack执行构建的第一步从entry开始。
- module:模块，在webpack里一切皆模块，一个模块对应一个文件。webpack会从配置的entry开始递归找出所依赖的模块。
- chunk：代码块，一个春款由多个模块组合而成，用于代码合并和分割。
- loader：模块转换器，用于将模块的原内容按照需求转换换成新内容
- plugin：扩展插件，在webpack构建流程中的特定时机注入扩展逻辑，来改变构建结果或做我们想做的事情。
- output: 输出结果，在webpack进过一系列处理并得出最终想要的代码输出结果


webpack在启动后会从entery里配置的module开始，递归解析enter依赖的所有module。每找到一个module，就会根据配置的loader去找对应的转换规则，对module进行转换后，在解析出当前module依赖的module。这些模块会以entry为单位进行分组，一个entry及其所有依赖的module被分到一个组也就是一个chunk。最后，webpack会将所有的chunk转换成文件输出。
在整个流程中，webpack会在恰当的时机执行plugin里定义的逻辑。

# 配置

- entry：配置模块的入口
- output：配置如何输出最终想要的代码
- module：配置处理模块的规则
- resolve：配置寻找模块的规则
- plugins: 配置扩展插件
- DevServer：配置devsever

### 整体配置结构
```javascript
const path = require('path');

module.exports = {
  // entry 表示 入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
  // 类型可以是 string | object | array   
  entry: './app/entry', // 只有1个入口，入口只有1个文件
  entry: ['./app/entry1', './app/entry2'], // 只有1个入口，入口有2个文件
  entry: { // 有2个入口
    a: './app/entry-a',
    b: ['./app/entry-b1', './app/entry-b2']
  },

  // 如何输出结果：在 Webpack 经过一系列处理后，如何输出最终想要的代码。
  output: {
    // 输出文件存放的目录，必须是 string 类型的绝对路径。
    path: path.resolve(__dirname, 'dist'),

    // 输出文件的名称
    filename: 'bundle.js', // 完整的名称
    filename: '[name].js', // 当配置了多个 entry 时，通过名称模版为不同的 entry 生成不同的文件名称
    filename: '[chunkhash].js', // 根据文件内容 hash 值生成文件名称，用于浏览器长时间缓存文件

    // 发布到线上的所有资源的 URL 前缀，string 类型
    publicPath: '/assets/', // 放到指定目录下
    publicPath: '', // 放到根目录下
    publicPath: 'https://cdn.example.com/', // 放到 CDN 上去

    // 导出库的名称，string 类型
    // 不填它时，默认输出格式是匿名的立即执行函数
    library: 'MyLibrary',

    // 导出库的类型，枚举类型，默认是 var
    // 可以是 umd | umd2 | commonjs2 | commonjs | amd | this | var | assign | window | global | jsonp ，
    libraryTarget: 'umd',

    // 是否包含有用的文件路径信息到生成的代码里去，boolean 类型
    pathinfo: true,

    // 附加 Chunk 的文件名称
    chunkFilename: '[id].js',
    chunkFilename: '[chunkhash].js',

    // JSONP 异步加载资源时的回调函数名称，需要和服务端搭配使用
    jsonpFunction: 'myWebpackJsonp',

    // 生成的 Source Map 文件名称
    sourceMapFilename: '[file].map',

    // 浏览器开发者工具里显示的源码模块名称
    devtoolModuleFilenameTemplate: 'webpack:///[resource-path]',

    // 异步加载跨域的资源时使用的方式
    crossOriginLoading: 'use-credentials',
    crossOriginLoading: 'anonymous',
    crossOriginLoading: false,
  },

  // 配置模块相关
  module: {
    rules: [ // 配置 Loader
      {
        test: /\.jsx?$/, // 正则匹配命中要使用 Loader 的文件
        include: [ // 只会命中这里面的文件
          path.resolve(__dirname, 'app')
        ],
        exclude: [ // 忽略这里面的文件
          path.resolve(__dirname, 'app/demo-files')
        ],
        use: [ // 使用那些 Loader，有先后次序，从后往前执行
          'style-loader', // 直接使用 Loader 的名称
          {
            loader: 'css-loader',
            options: { // 给 html-loader 传一些参数
            }
          }
        ]
      },
    ],
    noParse: [ // 不用解析和处理的模块
      /special-library\.js$/  // 用正则匹配
    ],
  },

  // 配置插件
  plugins: [
  ],

  // 配置寻找模块的规则
  resolve: {
    modules: [ // 寻找模块的根目录，array 类型，默认以 node_modules 为根目录
      'node_modules',
      path.resolve(__dirname, 'app')
    ],
    extensions: ['.js', '.json', '.jsx', '.css'], // 模块的后缀名
    alias: { // 模块别名配置，用于映射模块
      // 把 'module' 映射 'new-module'，同样的 'module/path/file' 也会被映射成 'new-module/path/file'
      'module': 'new-module',
      // 使用结尾符号 $ 后，把 'only-module' 映射成 'new-module'，
      // 但是不像上面的，'module/path/file' 不会被映射成 'new-module/path/file'
      'only-module$': 'new-module',
    },
    alias: [ // alias 还支持使用数组来更详细的配置
      {
        name: 'module', // 老的模块
        alias: 'new-module', // 新的模块
        // 是否是只映射模块，如果是 true 只有 'module' 会被映射，如果是 false 'module/inner/path' 也会被映射
        onlyModule: true,
      }
    ],
    symlinks: true, // 是否跟随文件软链接去搜寻模块的路径
    descriptionFiles: ['package.json'], // 模块的描述文件
    mainFields: ['main'], // 模块的描述文件里的描述入口的文件的字段名称
    enforceExtension: false, // 是否强制导入语句必须要写明文件后缀
  },

  // 输出文件性能检查配置
  performance: {
    hints: 'warning', // 有性能问题时输出警告
    hints: 'error', // 有性能问题时输出错误
    hints: false, // 关闭性能检查
    maxAssetSize: 200000, // 最大文件大小 (单位 bytes)
    maxEntrypointSize: 400000, // 最大入口文件大小 (单位 bytes)
    assetFilter: function (assetFilename) { // 过滤要检查的文件
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },

  devtool: 'source-map', // 配置 source-map 类型

  context: __dirname, // Webpack 使用的根目录，string 类型必须是绝对路径

  // 配置输出代码的运行环境
  target: 'web', // 浏览器，默认
  target: 'webworker', // WebWorker
  target: 'node', // Node.js，使用 `require` 语句加载 Chunk 代码
  target: 'async-node', // Node.js，异步加载 Chunk 代码
  target: 'node-webkit', // nw.js
  target: 'electron-main', // electron, 主线程
  target: 'electron-renderer', // electron, 渲染线程

  externals: { // 使用来自 JavaScript 运行环境提供的全局变量
    jquery: 'jQuery'
  },

  stats: { // 控制台输出日志控制
    assets: true,
    colors: true,
    errors: true,
    errorDetails: true,
    hash: true,
  },

  devServer: { // DevServer 相关的配置
    proxy: { // 代理到后端服务接口
      '/api': 'http://localhost:3000'
    },
    contentBase: path.join(__dirname, 'public'), // 配置 DevServer HTTP 服务器的文件根目录
    compress: true, // 是否开启 gzip 压缩
    historyApiFallback: true, // 是否开发 HTML5 History API 网页
    hot: true, // 是否开启模块热替换功能
    https: false, // 是否开启 HTTPS 模式
  },

  profile: true, // 是否捕捉 Webpack 构建的性能信息，用于分析什么原因导致构建性能不佳

  cache: false, // 是否启用缓存提升构建速度

  watch: true, // 是否开始
  watchOptions: { // 监听模式选项
    // 不监听的文件或文件夹，支持正则匹配。默认为空
    ignored: /node_modules/,
    // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
    // 默认为300ms 
    aggregateTimeout: 300,
    // 判断文件是否发生变化是不停的去询问系统指定文件有没有变化，默认每秒问 1000 次
    poll: 1000
  },
}

```


# 优化
优化输出质量的目的是为用户呈现体验更好的网页，例如减少首屏加载时间、提升性能流畅度等。

- 减少首屏加载时间
- 提升流畅度
### 减少首屏加载时间

## 压缩代码
- 压缩js
uglifyJS https://github.com/mishoo/UglifyJS
它会分析JavaScript代码语法树，理解代码的含义，从而锉刀去掉无效代码、去掉日志输出代码、缩短变量名等优化。

uglifyJS常用选项
- sourceMap：是否为压缩后的代码生成对应的 Source Map，默认为不生成，开启后耗时会大大增加。一般不会把压缩后的代码的 Source Map 发送给网站用户的浏览器，而是用于内部开发人员调试线上代码时使用。
- beautify： 是否输出可读性较强的代码，即会保留空格和制表符，默认为是，为了达到更好的压缩效果，可以设置为 false。
- comments：是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为 false。
compress.warnings：是否在 UglifyJs 删除没有用到的代码时输出警告信息，默认为输出，可以设置为 false 以关闭这些作用不大的警告。
- drop_console：是否剔除代码中所有的 console 语句，默认为不剔除。开启后不仅可以提升代码压缩效果，也可以兼容不支持 console 语句 IE 浏览器。
- collapse_vars：是否内嵌定义了但是只用到一次的变量，例如把 var x = 5; y = x 转换成 y = 5，默认为不转换。为了达到更好的压缩效果，可以设置为 true。
- reduce_vars： 是否提取出出现多次但是没有定义成变量去引用的静态值，例如把 x = 'Hello'; y = 'Hello' 转换成 var a = 'Hello'; x = a; y = b，默认为不转换。为了达到更好的压缩效果，可以设置为 true。

```javascript
const UglifyJSPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = {
  plugins: [
    // 压缩输出的 JS 代码
    new UglifyJSPlugin({
      compress: {
        // 在UglifyJs删除没有用到的代码时不输出警告
        warnings: false,
        // 删除所有的 `console` 语句，可以兼容ie浏览器
        drop_console: true,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true,
      },
      output: {
        // 最紧凑的输出
        beautify: false,
        // 删除所有的注释
        comments: false,
      }
    }),
  ],
};
```
### 压缩 ES6
`npm i -D uglifyjs-webpack-plugin@beta`
Webpack 相关配置代码如下：
```javascript
const UglifyESPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  plugins: [
    new UglifyESPlugin({
      // 多嵌套了一层
      uglifyOptions: {
        compress: {
          // 在UglifyJs删除没有用到的代码时不输出警告
          warnings: false,
          // 删除所有的 `console` 语句，可以兼容ie浏览器
          drop_console: true,
          // 内嵌定义了但是只用到一次的变量
          collapse_vars: true,
          // 提取出出现多次但是没有定义成变量去引用的静态值
          reduce_vars: true,
        },
        output: {
          // 最紧凑的输出
          beautify: false,
          // 删除所有的注释
          comments: false,
        }
      }
    })
  ]
}
```
### 压缩 CSS
cssnano

把 cssnano 接入到 Webpack 中也非常简单，因为 css-loader 已经将其内置了，要开启 cssnano 去压缩代码只需要开启 css-loader 的 minimize 选项。 相关 Webpack 配置如下：

```javascript
const path = require('path');
const {WebPlugin} = require('web-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css/,// 增加对 CSS 文件的支持
        // 提取出 Chunk 中的 CSS 代码到单独的文件中
        use: ExtractTextPlugin.extract({
          // 通过 minimize 选项压缩 CSS 代码
          use: ['css-loader?minimize']
        }),
      },
    ]
  },
  plugins: [
    // 用 WebPlugin 生成对应的 HTML 文件
    new WebPlugin({
      template: './template.html', // HTML 模版文件所在的文件路径
      filename: 'index.html' // 输出的 HTML 的文件名称
    }),
    new ExtractTextPlugin({
      filename: `[name]_[contenthash:8].css`,// 给输出的 CSS 文件名称加上 Hash 值
    }),
  ],
};
```
# CDN加速
用 Webpack 实现 CDN 的接入
总结上面所说的，构建需要实现以下几点：

静态资源的导入 URL 需要变成指向 CDN 服务的绝对路径的 URL 而不是相对于 HTML 文件的 URL。
静态资源的文件名称需要带上有文件内容算出来的 Hash 值，以防止被缓存。
不同类型的资源放到不同域名的 CDN 服务上去，以防止资源的并行加载被阻塞。
先来看下要实现以上要求的最终 Webpack 配置：
```javascript

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {WebPlugin} = require('web-webpack-plugin');

module.exports = {
  // 省略 entry 配置...
  output: {
    // 给输出的 JavaScript 文件名称加上 Hash 值
    filename: '[name]_[chunkhash:8].js',
    path: path.resolve(__dirname, './dist'),
    // 指定存放 JavaScript 文件的 CDN 目录 URL
    publicPath: '//js.cdn.com/id/',
  },
  module: {
    rules: [
      {
        // 增加对 CSS 文件的支持
        test: /\.css/,
        // 提取出 Chunk 中的 CSS 代码到单独的文件中
        use: ExtractTextPlugin.extract({
          // 压缩 CSS 代码
          use: ['css-loader?minimize'],
          // 指定存放 CSS 中导入的资源（例如图片）的 CDN 目录 URL
          publicPath: '//img.cdn.com/id/'
        }),
      },
      {
        // 增加对 PNG 文件的支持
        test: /\.png/,
        // 给输出的 PNG 文件名称加上 Hash 值
        use: ['file-loader?name=[name]_[hash:8].[ext]'],
      },
      // 省略其它 Loader 配置...
    ]
  },
  plugins: [
    // 使用 WebPlugin 自动生成 HTML
    new WebPlugin({
      // HTML 模版文件所在的文件路径
      template: './template.html',
      // 输出的 HTML 的文件名称
      filename: 'index.html',
      // 指定存放 CSS 文件的 CDN 目录 URL
      stylePublicPath: '//css.cdn.com/id/',
    }),
    new ExtractTextPlugin({
      // 给输出的 CSS 文件名称加上 Hash 值
      filename: `[name]_[contenthash:8].css`,
    }),
    // 省略代码压缩插件配置...
  ],
};
```
以上代码中最核心的部分是通过 publicPath 参数设置存放静态资源的 CDN 目录 URL， 为了让不同类型的资源输出到不同的 CDN，需要分别在：

output.publicPath 中设置 JavaScript 的地址。
css-loader.publicPath 中设置被 CSS 导入的资源的的地址。
WebPlugin.stylePublicPath 中设置 CSS 文件的地址。
设置好 publicPath 后，WebPlugin 在生成 HTML 文件和 css-loader 转换 CSS 代码时，会考虑到配置中的 publicPath，用对应的线上地址替换原来的相对地址。