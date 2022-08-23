# 快给你的女朋友做一个微信公众号消息推送吧

> 技术栈 nodejs + Github Actions

预览

![](https://raw.githubusercontent.com/hanghang0321/images/main/20220823124953.png)

第一步 登录微信公众号测试号测试平台 https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login

![](https://raw.githubusercontent.com/hanghang0321/images/main/20220823125250.png)

第二步 新增消息模板

![](https://raw.githubusercontent.com/hanghang0321/images/main/20220823124613.png)

```
{{date.DATA}} 
城市：{{city.DATA}} 
天气：{{weather.DATA}} 
最低气温: {{min_temp.DATA}} 
最高气温: {{max_temp.DATA}}
今天是我们恋爱的第{{love_day.DATA}}天 
距离你的生日还有{{birthday.DATA}}天 
我已经开始准备礼物啦

{{words.DATA}} 
```

第三步 进入github 点击 Use this template，创建到自己的仓库下！ https://github.com/hanghang0321/wx_post_message

![](https://raw.githubusercontent.com/hanghang0321/images/main/20220823125955.png)

第四步 设置 Settings -> Secrets -> Actions

![](https://raw.githubusercontent.com/hanghang0321/images/main/20220823130712.png)

![](https://raw.githubusercontent.com/hanghang0321/images/main/20220823125706.png)

第五步 执行 就可以收到推送啦！

![](https://raw.githubusercontent.com/hanghang0321/images/main/20220823130842.png)