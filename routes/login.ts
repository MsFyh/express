const loginController = require('../src/User/login')
var router = require("express").Router();

/**
 * @description 用户登录
 */
router.post("/", loginController.userLogin);

/**
 * @description 用户注册
 */
router.post("/register", loginController.addUser);

/**
 * @description 退出登录
 */
router.get("/logout", loginController.logout);


module.exports = router;