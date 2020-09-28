const { createUserModel, getProfileModel, updateProfileModel, updatePartProfileModel, deleteProfileModel } = require('../models/user_detail')

module.exports = {
  createProfile: (req, res) => {
    const { id, userName, phone } = req.body
    const pictures = `/uploads/${req.file.filename}`
    if (id && userName && phone && pictures) {
      createUserModel([id, userName, phone, pictures], (err, result) => {
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
      console.log(result[0].email)
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
    const { userName, email, password } = req.body
    if (userName.trim() && email.trim() && password.trim()) {
      getProfileModel(id, result => {
        if (result.length) {
          updateProfileModel([userName, email, password], id, hasil => {
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
    const { userName = '', email = '', password = '' } = req.body
    if (userName.trim() || email.trim() || password.trim()) {
      getProfileModel(id, result => {
        if (result.length) {
          const data = Object.entries(req.body).map(item => {
            return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
          })
          updatePartProfileModel(id, data, result => {
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
