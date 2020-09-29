const responseStandar = require('../helpers/response')
const { createUserModel, getProfileModel, updateProfileModel, updatePartProfileModel, deleteProfileModel } = require('../models/userDetailModel')

module.exports = {
  createProfile: (req, res) => {
    const { idUser, userName, phone } = req.body
    const pictures = `/uploads/${req.file.filename}`
    console.log(idUser)
    if (idUser.trim() && userName.trim() && phone && pictures) {
      createUserModel([idUser, userName, phone, pictures], (err, result) => {
        if (!err) {
          return responseStandar(res, 'profile created', { data: { ...req.body, pictures } })
        } else {
          return responseStandar(res, 'cannot create profile', {}, 401, false)
        }
      })
    } else {
      return responseStandar(res, 'all field must be filled', {}, 401, false)
    }
  },
  getProfile: (req, res) => {
    const { id } = req.params
    getProfileModel(id, result => {
      if (result.length) {
        return responseStandar(res, 'showing profile', { data: result[0] })
      } else {
        return responseStandar(res, 'bad request', {}, 400, false)
      }
    })
  },
  updateProfile: (req, res) => {
    const { id } = req.params
    const { idUser, userName, phone } = req.body
    const pictures = `/uploads/${req.file.filename}`
    if (idUser.trim() && userName.trim() && phone.trim() && pictures) {
      getProfileModel(id, result => {
        if (result.length) {
          updateProfileModel([idUser, userName, phone, pictures], id, hasil => {
            if (hasil.affectedRows) {
              return responseStandar(res, `data updated on id ${id}`, { data: result })
            } else {
              return responseStandar(res, 'no data canot update', {}, 401, false)
            }
          })
        } else {
          return responseStandar(res, 'items not found!!', {}, 401, false)
        }
      })
    } else {
      return responseStandar(res, 'all from must be filled', {}, 401, false)
    }
  },
  updatePartProfile: (req, res) => {
    const { id } = req.params
    const { idUser = '', userName = '', phone = '' } = req.body
    const pictures = `/uploads/${req.file.filename}`
    if (idUser.trim() || userName.trim() || phone || pictures) {
      getProfileModel(id, result => {
        if (result.length) {
          const data = Object.entries(req.body).map(item => {
            return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
          })
          updatePartProfileModel(id, data, result => {
            console.log(data)
            if (result.affectedRows) {
              return responseStandar(res, `profile id ${id} updated`, { data: req.body })
            } else {
              return responseStandar(res, 'data cannot updated', {}, 401, false)
            }
          })
        } else {
          return responseStandar(res, 'no data be updated', {}, 401, false)
        }
      })
    } else {
      return responseStandar(res, 'fill a field', {}, 401, false)
    }
  },
  deleteProfile: (req, res) => {
    const { id } = req.params
    getProfileModel(id, result => {
      if (result.length) {
        deleteProfileModel(id, result => {
          if (result.affectedRows) {
            return responseStandar(res, 'profile deleted', {})
          } else {
            return responseStandar(res, 'cannot dalete profile', {}, 401, false)
          }
        })
      } else {
        return responseStandar(res, 'cannot dalete profile', {}, 401, false)
      }
    })
  }
}
