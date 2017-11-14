const router = require('express').Router()
const passport = require('../config/auth')
const { Batch, Student } = require('../models')

const authenticate = passport.authorize('jwt', { session: false })

router.get('/batches/:id/students', (req, res, next) => {
    const id = req.params.id

    Batch.findById(id)
      .then((batch) => {
        if (!batch) { return next() }
        res.json(batch)
      })
      .catch((error) => next(error))
  })

  .put('/batches/:id/students', authenticate, (req, res, next) => {
    const id = req.params.id
    let newStudent = req.body

    Batch.findById(id)
      .then((batch) => {
       if (!batch) { return next() }
       var batchNew= batch
       batchNew.students.push(newStudent)

        Batch.findByIdAndUpdate(id, { $set: batchNew }, { new: true })
          .then((batch) => res.json(batch))
          .catch((error) => next(error))
         })





})



module.exports = router
