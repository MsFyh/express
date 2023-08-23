import { Request, Response } from "express";
import commonRes from "../../utils/commonRes";
import { isWeakPassword, hashPassword } from "../../utils/tools"

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
    console.log(req.body)
    let { user_name, password } = req.body;
    let userMessage = await user.searchFirst({ user_name })
    
    // 用户不存在
    if (!userMessage) {
      commonRes.fail(res, {}, '用户不存在')
    } else if (userMessage.user_name === user_name && userMessage.password === password) {
      req.session.user = userMessage;
      commonRes(res, '登录成功')
    } else {
      commonRes.fail(res, {}, '用户名或密码错误')
    }
  },

  /**
   * @description 用户注册
   */
  addUser: async (req: Request, res: Response) => {
    let { user_name, password } = req.body;
    let userMessage = await user.searchFirst({ user_name })
    
    // 查询用户名是否相同
    if (userMessage) {
      commonRes.fail(res, {}, '用户名重复')
    } else if (isWeakPassword(password)) {
      commonRes.fail(res, {}, '密码强度较低，请重新输入')
    } else {
      await user.insert({ user_name, password: hashPassword(password)});
      commonRes(res, '新增成功'); 
    }
  },

  /**
   * @description 退出登录
   */
  logout: async (req: Request, res: Response) => {
    req.session.destroy(function(err) {
      if (err) {
        console.error('Failed to destroy session:', err);
      } else {
        res.clearCookie('my-session-cookie'); // 替换为你的会话 cookie 名称
        commonRes(res, '退出成功'); 
      }
    });
  }
}

module.exports = loginContorller;