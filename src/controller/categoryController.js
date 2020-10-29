const qs = require('querystring')
const responseStandart = require('../helpers/response')
const {
  getAllCategoryModel,
  searchCategoryModel,
  createCategoryModel,
  getCategoryModel,
  deleteCategoryModel
} = require('../models/categoryModel')

module.exports = {
  createCategory: (req, res) => {
    const { categoryName } = req.body
    createCategoryModel(categoryName, (err, result) => {
      if (!err) {
        return responseStandart(res, 'category added', { data: result })
      } else {
        return responseStandart(res, 'category cannot added', {}, 401, false)
      }
    })
  },
  getDetailCategory: (req, res) => {
    const { id } = req.params
    getCategoryModel(id, result => {
      if (result.length) {
        return responseStandart(res, 'showing...', { data: result[0] })
      } else {
        return responseStandart(res, 'bad request', {}, 401, false)
      }
    })
  },
  deleteCategory: (req, res) => {
    const { id } = req.params
    getCategoryModel(id, result => {
      if (result.length) {
        deleteCategoryModel(id, result => {
          if (result.affectedRows) {
            return responseStandart(res, 'category deleted')
          } else {
            return responseStandart(res, 'cannot delete category', {}, 401, false)
          }
        })
      } else {
        return responseStandart(res, 'no category can be delete', {}, 401, false)
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
      searchKey = 'id'
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
          return responseStandart(res, 'no category', {}, 401, false)
        }
      } else {
        return responseStandart(res, 'internal server error', {}, 500, false)
      }
    })
  }
}
