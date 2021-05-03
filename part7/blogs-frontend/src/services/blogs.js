import axios from 'axios'
const baseUrl = '/api/blogs'

const getConfig = () => {

  return {
    headers: { Authorization: `bearer ${JSON.parse(window.localStorage.getItem('loggedInBloglistUser')).token}` }
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (blog) => {
  const request = axios.post(baseUrl, blog, getConfig())
  return request.then(response => response.data)
}

const update = (id,blog) => {
  const request = axios.put(`${baseUrl}/${id}`, blog, getConfig())
  return request.then(response => response.data)
}

const deleteBlog = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`, getConfig())
  return request.then(response => response.data)
}

const addComment = (id,comment) => {
  const request = axios.post(`${baseUrl}/${id}/comments`, comment, getConfig())
  return request.then(response => response.data)
}


export default { getAll, create, update, deleteBlog, addComment }