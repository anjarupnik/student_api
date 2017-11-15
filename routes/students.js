const router = require('express').Router()
const passport = require('../config/auth')
const { Batch, Student } = require('../models')

const authenticate = passport.authorize('jwt', { session: false })

router.get('/students/:id', authenticate, (req, res, next) => {
        const id = req.params.id

         Student.findById(id)
          .then((student) => {
            if (!student) { return next() }
            res.json(student)
          })
          .catch((error) => next(error))
})


  .post('/students', authenticate, (req, res, next) => {
      let newStudent = req.body

      Student.create(newStudent)
       .then((student) => res.json(student))
       .catch((error) => next(error))
  })

  .patch('/students/:id', authenticate, (req, res, next) => {
    const id = req.params.id
    const studentRate = req.body

    Student.findById(id)
     .then((student) => {
       if (!student) { return next() }

      student.evaluations.push(studentRate)

       Student.findByIdAndUpdate(id, { $set: student }, { new: true })
         .then((student) => res.json(student))
         .catch((error) => next(error))
     })
     .catch((error) => next(error))
})




module.exports = router
