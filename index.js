const express = require('express')
const bodyParser = require('body-parser')
const routerItems = require('./src/routes/items')
const routerCategory = require('./src/routes/category')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use('/items', routerItems)
app.use('/category', routerCategory)

app.listen(8180, () => {
  console.log('aplication running in port 8180')
})
