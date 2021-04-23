require('dotenv').config()

//let PORT = process.env.PORT
//let MONGODB_URI = process.env.MONGODB_URI

//if (process.env.NODE_ENV === 'test') {
//  MONGODB_URI = process.env.TEST_MONGODB_URI
//}
const PORT = 3003
const MONGODB_URI = 'mongodb+srv://fullstack:mongodb@cluster0.xf3xg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

module.exports = {
  MONGODB_URI,
  PORT
} 