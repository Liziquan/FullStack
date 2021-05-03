const router = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const Comment = require('../models/comment')

router.get('/:id/comments', async (request, response) => {
  const { id } = request.params
  const blogWithComments = await Blog.findById(id).populate('comments')
  response.json(blogWithComments)
})

router.post('/:id/comments', async (request, response) => {
  const { body } = request
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const { id } = request.params 
  const blog = await Blog.findById(id)

  const comment = new Comment({
      title:body.title,
  })

  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment)
  await blog.save()
  response.status(201).json(savedComment.toJSON())
  
})

module.exports = router