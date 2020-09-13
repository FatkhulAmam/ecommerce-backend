const qs = require('querystring')

const { getItemModel, createItemModel, getAllItemModel, searchItemModel, updateItemModel, updatePartialItemModel, deleItemModel } = require('../models/items')

module.exports = {
  // menampilkan data berdasarkan id yang dimasukkan
  getDetailItem: (req, res) => {
    const { id } = req.params
    getItemModel(id, result => {
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
    })
  },
  // membuat data dengan mesmaukkan name, price, dan description
  createItem: (req, res) => {
    const { name, price, description, category } = req.body
    if (name && price && description && category) {
      createItemModel([name, price, description, category], (err, result) => {
        if (!err) {
          res.status(201).send({
            success: true,
            message: 'Item has been created',
            data: {
              ...req.body
            }
          })
        } else {
          console.log(err)
          res.status(500).send({
            success: false,
            message: 'Internal Server error'
          })
        }
      })
    } else {
      res.status(400).send({
        success: false,
        message: 'All field must be filled'
      })
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
    getAllItemModel([searchKey, searchValue], [sortBy, sortFrom], [limit, offset], (err, result) => {
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
              pageInfo.nextLink = `http://localhost:8180/items?${qs.stringify({ ...req.query, ...{ page: page + 1 } })}`
            }
            if (currentPage > 1) {
              pageInfo.prevLink = `http://localhost:8180/items?${qs.stringify({ ...req.query, ...{ page: page - 1 } })}`
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
  // merubah seluruh data pada index yang diminta
  updateItem: (req, res) => {
    const { id } = req.params
    const { name, price, description, categoryName } = req.body
    if (name.trim() && price.trim() && description.trim() && categoryName.trim()) {
      getItemModel(id, result => {
        if (result.length) {
          updateItemModel([name, price, description, categoryName], id, hasil => {
            if (hasil.affectedRows) {
              res.status(200).send({
                success: true,
                message: `data updated on id ${id}`,
                data: result
              })
            } else {
              res.send({
                success: false,
                message: "no data can't update"
              })
            }
          })
        } else {
          res.send({
            success: false,
            message: 'items not found!!'
          })
        }
      })
    } else {
      res.send({
        success: false,
        message: 'all froms must be filled!'
      })
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
              res.send({
                success: true,
                message: `data id ${id} updated`,
                data: req.body
              })
            } else {
              res.send({
                success: false,
                message: ' data can`t be update!!!'
              })
            }
          })
        } else {
          res.send({
            success: false,
            message: 'no data be update!'
          })
        }
      })
    }
  },
  // menghapus data berdasarkan index
  deleteItem: (_req, res) => {
    const { id } = _req.params
    getItemModel(id, result => {
      if (result.length) {
        deleItemModel(id, result => {
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
