# we-check
H5签到APP

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
=======
# WeCheck

[接口文档](./接口文档.md)

# 0
* baseurl : /api/v1/
* 返回形式：
  ```
  {
  "status":200,
  "message":"OK",
  "data":...,
  "time":
  }
  ```
* 签到端和管理签到端公用一套接口，后台分别给予不同权限
* ## 权限说明 role
  共有2种用户类型：
  
  | userType | description | code |
  | -------- | ----------- | ---- |
  | 签到端用户 |可以进行签到|0|
  | 管理端用户 |对签到端用户管理|1|
  
  **文中将会分别在每个接口后面标志\[u\] \[m\] \[u|m\]以表示接口权限情况**