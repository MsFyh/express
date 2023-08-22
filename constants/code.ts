enum Code {
  success = 200,
  denied = 401,
  fail = -1,
  error
}

enum CodeMessage {
  success = '请求成功',
  denied = '无权限',
  fail = '接口错误',
  error = '系统异常'
}

type codeType = keyof typeof Code

export { Code, codeType, CodeMessage}