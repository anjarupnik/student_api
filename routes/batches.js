const router = require('express').Router()
const passport = require('../config/auth')
const { Batch, Student } = require('../models')

const authenticate = passport.authorize('jwt', { session: false })

router.get('/batches', (req, res, next) => {
  Batch.find()
    .sort({ createdAt: -1 })
    .then((batches) => res.json(batches))
    .catch((error) => next(error))
  })

  .get('/batches/:id', (req, res, next) => {
    const id = req.params.id

   Student.find({ batchId: id})
      .then((student) => {
    Batch.findById(id)
      .then((batch) => {
        if (!batch) { return next() }
        batch.students = student
        batch.save()
        res.json(batch)
      })
      .catch((error) => next(error))
  })
  })
  .post('/batches', authenticate, (req, res, next) => {
    let newBatch = req.body

    Batch.create(newBatch)
      .then((batch) => res.json(batch))
      .catch((error) => next(error))
  })

  .put('/batches/:id', authenticate, (req, res, next) => {
    const id = req.params.id
    const students = req.body.students
    var updatedBatch = req.body

    var green = students.filter(student => student.evaluations[student.evaluations.length-1].color === "green")
    var yellow = students.filter(student => student.evaluations[student.evaluations.length-1].color === "yellow")
    var red = students.filter(student => student.evaluations[student.evaluations.length-1].color === "red")
    var questions = req.body.questions
    var student = {}

      function take_student (color) {
      var num = Math.floor(Math.random() * (color.length))
           questions.push(color[num].evaluations[color[num].evaluations.length-1].color)
           student = color[num]}

      function quantity(questions, color) {
        return questions.filter(q => q === color).length
      }

      function ask() {
        if (questions.length < 2 && red.length > 0) { take_student(red) }
        else {
        if (quantity(questions, "red") / questions.length < 0.5 && red.length > 0) {take_student(red)}
        else if (quantity(questions, "yellow") / questions.length < 0.33 && yellow.length > 0) {take_student(yellow)}
        else {take_student(green)}
      }
      }

      ask()
      updatedBatch.questions=questions
debugger
     Batch.findByIdAndUpdate(id, { $set: updatedBatch }, { new: true })
       .then((batch) => res.json(student))
       .catch((error) => next(error))
  })


module.exports = router
