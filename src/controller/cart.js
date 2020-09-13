const { qs } = require('querystring')
const { createCartModel, getCartModel, searchCartModel, getCartUserModel } = require('../models/cart')

module.exports = {
  createCart: (req, res) => {
    const { userId, itemsId } = req.body
    if (userId && itemsId) {
      createCartModel([userId, itemsId], (err, result) => {
        if (!err) {
          res.send({
            success: true,
            message: `user with id ${userId} enter`
          })
        } else {
          res.send({
            success: false,
            message: `no user on id ${userId}`
          })
        }
      })
    } else {
      res.send({
        success: false,
        message: ' all filed must be filled'
      })
    }
  },
  getCart: (req, res) => {
    let { page, limit, search, sort } = req.query
    let sortBy = ''
    let sortFrom = ''
    if (typeof sort === 'object') {
      sortBy = Object.keys(sort)[0]
      sortFrom = Object.values(sort)[0]
    } else {
      sortBy = 'id'
      sortFrom = sort || ''
    }
    let searchKey = ''
    let searchValue = ''
    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'user_id'
      searchValue = search || ''
    }
    if (!limit) {
      limit = 5
    } else {
      limit = parseInt(limit)
    }
    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }
    const offset = (page - 1) * limit
    getCartModel([searchKey, searchValue], [sortBy, sortFrom], [limit, offset], (err, result) => {
      if (!err) {
        const pageInfo = {
          count: 0,
          pages: 0,
          currentPage: page,
          LimitPerPage: limit,
          nextLink: null,
          prevLink: null
        }
        if (result.length) {
          searchCartModel([searchKey, searchValue], [sortBy, sortFrom], data => {
            const { count } = data[0]
            pageInfo.count = count
            pageInfo.pages = Math.ceil(count / limit)

            const { pages, currentPage } = pageInfo

            if (currentPage < pages) {
              pageInfo.nextLink = `http://localhost:8180/cart?${qs.stringify({ ...req.query, ...{ page: page + 1 } })}`
            }
            if (currentPage > 1) {
              pageInfo.prevLink = `http://localhost:8180/cart?${qs.stringify({ ...req.query, ...{ page: page - 1 } })}`
            }
            res.send({
              success: true,
              message: 'List Items',
              data: result,
              pageInfo
            })
          })
        } else {
          res.send({
            success: 'false',
            message: 'No item'
          })
        }
      } else {
        res.status(500).send({
          success: 'false',
          message: 'internal server error!'
        })
      }
    })
  },
  getCartUser: (req, res) => {
    const { id } = req.params
    getCartUserModel(id, (err, result) => {
      if (!err) {
        if (result.length) {
          res.status(201).send({
            succes: true,
            message: 'showing...',
            data: result[0]
          })
        } else {
          res.status(400).send({
            succes: false,
            message: 'bad request'
          })
        }
      } else {
        res.send({
          success: false,
          message: 'error'
        })
      }
    })
  }
}
