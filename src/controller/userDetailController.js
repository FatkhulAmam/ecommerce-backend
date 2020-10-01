const responseStandar = require('../helpers/response')
const paging = require('../helpers/pagination')
const joi = require('joi')
const bcrypt = require('bcryptjs')
const {
  getProfileModel, updateProfilModel,
  updatePartProfileModel, deleteProfileModel, getUserByCondition, updateProfilDetailModel,
  readUser, constUser, getUserByConditionDetail
} = require('../models/userDetailModel')

module.exports = {
  getProfile: async (req, res) => {
    const count = await constUser()
    const page = paging(req, count)
    const { offset, pageInfo } = page
    const { limitData: limit } = pageInfo
    const result = await readUser([limit, offset])
    return responseStandar(res, 'List all user detail', { result, pageInfo })
  },
  getDetailUser: async (req, res) => {
    const { id } = req.user

    const results = await getProfileModel(id)
    if (results.length) {
      const data = results.map(data => {
        data = {
          ...data,
          password: null
        }
        return data
      })
      responseStandar(res, `Detail of user id ${id}`, { data })
    } else {
      responseStandar(res, `User with id ${id} is not found`, {}, 404, false)
    }
  },
  updateProfile: async (req, res) => {
    const picture = `/uploads/${req.file.filename}`
    const schema = joi.object({
      user_name: joi.string().required(),
      email: joi.string().required(),
      password: joi.string().required(),
      phone: joi.string().required(),
      gender: joi.string().required(),
      birth: joi.string().required()
    })
    const { id } = req.user
    const { value: results, error } = schema.validate(req.body)
    if (error) {
      return responseStandar(res, 'Error', { error: error.message }, 400, false)
    } else {
      const { name, email, password, phone, gender, birth } = results
      const isExist = await getUserByCondition([{ email }])
      console.log(isExist)
      let existEmail = 0
      if (isExist.length) {
        existEmail = isExist[0].id
      }
      if (existEmail === parseInt(id) || !isExist.length) {
        if (results === isExist[0]) {
          return responseStandar(res, 'There is no change', {}, 304, false)
        } else {
          const isExist = await getUserByConditionDetail({ phone })
          let existPhone = 0
          if (isExist.length) {
            existPhone = isExist[0].user_id
          }
          console.log(isExist, existPhone, id)
          if (existPhone === parseInt(id) || !isExist.length) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            const user = {
              user_name: name,
              email: email,
              password: hashedPassword
            }
            const updateUser = await updateProfilModel([user, id])
            if (updateUser.affectedRows) {
              const detail = {
                phone: phone,
                gender: gender,
                birth: birth,
                photo: picture
              }
              const updateDetail = await updateProfilDetailModel([detail, id])
              if (updateDetail.affectedRows) {
                return responseStandar(res, 'Success! User has been updated!')
              } else {
                return responseStandar(res, 'Failed to update user!', {}, 400, false)
              }
            } else {
              return responseStandar(res, 'Failed to update user!', {}, 400, false)
            }
          } else {
            return responseStandar(res, 'Phone number has already used', {}, 400, false)
          }
        }
      } else {
        return responseStandar(res, 'Email has already used', {}, 400, false)
      }
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
