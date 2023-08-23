import bcrypt from 'bcrypt';

/**
 * @description 弱密码校验
 * @param {string} password 密码
 * @returns Boolean
 */
export const isWeakPassword = (password: string) => {
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);

  return !(hasNumber && hasSpecialChar && hasUppercase);
};

/**
 * @description 使用bcrypt进行密码加密
 * @param {string}  plainPassword 明文密码
 * @returns 加密哈希值
 */
export const hashPassword = (plainPassword: string) => {
  const saltRounds = 10; // 设置盐的轮次，可以根据需求进行调整
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(plainPassword, salt);

  return hash
};

/**
 * @description 明文密码和加密hash值校验
 * @param {string} plainPassword  明文密码
 * @param {string} hashedPassword  加密哈希值
 * @returns 是否相同
 */
export const matchPassword = (plainPassword: string, hashedPassword: string): boolean => {
  return bcrypt.compareSync(plainPassword, hashedPassword)
}