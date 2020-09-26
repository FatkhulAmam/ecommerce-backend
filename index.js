require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors({ credentials: true }))
app.use(bodyParser.urlencoded({ extended: false }))

// import route
const routerItems = require('./src/routes/items')
const routerCategory = require('./src/routes/category')
const routerUser = require('./src/routes/user')
const routerAuth = require('./src/routes/auth')
const routerCart = require('./src/routes/cart')

// import middleware
const authMiddleware = require('./src/middlewares/auth')

app.use('/items', routerItems)
app.use('/category', routerCategory)
app.use('/cart', routerCart)
app.use('/user', routerUser)
app.use('/auth', routerAuth)

// provide static file(images)
app.use('/uploads', express.static('assets/uploads'))

app.listen(8180, () => {
  console.log('aplication running in port 8180')
})
