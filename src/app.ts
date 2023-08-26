import express from 'express'
import routes from '../routes' // 路由
import logger from '../utils/logger' // 日志输出
import config from '../config/default'
const session = require('express-session');

import morgan from 'morgan'

const app = express()

app.use(express.json())

const PORT = config.port

// 启动
app.listen(PORT, async () => {
  logger.info(`App is running at http://localhost:${PORT}`)
  routes(app)
})

// 解析post请求表单格式的请求头
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 60 * 1000, // 1 小时
    secure: false, // 仅在 HTTPS 连接中发送 cookie
    httpOnly: true // 限制客户端 JavaScript 访问 cookie
  }
}));

app.use(morgan('dev'))

