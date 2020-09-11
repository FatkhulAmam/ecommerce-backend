const express = require('express')
const bodyParser = require('body-parser')
const routerItems = require('./src/routes/items')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use('/items', routerItems)

app.listen(8180, () => {
  console.log('aplication running in port 8180')
})
