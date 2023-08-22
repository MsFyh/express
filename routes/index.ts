import { Express} from "express";

function routes(app: Express) {
  app.use('/user',require('./user'))
  app.use('/login', require('./login'))
}

export default routes;
