import { Response, NextFunction } from 'express';
import commonRes from "../utils/commonRes";

// 自定义登录状态校验中间件
export default function checkAuth(req: { session: { user: Object }}, res:Response, next:NextFunction) {
  if (req.session.user) {
    // 用户已登录，继续处理下一个中间件或路由处理程序
    next();
  } else {
    // 用户未登录，返回未登录状态码或进行其他处理
    commonRes.denied(res, {})
  }
}