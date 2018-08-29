# node_novel
novel && chat 
主要是以后app、小程序、 桌面程序、管理后台的后台。
项目所用技术栈：
> koa + mongoose + redis + puppeteer

目前主要包括，日志系统，邮件系统，api自动生成文档，爬虫。

```
├─config         配置
├─controllers    controller
├─crawler        爬虫
├─database       数据库
│  └─redis 
├─logs           日志
│  └─db
├─middleware     中间件
│  ├─httpError
│  ├─logger
│  └─sendEmail
├─models         models
├─public         api接口文档文档
│  └─apidoc
├─router         路由
├─service        service
├─static         静态文件（错误页面）
│  └─errHtml
├─tasks          子进程爬虫
└─utils          工具类
```
---