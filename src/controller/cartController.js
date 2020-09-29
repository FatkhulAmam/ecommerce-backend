const { qs } = require('querystring')
const {
  createCartModel, getCartModel, searchCartModel, getCartUserModel, getCartDelModel, deleteItemModel
} = require('../models/cartModel')
const responseStandart = require('../helpers/response')

module.exports = {
  createCart: (req, res) => {
    const { userId, itemsId } = req.body
    if (userId && itemsId) {
      createCartModel([userId, itemsId], (err, result) => {
        if (!err) {
          return responseStandart(res, `user with id ${userId} enter`, { result })
        } else {
          return responseStandart(res, `no user on id ${userId}`, {}, 401, false)
        }
      })
    } else {
      return responseStandart(res, 'all filed must be filled', {}, 401, false)
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
            return responseStandart(res, 'item list', { data: result, pageInfo })
          })
        } else {
          return responseStandart(res, 'no item', {}, 401, false)
        }
      } else {
        return responseStandart(res, 'internal server error', {}, 500, false)
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
  },
  deleteItem: (req, res) => {
    const { id } = req.params
    getCartDelModel(id, result => {
      if (result.length) {
        deleteItemModel(id, result => {
          if (result.affectedRows) {
            res.send({
              succcess: true,
              message: `id ${id} deleted!`
            })
          } else {
            res.send({
              succes: false,
              message: 'cannot delete data!!'
            })
          }
        })
      } else {
        res.send({
          success: false,
          message: 'no data founded'
        })
      }
    })
  }
}
