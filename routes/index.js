const authRouter = require('./authRouter');
const userRouter = require('./userRouter');

module.exports = app => {
  app.use('/auth', authRouter)
  app.use('/users', userRouter)
}
