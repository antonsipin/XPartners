require('dotenv').config()
const formidableMiddleware = require('express-formidable')
const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const createSocketServer = require('./socket')
const methodOverride = require('method-override')
const { createServer } = require('http')
const path = require('path')
const logger = require('morgan')
const indexRouter = require('./src/routes/index')
const accountRouter = require('./src/routes/account')
const usersRouter = require('./src/routes/users')
const mainRouter = require('./src/routes/main')
const usersMiddle = require('./src/middleware/user')
const tokenMiddle = require('./src/middleware/token')
const { dbConnect, dbConnectionURL } = require('./src/config/dbConnect')
const cors = require('cors')
const PORT = process.env.PORT || 3100

const app = express()
const server = createServer()
createSocketServer(server)
dbConnect()

app.set('session cookie name', 'sid')
app.use(cors())
app.use(logger('dev'))
app.use(express.static(path.resolve('../frontend/build')))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(formidableMiddleware({
  encoding: 'utf-8',
  uploadDir: path.resolve('./public/files'),
  multiples: false, 
}))

app.use(
  session({
      secret: process.env.SESSION_SECRET,
      store: MongoStore.create({ mongoUrl: dbConnectionURL }),
      resave: true,
      saveUninitialized: true,
      cookie: { secure: false }
  })
)
app.use(methodOverride('_method'))
app.use(usersMiddle.userName)
app.use('/', indexRouter)
app.use('/account', tokenMiddle, accountRouter)
app.use('/users', usersRouter)
app.use('*', mainRouter)

server.on('request', app)
server.listen(PORT, () => {
  console.log('Server has been started on port: ', PORT)
})

module.exports = app
