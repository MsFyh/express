const loginController = require('../src/User/login')
var router = require("express").Router();

/**
 * @description 查询所有用户
 */
router.post("/", loginController.userLogin);

/**
 * @description 用户注册
 */
router.post("/register", loginController.addUser);
module.exports = router;