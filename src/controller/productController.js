const qs = require('querystring')
const responseStandart = require('../helpers/response')
const {
  getItemModel, createItemModel, getAllItemModel, searchItemModel, updateItemModel, updatePartialItemModel, deleItemModel
} = require('../models/productModel')

module.exports = {
  // menampilkan data berdasarkan id yang dimasukkan
  getDetailItem: (req, res) => {
    const { id } = req.params
    getItemModel(id, result => {
      if (result.length) {
        return responseStandart(res, `item with id ${id}`, { data: result[0] })
      } else {
        return responseStandart(res, 'bad request', {}, 400, false)
      }
    })
  },
  // membuat data dengan mesmaukkan name, price, dan description
  createItem: (req, res) => {
    const { name, price, description, category } = req.body
    const pictures = `/uploads/${req.file.filename}`
    console.log(pictures)
    if (name && price && description && category) {
      createItemModel([name, price, description, category], (err, result) => {
        if (!err) {
          return responseStandart(res, 'Item has been created', { data: { ...req.body } })
        } else {
          return responseStandart(res, 'data cannot be created', {}, 400, false)
        }
      })
    } else {
      return responseStandart(res, 'All field must be filled', {}, 400, false)
    }
  },
  // menampilkan semua data pada halaman berdasarkan page yang dimasukkan dan limit yang diberikan
  // mencari data berdasarkan nama no work
  getItem: (req, res) => {
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
      limit = 8
    } else {
      limit = parseInt(limit)
    }
    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }
    const offset = (page - 1) * limit
    getAllItemModel([searchKey, searchValue], [sortBy, sortFrom], [limit, offset], (err, result) => {
      console.log(result[0].name)
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
          searchItemModel([searchKey, searchValue], [sortBy, sortFrom], data => {
            const { count } = data[0]
            pageInfo.count = count
            pageInfo.pages = Math.ceil(count / limit)

            const { pages, currentPage } = pageInfo

            if (currentPage < pages) {
              pageInfo.nextLink = `${process.env.APP_URL}items?${qs.stringify({ ...req.query, ...{ page: page + 1 } })}`
            }
            if (currentPage > 1) {
              pageInfo.prevLink = `${process.env.APP_URL}items?${qs.stringify({ ...req.query, ...{ page: page - 1 } })}`
            }
            return responseStandart(res, 'list item', { data: result, pageInfo })
          })
        } else {
          return (res, 'no item', {}, 400, false)
        }
      } else {
        return (res, 'Internal Server error', {}, 500, false)
      }
    })
  },
  // merubah seluruh data pada index yang diminta
  updateItem: (req, res) => {
    const { id } = req.params
    const { name, price, description, category } = req.body
    if (name.trim() && price.trim() && description.trim() && category.trim()) {
      getItemModel(id, result => {
        if (result.length) {
          updateItemModel([name, price, description, category], id, hasil => {
            if (hasil.affectedRows) {
              return responseStandart(res, `data update on id ${id}`, { data: result })
            } else {
              return responseStandart(res, `data id ${id}, cannot be update`, {}, 400, false)
            }
          })
        } else {
          return responseStandart(res, `data id ${id}, not found`, {}, 400, false)
        }
      })
    } else {
      return responseStandart(res, 'all field must be filled', {}, 400, false)
    }
  },
  // merubah sebagian data
  updateItemPartial: (req, res) => {
    const { id } = req.params
    const { name = '', price = '', description = '', category = '' } = req.body
    if (name.trim() || price.trim() || description.trim() || category.trim()) {
      getItemModel(id, result => {
        if (result.length) {
          const data = Object.entries(req.body).map(item => {
            return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
          })
          updatePartialItemModel(id, data, result => {
            if (result.affectedRows) {
              return responseStandart(res, `data id ${id} updated`, { data: req.body })
            } else {
              return responseStandart(res, `data id ${id}, cannot be update`, {}, 400, false)
            }
          })
        } else {
          return responseStandart(res, 'no data updated', {}, 400, false)
        }
      })
    } else {
      return responseStandart(res, 'cannot edit data', {}, 401, false)
    }
  },
  // menghapus data berdasarkan index
  deleteItem: (_req, res) => {
    const { id } = _req.params
    getItemModel(id, result => {
      if (result.length) {
        deleItemModel(id, result => {
          if (result.affectedRows) {
            return (res, `data id ${id} deleted`, { data: result })
          } else {
            return (res, 'cannot delete data', {}, 400, false)
          }
        })
      } else {
        return (res, 'no data founded', {}, 400, false)
      }
    })
  }
}
