require('dotenv').config()

const PORT = 3003
const MONGODB_URI = 'mongodb+srv://fullstack:password@cluster0.xf3xg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const TEST_MONGODB_URI='mongodb+srv://fullstack:password@cluster0.xf3xg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
/*
const PORT = process.env.PORT

const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI
*/
module.exports = {
  MONGODB_URI,
  TEST_MONGODB_URI,
  PORT
}