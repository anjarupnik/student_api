const mongoose = require('../config/database')
const { Schema } = mongoose
const students = require('./student').schema

const batchSchema = new Schema({
  batchNumber: { type: Number, required: true},
  startDate: { type: Date },
  endDate: { type: Date },
  students: [students],
  questions: [String],
  questionsDate: { type: Date, default: Date.now},
});

module.exports = mongoose.model('batches', batchSchema)
