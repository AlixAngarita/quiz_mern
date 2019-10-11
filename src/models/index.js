const mongoose = require('mongoose');

const { User } = require('./user');
const { Message } = require('./message');

const DATABASE_URL = process.env.DATABASE_URL
  ? process.env.DATABASE_URL
  : 'mongodb+srv://admin:1234@cluster0-s8ukh.mongodb.net/test?retryWrites=true&w=majority';

module.exports.connectDb = () => {
  return mongoose.connect(DATABASE_URL);
};

module.exports.models = { User, Message };

