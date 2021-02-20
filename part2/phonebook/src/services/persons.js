import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseURL)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseURL, newObject)
  return request.then(response => response.data)
}

const del = id => {
  // console.log(`${baseURL}/${id}`)
  return axios.delete(`${baseURL}/${id}`)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseURL}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { // more compact syntax: if key and variable names are the same
  getAll,
  create,
  del,
  update
}