const mongoose = require('../config/database')
const { Schema } = mongoose

const evaluationSchema = new Schema({
  color: { type: String, default: "green" },
  date: { type: Date, default: Date.now },
  remark: { type: String },
});

const studentSchema = new Schema({
  name: { type: String, required: true },
  photo: { type: String },
  evaluations: [evaluationSchema],
});

module.exports = mongoose.model('students', studentSchema)
