import { Request, Response } from "express";
import commonRes from "../../utils/commonRes";
const user = require("../../models/User");

declare module 'express-session' {
  interface SessionData {
    user?: any;
  }
}

const loginContorller = {
  /**
   * @description 用户登录
   */
  userLogin: async (req: Request, res: Response) => {    
    let { user_name, password } = req.body;
    let userMessage = await user.searchFirst({ user_name })

    // 用户不存在
    if (userMessage.length == 0) {
      commonRes.fail(res, {}, '用户不存在')
    }
    
    if (userMessage.user_name === user_name && userMessage.password === password) {
      req.session.user = user;
      commonRes(res, '登录成功')
    } else {
      commonRes.fail(res, {}, '用户名或密码错误')
    }
  },

  /**
   * 
   * @description 用户注册
   */
  addUser: async (req: Request, res: Response) => {
    let { user_name, password } = req.body;
    let userMessage = await user.searchFirst({ user_name })

    if (userMessage) {
      commonRes.fail(res, {}, '用户名相同')
    }

    // await user.insert(req.body);
    commonRes(res, userMessage);
  },
}

module.exports = loginContorller;