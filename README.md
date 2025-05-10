# proxy-service

> 需要 url 参数：
- proxy-host 或 to

> 可选：
- proxy-port 默认 443
- proxy-protocol 默认 HTTPS

host 更改为代理地址，pathname 及 param 保持不变
```
https://github.com/dogyyds?param=qaq
https://proxy.dogxi.me/dogyyds?param=qaq&proxy-host=github.com
https://proxy.dogxi.me?to=https://github.com/dogyyds?param=qaq
```
