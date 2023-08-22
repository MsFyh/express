import { Response } from 'express'
import { Code, codeType, CodeMessage } from '../constants/code'
import logger from '../utils/logger' // 日志输出

interface ResOption {
  type?: codeType
  status?: number
  message?: unknown
}

// 响应成功
function commonRes(res: Response, data: unknown, options?:ResOption) {
  options = Object.assign({ type: Code[200] }, options || {})

  const { type, status, message } = options
  let resStatus = status

  if (resStatus === undefined) {
    // 根据状态设计状态码
    resStatus = type === Code[200] ? 200 : 409
  }

  // 响应参数
  const sendRes: { code: number; data?: unknown; message?: unknown } = {
    code: Code[type as codeType],
    data,
    message: CodeMessage[type as codeType]
  }
  // 响应描述
  message && (sendRes.message = message)
  
  return res.status(resStatus).send(sendRes)
}

// 错误响应
commonRes.error = function(res: Response, data: unknown, message?:unknown, status?:number) {
  logger.error(message || CodeMessage['error'])
  this(res, null, { type: 'error', message: message || CodeMessage['error'], status: status || 409})
}

// 无权限响应
commonRes.denied = function(res: Response, data: unknown) {
  this(res, data, { type: 'denied', message: CodeMessage['denied'], status: 401 })
}

// 接口错误
commonRes.fail = function(res: Response, data: unknown, message: string) {
  this(res, data, { type: 'fail', message: message || CodeMessage['fail'], status: 200 })
}



export default commonRes