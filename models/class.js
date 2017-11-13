const mongoose = require('../config/database')
const { Schema } = mongoose

const evaluationSchema = new Schema({
  color: { type: String, required: true },
  date: { type: Date, default: Date.now },
  remark: { type: String },
});

const studentSchema = new Schema({
  fullName: { type: String, required: true },
  photo: { type: String },
  evaluations: [evaluationSchema],
});

const classSchema = new Schema({
  batchNumber: { type: Number, required: true},
  startDate: { type: Date },
  endDate: { type: Date },
  students: [studentSchema],
  questions: [String],
  questionsDate: { type: Date, default: Date.now},
});

module.exports = mongoose.model('classes', classSchema)
