const Base = require('./base');

class userSql extends Base {
  constructor(props = 'user') {
    super(props)
  }
}

module.exports = new userSql()