const bodyParser = require('body-parser')
const express = require('express')
const { Class } = require('./models')
const { users } = require('./routes')

const PORT = process.env.PORT || 3030

let app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    message: err.message,
    // only print full errors in development
    error: app.get('env') === 'development' ? err : {}
  })
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
