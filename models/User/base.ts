const knex = require("../knex");
type User = {
  user_id?: number;
  username: string;
  password?: string;
  sex: number;
  phonenumber: number;
  status: number;
  create_time: string;
  modify_time: string;
};

class base {
  static all() {
    throw new Error("Method not implemented.");
  }
  table: string;

  constructor(props: string) {
    this.table = props;
  }

  
  /**
   * @description 查询所有用户
   * @param page 搜索页数
   * @param pageSize 搜索条数
   */
  async all(page: number, pageSize: number) {
    const offset =  (page - 1) * pageSize;
    
    let list = await knex(this.table).select().offset(offset).limit(pageSize).where("status", "=", 0)
    let count = await knex(this.table).where("status", "=", 0).count('user_id as count ').first();
    
    return {
      list, total: count.count
    }
  }

  /**
   * @description 关联搜索
   * @param searchQuery 用户搜索条件
   * @returns
   */
  search(searchQuery: User) {
    return knex(this.table).where(searchQuery).where("status", "=", 0).select();
  }

  searchFirst(searchQuery: User) {
    return knex(this.table).where(searchQuery).where("status", "=", 0).first();
  }

  /**
   * @description 用户注册
   * @param params 
   */
  insert(params: User) {
    return knex(this.table).insert(params);
  }

  /**
   * @description 修改用户信息
   * @param user_id 用户id
   * @param params 修改内容
   * @returns 
   */
  update(user_id: User, params: User) {
    return knex(this.table).where("user_id", "=", user_id).update(params);
  }

  /**
   * @description 删除用户
   * @param user_id 用户id
   * @returns 
   */
  delete(user_id: number) {
    return knex(this.table).where("user_id", "=", user_id).del();
  }
}

module.exports = base;
