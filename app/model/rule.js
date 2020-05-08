module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  var d = new Date();

  const RuleSchema = new Schema({
    title: { type: String },
    description: { type: String },
    mobile: { type: String },
    email: { type: String },
    status: { type: Number, default: 1 },
    add_time: {
      type: Number,
      default: d.getTime()
    },
  });


  return mongoose.model('Rule', RuleSchema, 'rule');
}