import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (blogObject) => {
  const response = await axios.put(`${baseUrl}/${blogObject.id}`, blogObject)
  return response.data
}

const del = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  // console.log(config)
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  console.log('response', response)
}



export default { getAll, create, update, setToken, del }