const router = require('express').Router()
const passport = require('../config/auth')
const { Batch, Student } = require('../models')

const authenticate = passport.authorize('jwt', { session: false })

router.post('/students', authenticate, (req, res, next) => {
    let newStudent = req.body

    Student.create(newStudent)
     .then((student) => res.json(student))
     .catch((error) => next(error))
})




module.exports = router
