const qs = require('querystring')
const { getAllCategoryModel, searchCategoryModel, createCategoryModel, getCategoryModel, deleteCategoryModel } = require('../models/category')

module.exports = {
  createCategory: (req, res) => {
    const { categoryName } = req.body
    createCategoryModel(categoryName, (err, result) => {
      if (!err) {
        res.send({
          success: true,
          message: 'category created',
          data: { ...req.body }
        })
      } else {
        res.send({
          success: false,
          message: 'canno create category'
        })
      }
    })
  },
  getDetailCategory: (req, res) => {
    const { id } = req.params
    getCategoryModel(id, result => {
      if (result.length) {
        res.send({
          success: true,
          message: ' showing...',
          data: result[0]
        })
      } else {
        res.send({
          success: false,
          message: 'bad Request'
        })
      }
    })
  },
  deleteCategory: (req, res) => {
    const { id } = req.params
    getCategoryModel(id, result => {
      if (result.length) {
        deleteCategoryModel(id, result => {
          if (result.affectedRows) {
            res.send({
              success: false,
              message: `category ${id} deleted`
            })
          } else {
            res.send({
              success: false,
              message: `cannot delete category ${id}`
            })
          }
        })
      } else {
        res.send({
          success: false,
          message: 'no category can be delete'
        })
      }
    })
  },
  getCategory: (req, res) => {
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
      searchKey = 'name'
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
    getAllCategoryModel([searchKey, searchValue], [sortBy, sortFrom], [limit, offset], (err, result) => {
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
          searchCategoryModel([searchKey, searchValue], [sortBy, sortFrom], data => {
            const { count } = data[0]
            pageInfo.count = count
            pageInfo.pages = Math.ceil(count / limit)

            const { pages, currentPage } = pageInfo

            if (currentPage < pages) {
              pageInfo.nextLink = `http://localhost:8180/category?${qs.stringify({ ...req.query, ...{ page: page + 1 } })}`
            }
            if (currentPage > 1) {
              pageInfo.prevLink = `http://localhost:8180/category?${qs.stringify({ ...req.query, ...{ page: page - 1 } })}`
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
          message: 'internal server error'
        })
      }
    })
  }
}
