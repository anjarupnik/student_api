const mongoose = require('../config/database')
const { Schema } = mongoose

const evaluationSchema = new Schema({
  color: { type: String, default: "green" },
  date: { type: String, default: Date.now },
  remark: { type: String },
});

const studentSchema = new Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  evaluations: [evaluationSchema],
  batchId: { type: Schema.Types.ObjectId, ref: 'batches' }
});

module.exports = mongoose.model('students', studentSchema)
