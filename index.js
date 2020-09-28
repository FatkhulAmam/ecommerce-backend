require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors({ credentials: true }))
app.use(bodyParser.urlencoded({ extended: false }))

// import route
const routerProduct = require('./src/routes/product')
const routerCategory = require('./src/routes/category')
const routerUser = require('./src/routes/userDetails')
const routerAuth = require('./src/routes/authRoute')
const routerCart = require('./src/routes/cart')
const routerRole = require('./src/routes/rolesRoute')

const manageUser = require('./src/routes/manageUser')
// import middleware
const { adminMiddleware, sellerMiddleware, custommerMiddleware } = require('./src/middlewares/auth')

app.use('/product', routerProduct)
app.use('/category', routerCategory)

// cart login user
app.use('/cart', adminMiddleware, routerCart)
app.use('/cart', sellerMiddleware, routerCart)
app.use('/cart', custommerMiddleware, routerCart)

app.use('/user', routerUser)
app.use('/login', routerAuth)
app.use('/roles', adminMiddleware, routerRole)
app.use('/manage/user', manageUser)

// provide static file(images)
app.use('/uploads', express.static('assets/uploads'))

app.listen(8180, () => {
  console.log('aplication running in port 8180')
})
