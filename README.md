# node_chat
管理后台的后台。
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
│  ├─httpError   错误监控
│  ├─logger      日志
│  └─sendEmail   邮件
├─models         models
├─public         api接口文档静态服务器
│  └─apidoc
├─router         路由
├─service        service
├─static         静态文件（错误页面）
│  └─errHtml
├─tasks          子进程爬虫
└─utils          工具类
```
---
