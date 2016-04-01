#前端自动化构建工具，基于fis3


- less预编译
- css prefix
- 静态资源压缩（css、js、png）


##目录结构-test

####源码：

```
	 workspace // 工作目录
	 ├ components // 模块，暂时只放html。TODO：把css、js、html、图片都放一起
	 ├ fonts // 文字
	 ├ images // 图片
	 ├ js // js文件
	 ├ less // less文件
	 ├ third // 第三方文件
	 ├ index.html // 首页
```

####编译后：

```
	 output
	 ├ static // 静态资源
	 | ├ fonts // 文字
	 | ├ images // 图片
	 | ├ js // js文件
	 | ├ css // less文件
	 | ├ third // 第三方文件
	 ├ index.html // 首页
```

##快速入门

####编译

```
cjf release -d ./output
```
编译输出到项目文件 '/output' 目录

```
cjf release
```
编译到本地服务器，不压缩

```
cjf release prod
```
编译到本地服务器，压缩

####文件监听 + 浏览器自动刷新

```
cjf release -wL
```
监听本地文件变动，自动编译到本地服务器，刷新浏览器

##Web Server

内置 Web Server，方便调试构建页面

```
cjf server start
```
**开启**本地服务器

```
cjf server stop
```
**关闭**本地服务器

```
cjf server open
```
**打开**本地服务器文件

```
cjf server clean
```
**删除**本地服务器文件

##在html中嵌入资源

- 嵌入图片(转base64 图片)

```
	<img title="logo" src="images/logo.gif?__inline"/>
```

- 嵌入样式

```
	<link rel="stylesheet" type="text/css" href="demo.css?__inline">
```

- 嵌入html

```
	<link rel="import" href="demo.html?__inline">
```

- 嵌入js

```
	<script type="text/javascript" src="demo.js?__inline"></script>
```

##在css中嵌入资源

- 嵌入图片

```
	.style {
	      background: url(images/logo.gif?__inline);
	  }
```

- 嵌入css

```
	@import url('demo.css?__inline');
```

##less

- 过滤下划线开头命名的less文件
- html中内联less执行编译

```
	<style type="text/x-less">
	body{
		a{
			color:red;
		}
	}
	</style>
```

- 外链less

```
	<link rel="stylesheet" href="less/lifehacker.less">
```


##cssautoprefixer

- 编译默认开启autoprefixer


