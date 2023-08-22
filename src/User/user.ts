const user = require("../../models/User");
import commonRes from "../../utils/commonRes";
import { Request, Response } from "express";

const userContorller = {
  /**
   * @description 查询用户列表
   */
  showUser: async (req: Request, res: Response) => {    
    let userData = await user.all();
    commonRes(res, userData);
  },

  /**
   * @description 用户搜索
   */
  getUser: async (req: Request, res: Response) => {
    let userData = await user.search(req.query);
    if (userData.length == 1) userData = {...userData[0]}
    commonRes(res, userData);
  },

  /**
   * @description 用户信息编辑
   */
  editUser: async (req: Request, res: Response) => {
    await user.insert(req.body);
    commonRes(res, {});
  },
};

module.exports = userContorller;
