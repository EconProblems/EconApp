const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true,
    unique: true
  },
  skills: {},
  friends: [],
  streak: {
    type: Number,
    default: 0
  }
});

let Users = mongoose.model('Users', userSchema);

let problemSchema = mongoose.Schema({
  lesson: { type: String, index: true },
  problems: [{
    problem_id: { type: Number, index: true },
    question: String,
    question_img: String,
    response: String,
    body: String,
    date: String,
    reviewer_name: String,
    helpfulness: Number,
    photos: [{id: Number, url: String}],
    characteristics: [{name: String, id: { type: Number, index: true }, charId: Number, value: Number}]
  }]
});

let ProblemsSchema = mongoose.model('Problems', problemSchema);
let UsersSchema = mongoose.model('Users', userSchema);

module.exports = { Problems: ProblemsSchema, Users: UsersSchema };