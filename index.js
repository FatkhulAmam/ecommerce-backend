require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors({ credentials: true }))
app.use(bodyParser.urlencoded({ extended: false }))

// import route
const routerProduct = require('./src/routes/productRoute')
const routerCategory = require('./src/routes/categoryRoute')
const routerUser = require('./src/routes/userDetailsRoute')
const routerAuth = require('./src/routes/authRoute')
const routerCart = require('./src/routes/cartRoute')
const routerRole = require('./src/routes/rolesRoute')
const routerAddress = require('./src/routes/addressRoute')
const routerRating = require('./src/routes/ratingRoute')
const routerCondition = require('./src/routes/conditionRoute')

// import middleware
const authMiddleware = require('./src/middlewares/auth')

app.use('/product', routerProduct)
app.use('/product', authMiddleware, routerRating)
app.use('/product', authMiddleware, routerCondition)
app.use('/category', routerCategory)
app.use('/cart', authMiddleware, routerCart)
app.use('/user', authMiddleware, routerUser)
app.use('/user', authMiddleware, routerAddress)
app.use('/auth', routerAuth)
app.use('/roles', authMiddleware, routerRole)

// provide static file(images)
app.use('/uploads', express.static('assets/uploads'))

// runing aplication
app.listen(8180, () => {
  console.log('aplication running in port 8180')
})
