const responseStandar = require('../helpers/response')
const paging = require('../helpers/pagination')
const joi = require('joi')
const bcrypt = require('bcryptjs')
const {
  createUserModel, getProfileModel, updateProfilModel, updatePartProfileModel,
  deleteProfileModel, deleteProfileDetailModel, getUserByCondition, updateAvatarModel, updateProfilDetailModel,
  readUser, constUser, getUserByConditionDetail
} = require('../models/userDetailModel')

module.exports = {
  createDetailProfile: async (req, res) => {
    const { id } = req.user
    const pictures = `/uploads/${req.file.filename}`
    const schema = joi.object({
      phone: joi.string().required(),
      gender: joi.string().required(),
      birth: joi.string().required()
    })
    const { value: result, error } = schema.validate(req.body)
    if (error) {
      return responseStandar(res, 'error', { error: error.message }, 400, false)
    } else {
      const { phone, gender, birth } = result
      const detail = {
        user_id: id,
        phone: phone,
        gender: gender,
        birth: birth,
        photo: pictures
      }
      const detailProfil = await createUserModel(detail)
      if (detailProfil.affectedRows) {
        return responseStandar(res, 'detail added', { detail })
      } else {
        return responseStandar(res, 'cannot add detail', {}, 401, false)
      }
    }
  },
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
      console.log(results.length)
      const data = results.map(profile => {
        profile = {
          ...profile,
          password: undefined
        }
        return profile
      })
      responseStandar(res, `Detail of user id ${id}`, { data })
    } else {
      responseStandar(res, `User with id ${id} is not found`, {}, 404, false)
    }
  },
  updateProfile: async (req, res) => {
    const pictures = (req.file ? `uploads/${req.file.filename}` : undefined)
    const schema = joi.object({
      name: joi.string().required(),
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
                photo: pictures
              }
              const updateDetail = await updateProfilDetailModel([detail, id])
              if (updateDetail.affectedRows) {
                return responseStandar(res, 'Success! User has been updated!')
              } else {
                return responseStandar(res, 'Failed update user!', {}, 400, false)
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
  updatePartProfile: async (req, res) => {
    const { id } = req.user
    const photo = (req.file ? `uploads/${req.file.filename}` : undefined)
    const { user_name = '', email = '', phone = 0, gender = '', birth = '' } = req.body
    const results = await getProfileModel(id)
    if (results.length) {
      if (user_name || email || phone || photo || gender || birth) {
        const table = {
          ...req.body
        }
        const data = await updatePartProfileModel([table, id])
        if (data.affectedRows) {
          return responseStandar(res, 'data update', { data: { ...table } })
        } else {
          return responseStandar(res, 'cannot update name, email and password', {}, 401, false)
        }
      } else {
        return responseStandar(res, 'cannot update name, email and password', {}, 401, false)
      }
    } else {
      responseStandar(res, `User with id ${id} is not found`, {}, 404, false)
    }
  },
  updateAvatar: async (req, res) => {
    const { id } = req.user
    const pictures = (req.file ? `uploads/${req.file.filename}` : undefined)
    const results = await getProfileModel(id)
    if (results.length) {
      if (pictures) {
        const table = {
          photo: pictures
        }
        const data = await updateAvatarModel([table, id])
        if (data.affectedRows) {
          return responseStandar(res, 'picture update', { data: { ...table } })
        } else {
          return responseStandar(res, 'cannot update pictures', {}, 401, false)
        }
      } else {
        return responseStandar(res, 'cannot update pictures', {}, 401, false)
      }
    } else {
      responseStandar(res, `User with id ${id} is not found`, {}, 404, false)
    }
  },
  deleteProfile: async (req, res) => {
    const { id } = req.user
    const result = await deleteProfileModel(id)
    if (result.affectedRows) {
      const results = await deleteProfileDetailModel(id)
      if (results.affectedRows) {
        return responseStandar(res, 'profile deleted', {})
      } else {
        return responseStandar(res, 'dalete profile denied', {}, 401, false)
      }
    } else {
      return responseStandar(res, 'cannot dalete profile', {}, 401, false)
    }
  }
}
