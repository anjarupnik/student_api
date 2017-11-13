const express = require('express')
const { Class } = require('./models')

const PORT = process.env.PORT || 3030

let app = express()

app.get('/classes', (req, res, next) => {
  Class.find()
    .sort({ createdAt: -1 })
    .then((classes) => res.json(classes))
    // Forward any errors to error handler
    .catch((error) => next(error))
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
