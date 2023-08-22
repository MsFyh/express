import { Request, Response, NextFunction } from "express";

const responseHeader = (req: Request, res: Response, next: NextFunction) => {
  const { origin, Origin, referer, Referer } = req.headers

  const allowOrigin = origin || Origin || referer || Referer || '*'

  // 请求源
  res.header('Access-Control-Allow-Origin', allowOrigin)
  // 头部字段
  res.header('Access-Control-Allow-Headers', 'Content-type')
  // 公开的头部字段
  res.header('Access-Control-Expose-Headers', 'Content-Disposition')
  // 请求方式
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,POTIONS')
  // 携带cookie
  res.header('Access-Control-Allow-Credentials', 'true')

  // 预请求返回204
  if(req.method == 'OPTIONS') {
    res.sendStatus(204)
  } else {
    next()
  }
}

export default responseHeader