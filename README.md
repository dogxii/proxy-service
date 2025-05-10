# proxy-service

> 需要url参数：
- proxy-host

> 可选：
- proxy-port 默认 443
- proxy-protocol 默认 HTTPS

host 更改为代理地址，pathname 及 param 保持不变
```
https://github.com/dogyyds?param=qaq
https://proxy.dogxi.me/dogyyds?param=qaq&proxy-host=github.com
```
