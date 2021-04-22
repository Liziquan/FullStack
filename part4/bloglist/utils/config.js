require('dotenv').config()

const PORT = 3003
const MONGODB_URI = 'mongodb+srv://fullstack:@cluster0.xf3xg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const TEST_MONGODB_URI='mongodb+srv://fullstack:@cluster0.xf3xg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

module.exports = {
  MONGODB_URI,
  TEST_MONGODB_URI,
  PORT
}