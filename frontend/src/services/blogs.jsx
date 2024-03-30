import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getBlog = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (newBlog, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const updateLikes = async (id, updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog)
  return response.data
}

const deleteBlog = async (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, getBlog, create, updateLikes, deleteBlog }