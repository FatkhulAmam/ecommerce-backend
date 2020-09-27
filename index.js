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
const routerUser = require('./src/routes/userDetails')
const routerCart = require('./src/routes/cart')

const manageUser = require('./src/routes/manageUser')
// import middleware
const authMiddleware = require('./src/middlewares/auth')

app.use('/items', routerItems)
app.use('/category', routerCategory)
app.use('/cart', routerCart)
app.use('/user', authMiddleware, routerUser)
app.use('/manage/user', manageUser)

// provide static file(images)
app.use('/uploads', express.static('assets/uploads'))

app.listen(8180, () => {
  console.log('aplication running in port 8180')
})
