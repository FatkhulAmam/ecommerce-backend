const { createUserModel, getProfileModel, updateProfileModel, updatePartProfileModel, deleteProfileModel } = require('../models/userDetailModel')

module.exports = {
  createProfile: (req, res) => {
    const { idUser, userName, phone } = req.body
    const pictures = `/uploads/${req.file.filename}`
    console.log(idUser)
    if (idUser.trim() && userName.trim() && phone && pictures) {
      createUserModel([idUser, userName, phone, pictures], (err, result) => {
        if (!err) {
          res.send({
            success: true,
            message: 'profile created',
            data: {
              ...req.body,
              pictures
            }
          })
        } else {
          res.send({
            success: false,
            message: 'cannot create profile'
          })
        }
      })
    } else {
      res.send({
        success: false,
        message: 'all field must be filled'
      })
    }
  },
  getProfile: (req, res) => {
    const { id } = req.params
    getProfileModel(id, result => {
      if (result.length) {
        res.status(201).send({
          succes: true,
          message: 'showing profile...',
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
  updateProfile: (req, res) => {
    const { id } = req.params
    const { idUser, userName, phone } = req.body
    const pictures = `/uploads/${req.file.filename}`
    if (idUser.trim() && userName.trim() && phone.trim() && pictures) {
      getProfileModel(id, result => {
        if (result.length) {
          updateProfileModel([idUser, userName, phone, pictures], id, hasil => {
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
              res.send({
                success: true,
                message: `profile id ${id} updated`,
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
    } else {
      res.send({
        success: false,
        message: 'fill a field'
      })
    }
  },
  deleteProfile: (req, res) => {
    const { id } = req.params
    getProfileModel(id, result => {
      if (result.length) {
        deleteProfileModel(id, result => {
          if (result.affectedRows) {
            res.send({
              success: true,
              message: 'Profile Deleted'
            })
          } else {
            res.send({
              success: false,
              message: 'cannot delete Pofie'
            })
          }
        })
      } else {
        res.send({
          success: false,
          message: 'cannot delete item'
        })
      }
    })
  }
}
