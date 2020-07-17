import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    return responseObject(axios.get(baseUrl))
}

const create = createdObject => {
    return responseObject(axios.post(baseUrl, createdObject))
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, createdObject) => {
    return responseObject(axios.put(`${baseUrl}/${id}`, createdObject))
}

const responseObject = (request) => {
    return request.then(response => response.data)
}

export default { getAll, create, remove, update }

//, create, update, delName  

// const getAll = () => {
//     const request = axios.get(baseUrl)
//     return request.then(response => response.data)
//   }
  
//   const create = newObject => {
//     const request = axios.post(baseUrl, newObject)
//     return request.then(response => response.data)
//   }
  
//   const update = (id, newObject) => {
//     const request = axios.put(`${baseUrl}/${id}`, newObject)
//     return request.then(response => response.data)
//   }
  
//   const delName = (id) => {
//       const request = axios.delete (`${baseUrl}/${id}`)
//       return request.then(response => response.data)
//   }