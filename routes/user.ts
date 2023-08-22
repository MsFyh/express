const userController = require('../src/User/user')

var router = require("express").Router();
import checkAuth from "../utils/checkAuth";

/**
 * @description 查询所有用户
 */
router.get("/", checkAuth, userController.showUser);

/**
 * @description 用户搜索
 */
router.get("/search", userController.getUser);

/**
 * @description 用户编辑
 */
router.post("/edit", checkAuth, userController.editUser);

module.exports = router;
