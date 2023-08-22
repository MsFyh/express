
import knex, { Knex } from "knex";

const db: Knex = knex({
  client: 'mysql',
  connection: {
    host: 'localhost',
    port: 3306,
    database: 'test',
    user: 'root',
    password: '123456',
    timezone: "08:00",
  },
  

  // 错误打印
  log: {
    error(message) {
      console.log('[knex error]', message)
    }
  }
});

process.on('exit', () => {
  db.destroy()
})

module.exports = db