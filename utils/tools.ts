/**
 * @description 弱密码校验
 * @param password 密码
 * @returns Boolean
 */
function isWeakPassword(password:string) {
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);

  return !(hasNumber && hasSpecialChar && hasUppercase);
}