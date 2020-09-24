const fs = require('fs')

module.exports = (req, res, next) => {
  const pictures = req.file.path

  if (!(req.file.mimetype).includes('jpeg') && !(req.file.mimetype).includes('jpg') && !(req.file.mimetype).includes('png')) {
    fs.unlinkSync(pictures)
    return res.status(400).send({
      success: false,
      message: 'file no support'
    })
  }

  if (req.file.size > 1024 * 1024 * 0.5) {
    fs.unlinkSync(pictures)
    return res.status(400).send({
      success: false,
      message: 'the file is too large to upload'
    })
  }
  next()
}
